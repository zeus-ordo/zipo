"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../../middleware/auth");
const auth_2 = require("../../middleware/auth");
const prisma = new client_1.PrismaClient({});
const router = (0, express_1.Router)();
router.use(auth_1.authenticate, (0, auth_2.requireRole)('platform_admin'));
router.get('/stats', async (req, res) => {
    try {
        const [totalTenants, totalOrders, totalCustomers, totalConversations] = await Promise.all([
            prisma.tenant.count({ where: { isActive: true } }),
            prisma.order.count(),
            prisma.customer.count(),
            prisma.conversation.count(),
        ]);
        const llmUsageEstimate = totalOrders * 0.5;
        res.json({
            totalTenants,
            totalOrders,
            totalCustomers,
            totalConversations,
            llmUsageEstimate,
        });
    }
    catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ error: '取得平台統計失敗' });
    }
});
router.get('/tenants/:id/usage', async (req, res) => {
    try {
        const { id } = req.params;
        const tenant = await prisma.tenant.findUnique({
            where: { id },
        });
        if (!tenant) {
            res.status(404).json({ error: '店家不存在' });
            return;
        }
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const [totalOrders, totalCustomers, totalProducts, monthOrders, totalConversations,] = await Promise.all([
            prisma.order.count({ where: { tenantId: id } }),
            prisma.customer.count({ where: { tenantId: id } }),
            prisma.product.count({ where: { tenantId: id, isActive: true } }),
            prisma.order.count({ where: { tenantId: id, createdAt: { gte: startOfMonth } } }),
            prisma.conversation.count({ where: { tenantId: id } }),
        ]);
        const llmUsageEstimate = totalOrders * 0.5;
        res.json({
            tenantId: id,
            tenantName: tenant.name,
            totalOrders,
            totalCustomers,
            totalProducts,
            monthOrders,
            totalConversations,
            llmUsageEstimate,
        });
    }
    catch (error) {
        console.error('Error fetching tenant usage:', error);
        res.status(500).json({ error: '取得店家使用量失敗' });
    }
});
router.get('/audit-logs', async (req, res) => {
    try {
        const { tenantId, action, page = '1', limit = '50' } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        const where = {};
        if (tenantId)
            where.tenantId = tenantId;
        if (action)
            where.action = action;
        const [logs, total] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.auditLog.count({ where }),
        ]);
        res.json({
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / take),
            },
        });
    }
    catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ error: '取得審計日誌失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map