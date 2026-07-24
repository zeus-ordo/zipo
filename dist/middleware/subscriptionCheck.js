"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSubscription = checkSubscription;
exports.requireActiveSubscription = requireActiveSubscription;
const prisma_1 = require("../lib/prisma");
async function checkSubscription(req, res, next, options = {}) {
    const tenantId = req.user?.tenantId;
    if (!tenantId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const subscription = await prisma_1.prisma.subscription.findUnique({
        where: { tenantId },
        include: { plan: true },
    });
    if (!subscription || subscription.status !== 'active') {
        res.status(403).json({
            error: 'No active subscription',
            code: 'SUBSCRIPTION_REQUIRED'
        });
        return;
    }
    if (new Date(subscription.expiresAt) < new Date()) {
        res.status(403).json({
            error: 'Subscription expired',
            code: 'SUBSCRIPTION_EXPIRED'
        });
        return;
    }
    if (options.checkChannelLimit) {
        const channelCount = await prisma_1.prisma.lineChannel.count({
            where: { tenantId },
        });
        if (channelCount >= subscription.plan.channelLimit) {
            res.status(403).json({
                error: 'Channel limit reached',
                code: 'CHANNEL_LIMIT_EXCEEDED',
                limit: subscription.plan.channelLimit
            });
            return;
        }
    }
    if (options.checkOrderLimit) {
        const startOfMonth = new Date();
        startOfMonth.setUTCDate(1);
        startOfMonth.setUTCHours(0, 0, 0, 0);
        const orderCount = await prisma_1.prisma.order.count({
            where: { tenantId, createdAt: { gte: startOfMonth } },
        });
        const orderLimit = subscription.plan.orderLimit;
        if (orderLimit > 0 && orderCount >= orderLimit) {
            res.status(403).json({
                error: 'Monthly order limit reached',
                code: 'ORDER_LIMIT_EXCEEDED',
                limit: orderLimit
            });
            return;
        }
    }
    next();
}
function requireActiveSubscription(options) {
    return (req, res, next) => checkSubscription(req, res, next, options || {});
}
