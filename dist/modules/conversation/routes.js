"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma = new client_1.PrismaClient({});
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.use(tenant_1.requireTenant);
router.get('/', async (req, res) => {
    const tenantId = req.user.tenantId;
    const { customerId, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const where = { tenantId };
    if (customerId) {
        where.customerId = customerId;
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
    const withLastMessage = await Promise.all(conversations.map(async (conv) => {
        const lastMsg = await prisma.message.findFirst({
            where: { conversationId: conv.id },
            orderBy: { createdAt: 'desc' },
            select: { content: true, senderType: true, createdAt: true },
        });
        return {
            id: conv.id,
            customerId: conv.customerId,
            customer: conv.customer,
            messageCount: conv._count.messages,
            lastMessage: lastMsg ? { content: lastMsg.content, senderType: lastMsg.senderType, createdAt: lastMsg.createdAt } : null,
            createdAt: conv.createdAt,
            updatedAt: conv.updatedAt,
        };
    }));
    res.json({
        data: withLastMessage,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum),
        },
    });
});
router.get('/:id', async (req, res) => {
    const tenantId = req.user.tenantId;
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
    const tenantId = req.user.tenantId;
    const conversationId = req.params.id;
    const { page = '1', limit = '50' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
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
            totalPages: Math.ceil(total / limitNum),
        },
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map