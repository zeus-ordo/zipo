import { Router, Request, Response } from 'express';
import { verifyLineSignature } from '../line/utils';
import { queueLlmExtraction } from '../llm/queue';
import { LineWebhookRequest, LineWebhookEvent } from '../line/types';
import { prisma } from '../../lib/prisma';

const router = Router();

async function getLineUserProfile(lineAccessToken: string, userId: string): Promise<{ displayName: string; pictureUrl: string } | null> {
  try {
    const response = await fetch(`https://api.line.me/v2/bot/follower/${userId}/profile`, {
      headers: {
        'Authorization': `Bearer ${lineAccessToken}`,
      },
    });
    if (!response.ok) return null;
    const data = await response.json() as { displayName?: string; pictureUrl?: string };
    return {
      displayName: data.displayName || '',
      pictureUrl: data.pictureUrl || '',
    };
  } catch {
    return null;
  }
}

async function handleTextEvent(event: LineWebhookEvent, tenantId: string, channelId: string, lineAccessToken?: string): Promise<void> {
  const lineUserId = event.source.userId;
  const text = event.text || event.message?.text || '';

  if (!text) return;

  let customer = await prisma.customer.findFirst({
    where: { tenantId, lineUserId },
  });

  if (!customer) {
    let displayName = '';
    let pictureUrl = '';

    if (lineAccessToken && lineUserId) {
      const profile = await getLineUserProfile(lineAccessToken, lineUserId);
      if (profile) {
        displayName = profile.displayName;
        pictureUrl = profile.pictureUrl;
      }
    }

    customer = await prisma.customer.create({
      data: {
        tenantId,
        lineUserId,
        lineDisplayName: displayName || null,
        linePictureUrl: pictureUrl || null,
      },
    });
  } else if (!customer.lineDisplayName && lineAccessToken) {
    const profile = await getLineUserProfile(lineAccessToken, lineUserId);
    if (profile) {
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          lineDisplayName: profile.displayName,
          linePictureUrl: profile.pictureUrl,
        },
      });
    }
  }

  let conversation = await prisma.conversation.findFirst({
    where: {
      tenantId,
      customerId: customer.id,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        tenantId,
        customerId: customer.id,
      },
    });
  }

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderType: 'customer',
      content: text,
    },
  });

  queueLlmExtraction({
    conversationId: conversation.id,
    tenantId,
    customerId: customer.id,
    lastMessage: text,
  });
}

router.post('/:channelId', async (req: Request, res: Response) => {
  try {
    const channelIdParam = req.params.channelId;
    const channelId = Array.isArray(channelIdParam) ? channelIdParam[0] : channelIdParam;
    const signature = req.headers['x-line-signature'];
    const signatureStr = Array.isArray(signature) ? signature[0] : signature as string | undefined;

    if (!signatureStr) {
      res.status(401).json({ error: 'Missing LINE signature' });
      return;
    }

    const lineChannel = await prisma.lineChannel.findUnique({
      where: { channelId },
      include: { tenant: true },
    });

    if (!lineChannel) {
      res.status(404).json({ error: 'LineChannel not found' });
      return;
    }

    const rawBody = JSON.stringify(req.body);
    if (!verifyLineSignature(lineChannel.channelSecret, rawBody, signatureStr)) {
      res.status(401).json({ error: 'Invalid LINE signature' });
      return;
    }

    const webhookRequest: LineWebhookRequest = req.body;
    const events = webhookRequest.events || [];

    for (const event of events) {
      const eventId = event.webhookEventId || `${event.source?.userId}-${event.timestamp}`;

      await prisma.$transaction(async (tx) => {
        const existing = await tx.processedWebhookEvent.findUnique({
          where: { id: eventId },
        });

        if (existing) {
          console.log(`[LINE Webhook] Duplicate event ${eventId}, skipping`);
          return;
        }

        await tx.processedWebhookEvent.create({
          data: {
            id: eventId,
            tenantId: lineChannel.tenantId,
            channelId: lineChannel.channelId,
          },
        });
      }).catch(() => {
        console.log(`[LINE Webhook] Duplicate event ${eventId}, skipping`);
        return;
      });

      const processed = await prisma.processedWebhookEvent.findUnique({
        where: { id: eventId },
      });

      if (!processed) {
        continue;
      }

      if (event.type === 'text' && event.source?.userId) {
        await handleTextEvent(event, lineChannel.tenantId, lineChannel.channelId, lineChannel.channelAccessToken);
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('LINE Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const webhookRoutes = router;