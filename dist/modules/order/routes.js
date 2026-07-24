"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = exports.orderDraftRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma_1 = require("../../lib/prisma");
const MAX_LIMIT = 100;
const PAGE_SIZE_DEFAULT = 20;
const validTransitions = {
    confirmed: ['ready_to_ship', 'cancelled'],
    ready_to_ship: ['shipped', 'cancelled'],
    shipped: ['cancelled'],
    cancelled: [],
};
function parseDraft(draft) {
    return {
        ...draft,
        missingFields: (() => {
            try {
                return JSON.parse(draft.missingFields || '[]');
            }
            catch {
                return [];
            }
        })(),
    };
}
const orderDraftRouter = (0, express_1.Router)();
exports.orderDraftRouter = orderDraftRouter;
orderDraftRouter.use(auth_1.authenticate, tenant_1.requireTenant);
orderDraftRouter.get('/', async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { status, page = '1', limit = '20' } = req.query;
        const pageNum = Math.min(parseInt(page), MAX_LIMIT) || 1;
        const limitNum = Math.min(parseInt(limit), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
        const skip = (pageNum - 1) * limitNum;
        const take = limitNum;
        const where = { tenantId };
        if (status) {
            where.status = status;
        }
        const [drafts, total] = await Promise.all([
            prisma_1.prisma.orderDraft.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: true,
                    customer: true,
                },
            }),
            prisma_1.prisma.orderDraft.count({ where }),
        ]);
        res.json({
            data: drafts.map((d) => parseDraft(d)),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(take ? total / take : 0),
            },
        });
    }
    catch (error) {
        console.error('Error fetching order drafts:', error);
        res.status(500).json({ error: '取得訂單草稿失敗' });
    }
});
orderDraftRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const draft = await prisma_1.prisma.orderDraft.findFirst({
            where: { id, tenantId },
            include: {
                items: true,
                customer: true,
                conversation: true,
            },
        });
        if (!draft) {
            res.status(404).json({ error: '找不到訂單草稿' });
            return;
        }
        res.json(parseDraft(draft));
    }
    catch (error) {
        console.error('Error fetching order draft:', error);
        res.status(500).json({ error: '取得訂單草稿失敗' });
    }
});
orderDraftRouter.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const { items, status, summaryForStaff, replySuggestion } = req.body;
        const existing = await prisma_1.prisma.orderDraft.findFirst({
            where: { id, tenantId },
            include: { items: true },
        });
        if (!existing) {
            res.status(404).json({ error: '找不到訂單草稿' });
            return;
        }
        const updateData = { updatedAt: new Date() };
        if (status !== undefined)
            updateData.status = status;
        if (summaryForStaff !== undefined)
            updateData.summaryForStaff = summaryForStaff;
        if (replySuggestion !== undefined)
            updateData.replySuggestion = replySuggestion;
        if (items && Array.isArray(items)) {
            await Promise.all(items.map((item) => {
                if (item.id) {
                    return prisma_1.prisma.orderDraftItem.update({
                        where: { id: item.id },
                        data: {
                            matchedProductId: item.matchedProductId,
                            matchedVariantId: item.matchedVariantId,
                            rawText: item.rawText,
                            name: item.name,
                            color: item.color,
                            size: item.size,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            isFuzzy: item.isFuzzy,
                            updatedAt: new Date(),
                        },
                    });
                }
                return Promise.resolve();
            }));
        }
        const updated = await prisma_1.prisma.orderDraft.update({
            where: { id },
            data: updateData,
            include: {
                items: true,
                customer: true,
            },
        });
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'UPDATE_ORDER_DRAFT',
                entityType: 'OrderDraft',
                entityId: id,
                metadata: JSON.stringify(req.body),
            },
        }).catch(console.error);
        res.json(parseDraft(updated));
    }
    catch (error) {
        console.error('Error updating order draft:', error);
        res.status(500).json({ error: '更新訂單草稿失敗' });
    }
});
orderDraftRouter.patch('/:draftId/items/:itemId', async (req, res) => {
    try {
        const { draftId, itemId } = req.params;
        const tenantId = req.user.tenantId;
        const { matchedProductId, unitPrice } = req.body;
        const draft = await prisma_1.prisma.orderDraft.findFirst({
            where: { id: draftId, tenantId },
        });
        if (!draft) {
            res.status(404).json({ error: '找不到訂單草稿' });
            return;
        }
        const item = await prisma_1.prisma.orderDraftItem.findFirst({
            where: { id: itemId, orderDraftId: draftId },
        });
        if (!item) {
            res.status(404).json({ error: '找不到商品項目' });
            return;
        }
        const updateData = { updatedAt: new Date() };
        if (matchedProductId !== undefined)
            updateData.matchedProductId = matchedProductId || null;
        if (unitPrice !== undefined)
            updateData.unitPrice = unitPrice;
        const updated = await prisma_1.prisma.orderDraftItem.update({
            where: { id: itemId },
            data: updateData,
        });
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating order draft item:', error);
        res.status(500).json({ error: '更新商品項目失敗' });
    }
});
orderDraftRouter.post('/:id/confirm', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const userId = req.user.userId;
        const { recipientName, recipientPhone, recipientAddress, deliveryMethod, paymentMethod } = req.body;
        const draft = await prisma_1.prisma.orderDraft.findFirst({
            where: { id, tenantId },
            include: {
                items: true,
                customer: true,
            },
        });
        if (!draft) {
            res.status(404).json({ error: '找不到訂單草稿' });
            return;
        }
        if (draft.status !== 'draft_needs_review' && draft.status !== 'draft_ready_to_confirm') {
            res.status(400).json({ error: '草稿狀態不正確，無法確認' });
            return;
        }
        if (!draft.items || draft.items.length === 0) {
            res.status(400).json({ error: '草稿中沒有商品項目，無法確認' });
            return;
        }
        if (!recipientPhone || !recipientAddress) {
            res.status(400).json({ error: '收件人電話和地址為必填欄位' });
            return;
        }
        const order = await prisma_1.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    tenantId,
                    orderDraftId: draft.id,
                    conversationId: draft.conversationId,
                    customerId: draft.customerId,
                    status: 'confirmed',
                    confirmedByUserId: userId,
                    confirmedAt: new Date(),
                    recipientName: recipientName || null,
                    recipientPhone,
                    recipientAddress,
                    deliveryMethod: deliveryMethod || null,
                    paymentMethod: paymentMethod || null,
                },
            });
            await tx.orderItem.createMany({
                data: draft.items.map((item) => ({
                    tenantId,
                    orderId: newOrder.id,
                    productId: item.matchedProductId,
                    variantId: item.matchedVariantId,
                    rawText: item.rawText,
                    name: item.name,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    lineTotal: item.quantity && item.unitPrice ? item.quantity * item.unitPrice : null,
                    isFuzzy: item.isFuzzy,
                })),
            });
            await tx.orderDraft.delete({ where: { id } });
            await tx.auditLog.create({
                data: {
                    userId,
                    tenantId,
                    action: 'CONFIRM_ORDER_DRAFT',
                    entityType: 'Order',
                    entityId: newOrder.id,
                    metadata: JSON.stringify({ draftId: id }),
                },
            });
            return newOrder;
        });
        const createdOrder = await prisma_1.prisma.order.findUnique({
            where: { id: order.id },
            include: { items: true },
        });
        res.status(201).json(createdOrder);
    }
    catch (error) {
        console.error('Error confirming order draft:', error);
        res.status(500).json({ error: '確認訂單草稿失敗' });
    }
});
orderDraftRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const existing = await prisma_1.prisma.orderDraft.findFirst({
            where: { id, tenantId },
        });
        if (!existing) {
            res.status(404).json({ error: '找不到訂單草稿' });
            return;
        }
        await prisma_1.prisma.orderDraft.delete({ where: { id } });
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'DELETE_ORDER_DRAFT',
                entityType: 'OrderDraft',
                entityId: id,
            },
        }).catch(console.error);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting order draft:', error);
        res.status(500).json({ error: '刪除訂單草稿失敗' });
    }
});
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter.use(auth_1.authenticate, tenant_1.requireTenant);
orderRouter.get('/', async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { status, page = '1', limit = '20' } = req.query;
        const pageNum = Math.min(parseInt(page), MAX_LIMIT) || 1;
        const limitNum = Math.min(parseInt(limit), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
        const skip = (pageNum - 1) * limitNum;
        const take = limitNum;
        const where = { tenantId };
        if (status) {
            where.status = status;
        }
        const [orders, total] = await Promise.all([
            prisma_1.prisma.order.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: true,
                    customer: true,
                },
            }),
            prisma_1.prisma.order.count({ where }),
        ]);
        res.json({
            data: orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(take ? total / take : 0),
            },
        });
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: '取得訂單失敗' });
    }
});
orderRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const order = await prisma_1.prisma.order.findFirst({
            where: { id, tenantId },
            include: {
                items: true,
                customer: true,
            },
        });
        if (!order) {
            res.status(404).json({ error: '找不到訂單' });
            return;
        }
        res.json(order);
    }
    catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: '取得訂單失敗' });
    }
});
orderRouter.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const { status: newStatus } = req.body;
        if (!newStatus) {
            res.status(400).json({ error: '狀態為必填欄位' });
            return;
        }
        const order = await prisma_1.prisma.order.findFirst({
            where: { id, tenantId },
        });
        if (!order) {
            res.status(404).json({ error: '找不到訂單' });
            return;
        }
        const allowedTransitions = validTransitions[order.status] || [];
        if (!allowedTransitions.includes(newStatus)) {
            res.status(400).json({
                error: `無法從 ${order.status} 轉換到 ${newStatus}`,
                allowedTransitions,
            });
            return;
        }
        const updated = await prisma_1.prisma.order.update({
            where: { id },
            data: {
                status: newStatus,
                updatedAt: new Date(),
            },
            include: {
                items: true,
                customer: true,
            },
        });
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'UPDATE_ORDER_STATUS',
                entityType: 'Order',
                entityId: id,
                metadata: JSON.stringify({ from: order.status, to: newStatus }),
            },
        }).catch(console.error);
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: '更新訂單狀態失敗' });
    }
});
orderRouter.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user.tenantId;
        const { recipientName, recipientPhone, recipientAddress, deliveryMethod, deliveryNote, paymentMethod, paymentStatus, paymentLastFiveDigits, paymentNote, staffNote, } = req.body;
        const existing = await prisma_1.prisma.order.findFirst({
            where: { id, tenantId },
        });
        if (!existing) {
            res.status(404).json({ error: '找不到訂單' });
            return;
        }
        const updateData = { updatedAt: new Date() };
        if (recipientName !== undefined)
            updateData.recipientName = recipientName;
        if (recipientPhone !== undefined)
            updateData.recipientPhone = recipientPhone;
        if (recipientAddress !== undefined)
            updateData.recipientAddress = recipientAddress;
        if (deliveryMethod !== undefined)
            updateData.deliveryMethod = deliveryMethod;
        if (deliveryNote !== undefined)
            updateData.deliveryNote = deliveryNote;
        if (paymentMethod !== undefined)
            updateData.paymentMethod = paymentMethod;
        if (paymentStatus !== undefined)
            updateData.paymentStatus = paymentStatus;
        if (paymentLastFiveDigits !== undefined)
            updateData.paymentLastFiveDigits = paymentLastFiveDigits;
        if (paymentNote !== undefined)
            updateData.paymentNote = paymentNote;
        if (staffNote !== undefined)
            updateData.staffNote = staffNote;
        const updated = await prisma_1.prisma.order.update({
            where: { id },
            data: updateData,
            include: {
                items: true,
                customer: true,
            },
        });
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'UPDATE_ORDER',
                entityType: 'Order',
                entityId: id,
                metadata: JSON.stringify(req.body),
            },
        }).catch(console.error);
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: '更新訂單失敗' });
    }
});
orderRouter.patch('/:orderId/items/:itemId', async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const tenantId = req.user.tenantId;
        const { unitPrice, quantity } = req.body;
        const order = await prisma_1.prisma.order.findFirst({
            where: { id: orderId, tenantId },
        });
        if (!order) {
            res.status(404).json({ error: '找不到訂單' });
            return;
        }
        const item = await prisma_1.prisma.orderItem.findFirst({
            where: { id: itemId, orderId },
        });
        if (!item) {
            res.status(404).json({ error: '找不到商品項目' });
            return;
        }
        const updateData = { updatedAt: new Date() };
        if (unitPrice !== undefined)
            updateData.unitPrice = unitPrice;
        if (quantity !== undefined)
            updateData.quantity = quantity;
        const updated = await prisma_1.prisma.orderItem.update({
            where: { id: itemId },
            data: updateData,
        });
        if (unitPrice !== undefined || quantity !== undefined) {
            const newLineTotal = (updated.unitPrice || 0) * (updated.quantity || 0);
            await prisma_1.prisma.orderItem.update({
                where: { id: itemId },
                data: { lineTotal: newLineTotal },
            });
        }
        await prisma_1.prisma.auditLog.create({
            data: {
                userId: req.user.userId,
                tenantId,
                action: 'UPDATE_ORDER_ITEM',
                entityType: 'OrderItem',
                entityId: itemId,
                metadata: JSON.stringify({ unitPrice, quantity }),
            },
        }).catch(console.error);
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating order item:', error);
        res.status(500).json({ error: '更新商品項目失敗' });
    }
});
exports.default = orderRouter;
