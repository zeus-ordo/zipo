"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma_1 = require("../../lib/prisma");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate, tenant_1.requireTenant);
router.get('/', async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const targets = await prisma_1.prisma.notificationTarget.findMany({
            where: { tenantId, isActive: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(targets);
    }
    catch (error) {
        console.error('Error fetching notification targets:', error);
        res.status(500).json({ error: '取得通知設定失敗' });
    }
});
router.post('/', async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { name, lineUserId, email } = req.body;
        if (!name) {
            res.status(400).json({ error: '名稱必填' });
            return;
        }
        if (!lineUserId && !email) {
            res.status(400).json({ error: 'LINE 用戶 ID 或 Email 至少需要填寫一項' });
            return;
        }
        const target = await prisma_1.prisma.notificationTarget.create({
            data: {
                tenantId,
                name,
                lineUserId: lineUserId || null,
                email: email || null,
                isActive: true,
            },
        });
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'CREATE_NOTIFICATION_TARGET',
                entityType: 'NotificationTarget',
                entityId: target.id,
            },
        }).catch(console.error);
        res.status(201).json(target);
    }
    catch (error) {
        console.error('Error creating notification target:', error);
        res.status(500).json({ error: '建立通知設定失敗' });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const { name, lineUserId, email } = req.body;
        const existing = await prisma_1.prisma.notificationTarget.findFirst({
            where: { id, tenantId, isActive: true },
        });
        if (!existing) {
            res.status(404).json({ error: '找不到通知設定' });
            return;
        }
        const updateData = { updatedAt: new Date() };
        if (name !== undefined)
            updateData.name = name;
        if (lineUserId !== undefined)
            updateData.lineUserId = lineUserId;
        if (email !== undefined)
            updateData.email = email;
        const updated = await prisma_1.prisma.notificationTarget.update({
            where: { id },
            data: updateData,
        });
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'UPDATE_NOTIFICATION_TARGET',
                entityType: 'NotificationTarget',
                entityId: id,
                metadata: JSON.stringify(req.body),
            },
        }).catch(console.error);
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating notification target:', error);
        res.status(500).json({ error: '更新通知設定失敗' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const existing = await prisma_1.prisma.notificationTarget.findFirst({
            where: { id, tenantId, isActive: true },
        });
        if (!existing) {
            res.status(404).json({ error: '找不到通知設定' });
            return;
        }
        await prisma_1.prisma.notificationTarget.update({
            where: { id },
            data: { isActive: false, updatedAt: new Date() },
        });
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'DELETE_NOTIFICATION_TARGET',
                entityType: 'NotificationTarget',
                entityId: id,
            },
        }).catch(console.error);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting notification target:', error);
        res.status(500).json({ error: '刪除通知設定失敗' });
    }
});
exports.default = router;
