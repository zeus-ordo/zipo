"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const prisma_1 = require("../../lib/prisma");
const MAX_LIMIT = 100;
const PAGE_SIZE_DEFAULT = 20;
const router = (0, express_1.Router)();
router.use(auth_1.authenticate, (0, auth_1.requireRole)('platform_admin'));
router.get('/stats', async (req, res) => {
    try {
        const [totalTenants, totalOrders, totalCustomers, totalConversations] = await Promise.all([
            prisma_1.prisma.tenant.count({ where: { isActive: true } }),
            prisma_1.prisma.order.count(),
            prisma_1.prisma.customer.count(),
            prisma_1.prisma.conversation.count(),
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
        const tenant = await prisma_1.prisma.tenant.findUnique({
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
            prisma_1.prisma.order.count({ where: { tenantId: id } }),
            prisma_1.prisma.customer.count({ where: { tenantId: id } }),
            prisma_1.prisma.product.count({ where: { tenantId: id, isActive: true } }),
            prisma_1.prisma.order.count({ where: { tenantId: id, createdAt: { gte: startOfMonth } } }),
            prisma_1.prisma.conversation.count({ where: { tenantId: id } }),
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
        const pageNum = Math.min(parseInt(page), MAX_LIMIT) || 1;
        const limitNum = Math.min(parseInt(limit), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
        const skip = (pageNum - 1) * limitNum;
        const take = limitNum;
        const where = {};
        if (tenantId)
            where.tenantId = tenantId;
        if (action)
            where.action = action;
        const [logs, total] = await Promise.all([
            prisma_1.prisma.auditLog.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.prisma.auditLog.count({ where }),
        ]);
        res.json({
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(take ? total / take : 0),
            },
        });
    }
    catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ error: '取得審計日誌失敗' });
    }
});
router.post('/subscriptions', async (req, res) => {
    try {
        const { tenantId, planId } = req.body;
        if (!tenantId || !planId) {
            res.status(400).json({ error: 'tenantId and planId are required' });
            return;
        }
        const tenant = await prisma_1.prisma.tenant.findUnique({ where: { id: tenantId } });
        if (!tenant) {
            res.status(404).json({ error: 'Tenant not found' });
            return;
        }
        const plan = await prisma_1.prisma.plan.findUnique({ where: { id: planId } });
        if (!plan) {
            res.status(404).json({ error: 'Plan not found' });
            return;
        }
        const existing = await prisma_1.prisma.subscription.findUnique({ where: { tenantId } });
        if (existing) {
            res.status(409).json({ error: 'Subscription already exists', subscription: existing });
            return;
        }
        const subscription = await prisma_1.prisma.subscription.create({
            data: {
                tenantId,
                planId,
                status: 'active',
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
            include: { plan: true },
        });
        res.status(201).json(subscription);
    }
    catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: '建立訂閱失敗' });
    }
});
router.patch('/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { lineDisplayName, name, phone, address } = req.body;
        const customer = await prisma_1.prisma.customer.findUnique({ where: { id } });
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        const updated = await prisma_1.prisma.customer.update({
            where: { id },
            data: {
                ...(lineDisplayName !== undefined && { lineDisplayName }),
                ...(name !== undefined && { name }),
                ...(phone !== undefined && { phone }),
                ...(address !== undefined && { address }),
            },
        });
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: '更新失敗' });
    }
});
router.post('/customers/:id/refresh-line-profile', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma_1.prisma.customer.findUnique({ where: { id } });
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        const tenant = await prisma_1.prisma.tenant.findUnique({
            where: { id: customer.tenantId },
            include: { lineChannels: true },
        });
        if (!tenant || !tenant.lineChannels[0]?.channelAccessToken) {
            res.status(400).json({ error: 'No LINE channel configured' });
            return;
        }
        const accessToken = tenant.lineChannels[0].channelAccessToken;
        const profileRes = await fetch(`https://api.line.me/v2/bot/profile/${customer.lineUserId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (!profileRes.ok) {
            res.status(400).json({ error: 'Failed to get LINE profile' });
            return;
        }
        const profile = await profileRes.json();
        const updated = await prisma_1.prisma.customer.update({
            where: { id },
            data: {
                lineDisplayName: profile.displayName,
                linePictureUrl: profile.pictureUrl,
            },
        });
        res.json(updated);
    }
    catch (error) {
        console.error('Error refreshing LINE profile:', error);
        res.status(500).json({ error: '刷新失敗' });
    }
});
router.get('/customers', async (req, res) => {
    try {
        const customers = await prisma_1.prisma.customer.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(customers);
    }
    catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: '取得失敗' });
    }
});
router.get('/debug/users', async (req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                tenantId: true,
                tenant: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        const lineChannels = await prisma_1.prisma.lineChannel.findMany({
            select: {
                id: true,
                channelId: true,
                tenantId: true,
            },
        });
        res.json({ users, lineChannels });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Debug error' });
    }
});
exports.default = router;
