"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma_1 = require("../../lib/prisma");
const router = (0, express_1.Router)();
exports.dashboardRouter = router;
router.use(auth_1.authenticate, tenant_1.requireTenant);
router.get('/stats', async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const [todayOrders, pendingDrafts, readyToShip, monthOrders, totalCustomers] = await Promise.all([
            prisma_1.prisma.order.count({
                where: { tenantId, createdAt: { gte: today } },
            }),
            prisma_1.prisma.orderDraft.count({
                where: {
                    tenantId,
                    status: { in: ['draft_needs_review', 'draft_pending_info'] },
                },
            }),
            prisma_1.prisma.order.count({
                where: { tenantId, status: 'ready_to_ship' },
            }),
            prisma_1.prisma.order.count({
                where: { tenantId, createdAt: { gte: startOfMonth } },
            }),
            prisma_1.prisma.customer.count({
                where: { tenantId },
            }),
        ]);
        res.json({
            todayOrders,
            pendingDrafts,
            readyToShip,
            monthOrders,
            totalCustomers,
        });
    }
    catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: '取得儀表板統計失敗' });
    }
});
