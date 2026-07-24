"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const auth_2 = require("../../middleware/auth");
const prisma_1 = require("../../lib/prisma");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
// GET /plans - available to all authenticated users
router.get('/', async (req, res) => {
    const plans = await prisma_1.prisma.plan.findMany({
        where: { isActive: true },
        orderBy: { price: 'asc' },
    });
    res.json(plans);
});
// POST, PATCH, DELETE - only platform_admin
router.post('/', (0, auth_2.requireRole)('platform_admin'), async (req, res) => {
    const { name, price, orderLimit, channelLimit, features, isDefault } = req.body;
    if (isDefault) {
        await prisma_1.prisma.plan.updateMany({
            where: { isDefault: true },
            data: { isDefault: false },
        });
    }
    const plan = await prisma_1.prisma.plan.create({
        data: { name, price, orderLimit, channelLimit, features, isDefault: isDefault || false },
    });
    res.status(201).json(plan);
});
router.patch('/:id', (0, auth_2.requireRole)('platform_admin'), async (req, res) => {
    const id = req.params.id;
    const { name, price, orderLimit, channelLimit, features, isActive, isDefault } = req.body;
    if (isDefault) {
        await prisma_1.prisma.plan.updateMany({
            where: { isDefault: true },
            data: { isDefault: false },
        });
    }
    const plan = await prisma_1.prisma.plan.update({
        where: { id },
        data: { name, price, orderLimit, channelLimit, features, isActive, isDefault },
    });
    res.json(plan);
});
router.delete('/:id', (0, auth_2.requireRole)('platform_admin'), async (req, res) => {
    const id = req.params.id;
    await prisma_1.prisma.plan.update({
        where: { id },
        data: { isActive: false },
    });
    res.status(204).send();
});
exports.default = router;
