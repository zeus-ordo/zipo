import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireTenant } from '../../middleware/tenant';
import { prisma } from '../../lib/prisma';

const MAX_LIMIT = 100;
const PAGE_SIZE_DEFAULT = 20;

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.get('/', async (req, res) => {
  const tenantId = req.user!.tenantId!;
  const { customerId, page = '1', limit = '20' } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = Math.min(parseInt(limit as string, 10), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
  const skip = (pageNum - 1) * limitNum;

  const where: any = { tenantId };
  if (customerId) {
    where.customerId = customerId as string;
  }

  const [conversations, total] = await Promise.all([
    prisma.conversation.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { updatedAt: 'desc' },
      include: {
        customer: {
          select: { id: true, lineUserId: true, lineDisplayName: true, linePictureUrl: true },
        },
        _count: { select: { messages: true } },
      },
    }),
    prisma.conversation.count({ where }),
  ]);

  const conversationIds = conversations.map((c: any) => c.id);

  let lastMessages: Array<{ conversationId: string; content: string; senderType: string; createdAt: Date }> = [];
  if (conversationIds.length > 0) {
    const allLastMessages = await prisma.message.findMany({
      where: { conversationId: { in: conversationIds } },
      orderBy: { createdAt: 'desc' },
      select: { conversationId: true, content: true, senderType: true, createdAt: true },
    });

    const seen = new Set<string>();
    lastMessages = allLastMessages.filter((m) => {
      if (seen.has(m.conversationId)) return false;
      seen.add(m.conversationId);
      return true;
    });
  }

  const lastMsgMap = new Map(lastMessages.map((m) => [m.conversationId, {
    content: m.content,
    senderType: m.senderType,
    createdAt: m.createdAt,
  }]));

  const withLastMessage = (conversations as any[]).map((conv: any) => ({
    id: conv.id,
    customerId: conv.customerId,
    customer: conv.customer,
    messageCount: conv._count.messages,
    lastMessage: lastMsgMap.get(conv.id) || null,
    createdAt: conv.createdAt,
    updatedAt: conv.updatedAt,
  }));

  res.json({
    data: withLastMessage,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(limitNum ? total / limitNum : 0),
    },
  });
});

router.get('/:id', async (req, res) => {
  const tenantId = req.user!.tenantId!;
  const conversationId = req.params.id;

  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, tenantId },
    include: {
      customer: {
        select: { id: true, lineUserId: true, lineDisplayName: true, linePictureUrl: true },
      },
    },
  });

  if (!conversation) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      senderType: true,
      content: true,
      createdAt: true,
    },
  });

  res.json({
    ...conversation,
    messages,
  });
});

router.get('/:id/messages', async (req, res) => {
  const tenantId = req.user!.tenantId!;
  const conversationId = req.params.id;
  const { page = '1', limit = '50' } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = Math.min(parseInt(limit as string, 10), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
  const skip = (pageNum - 1) * limitNum;

  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, tenantId },
  });

  if (!conversation) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where: { conversationId },
      skip,
      take: limitNum,
      orderBy: { createdAt: 'asc' },
    }),
    prisma.message.count({ where: { conversationId } }),
  ]);

  res.json({
    data: messages,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(limitNum ? total / limitNum : 0),
    },
  });
});

export default router;