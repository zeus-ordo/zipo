"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const utils_1 = require("./utils");
const queue_1 = require("../llm/queue");
const prisma_1 = require("../../lib/prisma");
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
        const lineChannel = await prisma_1.prisma.lineChannel.findUnique({
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
            const eventId = event.webhookEventId || `${event.source?.userId}-${event.timestamp}`;
            await prisma_1.prisma.$transaction(async (tx) => {
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
            const processed = await prisma_1.prisma.processedWebhookEvent.findUnique({
                where: { id: eventId },
            });
            if (!processed) {
                continue;
            }
            if (event.type === 'text' && event.source?.userId) {
                await handleTextEvent(event, lineChannel.tenantId, lineChannel.channelId, lineChannel.channelAccessToken);
            }
            else if (event.type === 'image' && event.source?.userId) {
                await handleImageEvent(event, lineChannel.tenantId, lineChannel.channelId, lineChannel.channelAccessToken);
            }
        }
        res.status(200).json({ status: 'ok' });
    }
    catch (error) {
        console.error('LINE Webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
async function getLineUserProfile(lineAccessToken, userId) {
    try {
        const response = await fetch(`https://api.line.me/v2/bot/follower/${userId}/profile`, {
            headers: {
                'Authorization': `Bearer ${lineAccessToken}`,
            },
        });
        if (!response.ok)
            return null;
        const data = await response.json();
        return {
            displayName: data.displayName || '',
            pictureUrl: data.pictureUrl || '',
        };
    }
    catch {
        return null;
    }
}
async function handleTextEvent(event, tenantId, channelId, lineAccessToken) {
    const lineUserId = event.source.userId;
    const text = event.text || event.message?.text || '';
    if (!text)
        return;
    let customer = await prisma_1.prisma.customer.findFirst({
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
        customer = await prisma_1.prisma.customer.create({
            data: {
                tenantId,
                lineUserId,
                lineDisplayName: displayName || null,
                linePictureUrl: pictureUrl || null,
            },
        });
    }
    else if (!customer.lineDisplayName && lineAccessToken) {
        const profile = await getLineUserProfile(lineAccessToken, lineUserId);
        if (profile) {
            customer = await prisma_1.prisma.customer.update({
                where: { id: customer.id },
                data: {
                    lineDisplayName: profile.displayName,
                    linePictureUrl: profile.pictureUrl,
                },
            });
        }
    }
    let conversation = await prisma_1.prisma.conversation.findFirst({
        where: {
            tenantId,
            customerId: customer.id,
        },
        orderBy: { createdAt: 'desc' },
    });
    if (!conversation) {
        conversation = await prisma_1.prisma.conversation.create({
            data: {
                tenantId,
                customerId: customer.id,
            },
        });
    }
    await prisma_1.prisma.message.create({
        data: {
            conversationId: conversation.id,
            senderType: 'customer',
            content: text,
        },
    });
    (0, queue_1.queueLlmExtraction)({
        conversationId: conversation.id,
        tenantId,
        customerId: customer.id,
        lastMessage: text,
    });
}
async function handleImageEvent(event, tenantId, channelId, lineAccessToken) {
    const lineUserId = event.source?.userId;
    const messageId = event.message?.id;
    if (!lineUserId || !messageId)
        return;
    let imageBase64 = null;
    let imageUrl = null;
    if (lineAccessToken) {
        try {
            const response = await fetch(`https://api-data.line.me/v2/bot/message/${messageId}/content`, {
                headers: {
                    Authorization: `Bearer ${lineAccessToken}`,
                },
            });
            if (response.ok) {
                const buffer = await response.arrayBuffer();
                imageBase64 = Buffer.from(buffer).toString('base64');
                imageUrl = `https://api-data.line.me/v2/bot/message/${messageId}/content`;
            }
        }
        catch (error) {
            console.error('Failed to download LINE image:', error);
        }
    }
    let customer = await prisma_1.prisma.customer.findFirst({
        where: { tenantId, lineUserId },
    });
    if (!customer) {
        customer = await prisma_1.prisma.customer.create({
            data: {
                tenantId,
                lineUserId,
            },
        });
    }
    let conversation = await prisma_1.prisma.conversation.findFirst({
        where: {
            tenantId,
            customerId: customer.id,
        },
        orderBy: { createdAt: 'desc' },
    });
    if (!conversation) {
        conversation = await prisma_1.prisma.conversation.create({
            data: {
                tenantId,
                customerId: customer.id,
            },
        });
    }
    await prisma_1.prisma.message.create({
        data: {
            conversationId: conversation.id,
            senderType: 'customer',
            content: null,
            imageUrl,
            imageBase64,
        },
    });
    if (imageBase64) {
        (0, queue_1.queueLlmExtraction)({
            conversationId: conversation.id,
            tenantId,
            customerId: customer.id,
            lastMessage: '',
            imageBase64,
        });
    }
}
router.get('/settings', auth_1.authenticate, tenant_1.requireTenant, async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const lineChannel = await prisma_1.prisma.lineChannel.findFirst({
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
        const existingChannel = await prisma_1.prisma.lineChannel.findFirst({
            where: { tenantId },
        });
        let lineChannel;
        if (existingChannel) {
            lineChannel = await prisma_1.prisma.lineChannel.update({
                where: { id: existingChannel.id },
                data: {
                    channelId,
                    channelSecret,
                    channelAccessToken,
                },
            });
        }
        else {
            lineChannel = await prisma_1.prisma.lineChannel.create({
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
