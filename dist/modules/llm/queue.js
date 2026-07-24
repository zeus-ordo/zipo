"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueLlmExtraction = queueLlmExtraction;
exports.processLlmQueue = processLlmQueue;
exports.getQueueSize = getQueueSize;
exports.clearQueue = clearQueue;
const extraction_1 = require("./extraction");
const notification_1 = require("./notification");
const prisma_1 = require("../../lib/prisma");
const taskQueue = [];
let isProcessing = false;
function queueLlmExtraction(task) {
    const timeoutId = setTimeout(() => {
        processTask(task);
    }, 500);
    taskQueue.push({ ...task, timeoutId });
    console.log(`[LLM Queue] Task queued for conversation ${task.conversationId}. Queue size: ${taskQueue.length}`);
    processLlmQueue();
}
async function processTask(task) {
    console.log(`[LLM Queue] Processing task for conversation ${task.conversationId}`);
    const lastConfirmedOrder = await prisma_1.prisma.order.findFirst({
        where: {
            conversationId: task.conversationId,
            status: { not: 'cancelled' },
        },
        orderBy: { confirmedAt: 'desc' },
    });
    const messages = await prisma_1.prisma.message.findMany({
        where: {
            conversationId: task.conversationId,
            ...(lastConfirmedOrder?.confirmedAt
                ? { createdAt: { gt: lastConfirmedOrder.confirmedAt } }
                : {}),
        },
        orderBy: { createdAt: 'asc' },
    });
    console.log(`[LLM Queue] Messages sent to LLM (after ${lastConfirmedOrder?.confirmedAt || 'beginning'}):`);
    messages.forEach((m, i) => {
        console.log(`  [${i}] ${m.senderType}: ${m.content}`);
    });
    const result = await (0, extraction_1.extractOrderInfo)(task.tenantId, task.conversationId, task.customerId, messages.map((m) => ({
        senderType: m.senderType,
        content: m.content,
        createdAt: m.createdAt,
    })), task.imageBase64);
    console.log(`[LLM Queue] Extraction result: intent=${result.intent}, confidence=${result.confidence}, action=${result.draft_action}, items=${result.items.length}, missing=${result.missing_fields.join(',') || 'none'}`);
    console.log(`[LLM Queue] Customer info: name=${result.customer_info?.name}, phone=${result.customer_info?.phone}, address=${result.customer_info?.address}`);
    const customerInfoComplete = !!(result.customer_info?.name && result.customer_info?.phone && result.customer_info?.address);
    const shouldCreateDraft = result.draft_action === 'create_or_update' ||
        result.draft_action === 'ask_followup' ||
        (result.intent === 'order' && customerInfoComplete && result.items.length > 0);
    if (result.customer_info && (result.customer_info.name || result.customer_info.phone || result.customer_info.address)) {
        const currentCustomer = await prisma_1.prisma.customer.findUnique({
            where: { id: task.customerId },
        });
        const hasInfoChanged = (result.customer_info.name && result.customer_info.name !== currentCustomer?.name) ||
            (result.customer_info.phone && result.customer_info.phone !== currentCustomer?.phone) ||
            (result.customer_info.address && result.customer_info.address !== currentCustomer?.address);
        if (hasInfoChanged) {
            console.log('[LLM Queue] Customer info changed, setting pendingUpdate:', JSON.stringify(result.customer_info));
            await prisma_1.prisma.customer.update({
                where: { id: task.customerId },
                data: {
                    pendingInfoUpdate: JSON.stringify({
                        name: result.customer_info.name,
                        phone: result.customer_info.phone,
                        address: result.customer_info.address,
                        updatedAt: new Date().toISOString(),
                    }),
                },
            });
        }
        else {
            console.log('[LLM Queue] Customer info unchanged, no update needed');
        }
    }
    if (shouldCreateDraft) {
        await prisma_1.prisma.orderDraft.deleteMany({
            where: {
                tenantId: task.tenantId,
                conversationId: task.conversationId,
                status: { in: ['draft_needs_review', 'draft_pending_info'] },
            },
        });
        const draftStatus = customerInfoComplete ? 'draft_needs_review' : (result.missing_fields.length > 0 ? 'draft_pending_info' : 'draft_needs_review');
        const [customer, tenant, conversation] = await Promise.all([
            prisma_1.prisma.customer.findUnique({ where: { id: task.customerId } }),
            prisma_1.prisma.tenant.findUnique({ where: { id: task.tenantId } }),
            prisma_1.prisma.conversation.findUnique({ where: { id: task.conversationId } }),
        ]);
        if (!customer || !tenant || !conversation) {
            console.error('[LLM Queue] Missing required relations for OrderDraft');
            return;
        }
        const draft = await prisma_1.prisma.orderDraft.create({
            data: {
                tenantId: task.tenantId,
                customerId: task.customerId,
                conversationId: task.conversationId,
                status: draftStatus,
                source: 'llm',
                llmConfidence: result.confidence,
                needsHumanReview: result.needs_human_review,
                missingFields: JSON.stringify(result.missing_fields),
                summaryForStaff: result.summary_for_staff,
                replySuggestion: result.reply_suggestion,
                rawLlMOutput: JSON.stringify({
                    intent: result.intent,
                    confidence: result.confidence,
                    needs_human_review: result.needs_human_review,
                    draft_action: result.draft_action,
                    missing_fields: result.missing_fields,
                    item_count: result.items.length,
                    summary_for_staff: result.summary_for_staff,
                    reply_suggestion: result.reply_suggestion,
                    risk_flags: result.risk_flags,
                }),
                items: {
                    create: result.items.map(item => ({
                        tenantId: task.tenantId,
                        matchedProductId: item.matched_product_id,
                        matchedVariantId: item.matched_variant_id,
                        rawText: item.raw_text,
                        name: item.name,
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity,
                        unitPrice: item.unit_price,
                        isFuzzy: item.is_fuzzy,
                        fuzzyReason: item.fuzzy_reason,
                    })),
                },
            },
        });
        console.log(`[LLM Queue] Created OrderDraft:`, draft.id);
        if (result.draft_action === 'ask_followup' && result.reply_suggestion && customer.lineUserId) {
            const lineChannel = await prisma_1.prisma.lineChannel.findFirst({
                where: { tenantId: task.tenantId },
            });
            if (lineChannel?.channelAccessToken) {
                await (0, extraction_1.sendLineReply)(lineChannel.channelAccessToken, customer.lineUserId, result.reply_suggestion);
                console.log(`[LLM Queue] Sent follow-up reply to customer`);
            }
        }
        if (draftStatus === 'draft_needs_review' && result.summary_for_staff) {
            await (0, notification_1.notifyStoreNewDraft)(task.tenantId, draft.id, result.summary_for_staff);
        }
    }
}
function processLlmQueue() {
    if (isProcessing || taskQueue.length === 0) {
        return;
    }
    isProcessing = true;
    const task = taskQueue.shift();
    if (!task) {
        isProcessing = false;
        return;
    }
    clearTimeout(task.timeoutId);
    processTask(task)
        .then(() => {
        console.log(`[LLM Queue] Task completed for conversation ${task.conversationId}`);
    })
        .catch((err) => {
        console.error(`[LLM Queue] Task failed for conversation ${task.conversationId}:`, err);
    })
        .finally(() => {
        isProcessing = false;
        if (taskQueue.length > 0) {
            setImmediate(() => processLlmQueue());
        }
    });
}
function getQueueSize() {
    return taskQueue.length;
}
function clearQueue() {
    for (const task of taskQueue) {
        clearTimeout(task.timeoutId);
    }
    taskQueue.length = 0;
}
