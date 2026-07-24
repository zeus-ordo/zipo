"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma_1 = require("../../lib/prisma");
const MAX_LIMIT = 100;
const PAGE_SIZE_DEFAULT = 20;
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.use(tenant_1.requireTenant);
router.get('/', async (req, res) => {
    const tenantId = req.user.tenantId;
    const { customerId, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
    const skip = (pageNum - 1) * limitNum;
    const where = { tenantId };
    if (customerId) {
        where.customerId = customerId;
    }
    const [conversations, total] = await Promise.all([
        prisma_1.prisma.conversation.findMany({
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
        prisma_1.prisma.conversation.count({ where }),
    ]);
    const conversationIds = conversations.map((c) => c.id);
    let lastMessages = [];
    if (conversationIds.length > 0) {
        const allLastMessages = await prisma_1.prisma.message.findMany({
            where: { conversationId: { in: conversationIds } },
            orderBy: { createdAt: 'desc' },
            select: { conversationId: true, content: true, senderType: true, createdAt: true },
        });
        const seen = new Set();
        lastMessages = allLastMessages.filter((m) => {
            if (seen.has(m.conversationId))
                return false;
            seen.add(m.conversationId);
            return true;
        });
    }
    const lastMsgMap = new Map(lastMessages.map((m) => [m.conversationId, {
            content: m.content,
            senderType: m.senderType,
            createdAt: m.createdAt,
        }]));
    const withLastMessage = conversations.map((conv) => ({
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
    const tenantId = req.user.tenantId;
    const conversationId = req.params.id;
    const conversation = await prisma_1.prisma.conversation.findFirst({
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
    const messages = await prisma_1.prisma.message.findMany({
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
    const limitNum = Math.min(parseInt(limit, 10), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
    const skip = (pageNum - 1) * limitNum;
    const conversation = await prisma_1.prisma.conversation.findFirst({
        where: { id: conversationId, tenantId },
    });
    if (!conversation) {
        res.status(404).json({ error: 'Conversation not found' });
        return;
    }
    const [messages, total] = await Promise.all([
        prisma_1.prisma.message.findMany({
            where: { conversationId },
            skip,
            take: limitNum,
            orderBy: { createdAt: 'asc' },
        }),
        prisma_1.prisma.message.count({ where: { conversationId } }),
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
exports.default = router;
