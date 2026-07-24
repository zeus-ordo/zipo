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
    const tenant = await prisma_1.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { balance: true },
    });
    const transactions = await prisma_1.prisma.balanceTransaction.findMany({
        where: { tenantId },
        orderBy: { createdAt: 'desc' },
        take: 50,
    });
    res.json({
        balance: tenant?.balance || 0,
        transactions,
    });
});
router.post('/deduct', tenant_1.requireTenant, async (req, res) => {
    const tenantId = req.user.tenantId;
    const { amount, description } = req.body;
    const tenant = await prisma_1.prisma.tenant.findUnique({
        where: { id: tenantId },
    });
    if (!tenant || tenant.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }
    const [transaction] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.tenant.update({
            where: { id: tenantId },
            data: { balance: { decrement: amount } },
        }),
        prisma_1.prisma.balanceTransaction.create({
            data: {
                tenantId,
                amount: -amount,
                type: 'deduction',
                description: description || 'Order deduction',
            },
        }),
    ]);
    res.json(transaction);
});
router.post('/topup', tenant_1.requireTenant, async (req, res) => {
    const tenantId = req.user.tenantId;
    const { amount, description } = req.body;
    const [transaction] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.tenant.update({
            where: { id: tenantId },
            data: { balance: { increment: amount } },
        }),
        prisma_1.prisma.balanceTransaction.create({
            data: {
                tenantId,
                amount,
                type: 'topup',
                description: description || 'Balance topup',
            },
        }),
    ]);
    res.json(transaction);
});
exports.default = router;
