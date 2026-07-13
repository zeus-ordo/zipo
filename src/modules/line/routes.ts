import { Router, Request, Response } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireTenant } from '../../middleware/tenant';
import { verifyLineSignature } from './utils';
import { queueLlmExtraction } from '../llm/queue';
import { LineWebhookRequest, LineWebhookEvent, LineChannelSetupInput } from './types';
import { prisma } from '../../lib/prisma';
const router = Router();

router.post('/webhook/:channelId', async (req: Request, res: Response) => {
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

router.get('/settings', authenticate, requireTenant, async (req: Request, res: Response) => {
  try {
    const tenantId = req.user!.tenantId!;

    const lineChannel = await prisma.lineChannel.findFirst({
      where: { tenantId },
    });

    if (!lineChannel) {
      res.status(404).json({ error: 'LINE Channel not configured' });
      return;
    }

    res.json({
      id: lineChannel.id,
      channelId: lineChannel.channelId,
      webhookUrl: lineChannel.webhookUrl,
      webhookEnabled: lineChannel.webhookEnabled,
      webhookVerifiedAt: lineChannel.webhookVerifiedAt?.toISOString() || null,
    });
  } catch (error) {
    console.error('Get LINE settings error:', error);
    res.status(500).json({ error: 'Failed to get LINE settings' });
  }
});

router.patch('/settings', authenticate, requireTenant, async (req: Request, res: Response) => {
  try {
    const tenantId = req.user!.tenantId!;
    const { channelId, channelSecret, channelAccessToken }: LineChannelSetupInput = req.body;

    if (!channelId || !channelSecret || !channelAccessToken) {
      res.status(400).json({ error: 'channelId, channelSecret, and channelAccessToken are required' });
      return;
    }

    const existingChannel = await prisma.lineChannel.findFirst({
      where: { tenantId },
    });

    let lineChannel;
    if (existingChannel) {
      lineChannel = await prisma.lineChannel.update({
        where: { id: existingChannel.id },
        data: {
          channelId,
          channelSecret,
          channelAccessToken,
        },
      });
    } else {
      lineChannel = await prisma.lineChannel.create({
        data: {
          tenantId,
          channelId,
          channelSecret,
          channelAccessToken,
          webhookEnabled: false,
        },
      });
    }

    res.json({
      id: lineChannel.id,
      channelId: lineChannel.channelId,
      webhookUrl: lineChannel.webhookUrl,
      webhookEnabled: lineChannel.webhookEnabled,
      webhookVerifiedAt: lineChannel.webhookVerifiedAt?.toISOString() || null,
    });
  } catch (error) {
    console.error('Update LINE settings error:', error);
    res.status(500).json({ error: 'Failed to update LINE settings' });
  }
});

router.get('/webhook/test/:channelId', async (req: Request, res: Response) => {
  try {
    const channelIdParam = req.params.channelId;
    const channelId = Array.isArray(channelIdParam) ? channelIdParam[0] : channelIdParam;
    const mode = req.query.mode as string;

    if (mode === 'confirm') {
      res.status(200).send('OK');
      return;
    }

    res.status(200).json({ status: 'LINE webhook endpoint is active' });
  } catch (error) {
    console.error('LINE webhook test error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
