"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSettingRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma_1 = require("../../lib/prisma");
const router = (0, express_1.Router)();
exports.storeSettingRouter = router;
router.use(auth_1.authenticate, tenant_1.requireTenant);
router.get('/', async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        let setting = await prisma_1.prisma.storeSetting.findUnique({
            where: { tenantId },
        });
        if (!setting) {
            setting = await prisma_1.prisma.storeSetting.create({
                data: {
                    tenantId,
                    paymentMethods: '[]',
                    deliveryMethods: '[]',
                },
            });
        }
        res.json({
            ...setting,
            paymentMethods: JSON.parse(setting.paymentMethods || '[]'),
            deliveryMethods: JSON.parse(setting.deliveryMethods || '[]'),
        });
    }
    catch (error) {
        console.error('Error fetching store setting:', error);
        res.status(500).json({ error: '取得商店設定失敗' });
    }
});
router.patch('/', async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { storeName, paymentMethods, deliveryMethods, customerGreeting, orderConfirmTemplate, } = req.body;
        let setting = await prisma_1.prisma.storeSetting.findUnique({
            where: { tenantId },
        });
        if (!setting) {
            setting = await prisma_1.prisma.storeSetting.create({
                data: {
                    tenantId,
                    paymentMethods: Array.isArray(paymentMethods) ? JSON.stringify(paymentMethods) : '[]',
                    deliveryMethods: Array.isArray(deliveryMethods) ? JSON.stringify(deliveryMethods) : '[]',
                },
            });
        }
        const updateData = { updatedAt: new Date() };
        if (storeName !== undefined)
            updateData.storeName = storeName;
        if (customerGreeting !== undefined)
            updateData.customerGreeting = customerGreeting;
        if (orderConfirmTemplate !== undefined)
            updateData.orderConfirmTemplate = orderConfirmTemplate;
        if (Array.isArray(paymentMethods))
            updateData.paymentMethods = JSON.stringify(paymentMethods);
        if (Array.isArray(deliveryMethods))
            updateData.deliveryMethods = JSON.stringify(deliveryMethods);
        const updated = await prisma_1.prisma.storeSetting.update({
            where: { tenantId },
            data: updateData,
        });
        res.json({
            ...updated,
            paymentMethods: JSON.parse(updated.paymentMethods || '[]'),
            deliveryMethods: JSON.parse(updated.deliveryMethods || '[]'),
        });
    }
    catch (error) {
        console.error('Error updating store setting:', error);
        res.status(500).json({ error: '更新商店設定失敗' });
    }
});
exports.default = router;
