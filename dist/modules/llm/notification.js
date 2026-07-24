"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyStoreNewDraft = notifyStoreNewDraft;
const prisma_1 = require("../../lib/prisma");
async function notifyStoreNewDraft(tenantId, draftId, summary) {
    try {
        const lineChannel = await prisma_1.prisma.lineChannel.findFirst({
            where: { tenantId },
        });
        if (!lineChannel?.channelAccessToken) {
            console.log('[Notification] No LINE channel found for tenant:', tenantId);
            return;
        }
        const notificationTargets = await prisma_1.prisma.notificationTarget.findMany({
            where: {
                tenantId,
                isActive: true,
                lineUserId: { not: null },
            },
        });
        if (notificationTargets.length === 0) {
            console.log('[Notification] No active notification targets for tenant:', tenantId);
            return;
        }
        const message = `你有一筆新的待確認訂單

摘要：${summary}

請至後台查看與確認。`;
        for (const target of notificationTargets) {
            if (!target.lineUserId)
                continue;
            const response = await fetch('https://api.line.me/v2/bot/message/push', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${lineChannel.channelAccessToken}`,
                },
                body: JSON.stringify({
                    to: target.lineUserId,
                    messages: [{ type: 'text', text: message }],
                }),
            });
            if (!response.ok) {
                console.error('[Notification] Failed to send notification to', target.lineUserId, ':', await response.text());
            }
            else {
                console.log('[Notification] Notification sent to', target.lineUserId);
            }
        }
    }
    catch (error) {
        console.error('[Notification] Error sending notification:', error);
    }
}
