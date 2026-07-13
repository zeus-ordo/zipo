"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const utils_1 = require("./utils");
const queue_1 = require("../llm/queue");
const prisma = new client_1.PrismaClient({});
const router = (0, express_1.Router)();
router.post('/webhook/:channelId', async (req, res) => {
    try {
        const channelIdParam = req.params.channelId;
        const channelId = Array.isArray(channelIdParam) ? channelIdParam[0] : channelIdParam;
        const signature = req.headers['x-line-signature'];
        const signatureStr = Array.isArray(signature) ? signature[0] : signature;
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
        if (!(0, utils_1.verifyLineSignature)(lineChannel.channelSecret, rawBody, signatureStr)) {
            res.status(401).json({ error: 'Invalid LINE signature' });
            return;
        }
        const webhookRequest = req.body;
        const events = webhookRequest.events || [];
        for (const event of events) {
            if (event.type === 'text' && event.source?.userId) {
                await handleTextEvent(event, lineChannel.tenantId, lineChannel.channelId);
            }
        }
        res.status(200).json({ status: 'ok' });
    }
    catch (error) {
        console.error('LINE Webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
async function handleTextEvent(event, tenantId, channelId) {
    const lineUserId = event.source.userId;
    const text = event.text || event.message?.text || '';
    if (!text)
        return;
    let customer = await prisma.customer.findFirst({
        where: { tenantId, lineUserId },
    });
    if (!customer) {
        customer = await prisma.customer.create({
            data: {
                tenantId,
                lineUserId,
                lineDisplayName: null,
                linePictureUrl: null,
            },
        });
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
            rawPayload: event,
        },
    });
    (0, queue_1.queueLlmExtraction)({
        conversationId: conversation.id,
        tenantId,
        customerId: customer.id,
        lastMessage: text,
    });
}
router.get('/settings', auth_1.authenticate, tenant_1.requireTenant, async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
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
    }
    catch (error) {
        console.error('Get LINE settings error:', error);
        res.status(500).json({ error: 'Failed to get LINE settings' });
    }
});
router.patch('/settings', auth_1.authenticate, tenant_1.requireTenant, async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { channelId, channelSecret, channelAccessToken } = req.body;
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
        }
        else {
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
    }
    catch (error) {
        console.error('Update LINE settings error:', error);
        res.status(500).json({ error: 'Failed to update LINE settings' });
    }
});
router.get('/webhook/test/:channelId', async (req, res) => {
    try {
        const channelIdParam = req.params.channelId;
        const channelId = Array.isArray(channelIdParam) ? channelIdParam[0] : channelIdParam;
        const mode = req.query.mode;
        if (mode === 'confirm') {
            res.status(200).send('OK');
            return;
        }
        res.status(200).json({ status: 'LINE webhook endpoint is active' });
    }
    catch (error) {
        console.error('LINE webhook test error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map