"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../../middleware/auth");
const auth_2 = require("../../middleware/auth");
const prisma = new client_1.PrismaClient({});
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.use((0, auth_2.requireRole)('platform_admin'));
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: '名稱必填' });
            return;
        }
        const tenant = await prisma.tenant.create({
            data: {
                name,
                storeSettings: {
                    create: {
                        paymentMethods: '[]',
                        deliveryMethods: '[]',
                    },
                },
            },
            include: {
                storeSettings: true,
            },
        });
        res.status(201).json({
            id: tenant.id,
            name: tenant.name,
            isActive: tenant.isActive,
            createdAt: tenant.createdAt,
            updatedAt: tenant.updatedAt,
        });
    }
    catch (error) {
        console.error('Create tenant error:', error);
        res.status(500).json({ error: '建立店家失敗' });
    }
});
router.get('/', async (req, res) => {
    try {
        const tenants = await prisma.tenant.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(tenants.map((t) => ({
            id: t.id,
            name: t.name,
            isActive: t.isActive,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
        })));
    }
    catch (error) {
        console.error('Get tenants error:', error);
        res.status(500).json({ error: '取得店家失敗' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const tenant = await prisma.tenant.findUnique({
            where: { id: req.params.id },
        });
        if (!tenant) {
            res.status(404).json({ error: '店家不存在' });
            return;
        }
        res.json({
            id: tenant.id,
            name: tenant.name,
            isActive: tenant.isActive,
            createdAt: tenant.createdAt,
            updatedAt: tenant.updatedAt,
        });
    }
    catch (error) {
        console.error('Get tenant error:', error);
        res.status(500).json({ error: '取得店家失敗' });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (isActive !== undefined)
            data.isActive = isActive;
        const tenant = await prisma.tenant.update({
            where: { id: req.params.id },
            data,
        });
        res.json({
            id: tenant.id,
            name: tenant.name,
            isActive: tenant.isActive,
            createdAt: tenant.createdAt,
            updatedAt: tenant.updatedAt,
        });
    }
    catch (error) {
        console.error('Update tenant error:', error);
        res.status(500).json({ error: '更新店家失敗' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await prisma.tenant.update({
            where: { id: req.params.id },
            data: { isActive: false },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Delete tenant error:', error);
        res.status(500).json({ error: '停用店家失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map