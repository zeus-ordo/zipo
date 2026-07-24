"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma_1 = require("../../lib/prisma");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/current', tenant_1.requireTenant, async (req, res) => {
    const tenantId = req.user.tenantId;
    console.log('[Subscription] Checking for tenant:', tenantId);
    let subscription = await prisma_1.prisma.subscription.findUnique({
        where: { tenantId },
        include: { plan: true },
    });
    if (!subscription) {
        console.log('[Subscription] No subscription found, creating one...');
        const defaultPlan = await prisma_1.prisma.plan.findFirst({
            where: { isDefault: true },
        });
        console.log('[Subscription] Default plan:', defaultPlan);
        if (defaultPlan) {
            try {
                subscription = await prisma_1.prisma.subscription.create({
                    data: {
                        tenantId,
                        planId: defaultPlan.id,
                        status: 'active',
                        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    },
                    include: { plan: true },
                });
                console.log('[Subscription] Created subscription:', subscription);
            }
            catch (err) {
                console.error('[Subscription] Error creating subscription:', err);
            }
        }
    }
    if (!subscription) {
        return res.status(404).json({ error: 'No subscription found' });
    }
    const startOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);
    const [orderCount, channelCount] = await Promise.all([
        prisma_1.prisma.order.count({
            where: { tenantId, createdAt: { gte: startOfMonth } },
        }),
        prisma_1.prisma.lineChannel.count({
            where: { tenantId },
        }),
    ]);
    res.json({
        ...subscription,
        currentUsage: { orderCount, channelCount },
    });
});
router.get('/tenant/:tenantId', auth_1.authenticate, async (req, res) => {
    const tenantId = req.params.tenantId;
    const subscription = await prisma_1.prisma.subscription.findUnique({
        where: { tenantId },
        include: { plan: true },
    });
    res.json(subscription);
});
router.patch('/tenant/:tenantId', auth_1.authenticate, async (req, res) => {
    const tenantId = req.params.tenantId;
    const { planId, status } = req.body;
    const subscription = await prisma_1.prisma.subscription.findUnique({
        where: { tenantId },
    });
    if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
    }
    const updated = await prisma_1.prisma.subscription.update({
        where: { tenantId },
        data: { planId, status },
        include: { plan: true },
    });
    res.json(updated);
});
exports.default = router;
