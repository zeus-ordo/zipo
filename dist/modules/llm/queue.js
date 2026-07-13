"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueLlmExtraction = queueLlmExtraction;
exports.processLlmQueue = processLlmQueue;
exports.getQueueSize = getQueueSize;
exports.clearQueue = clearQueue;
const client_1 = require("@prisma/client");
const extraction_1 = require("./extraction");
const notification_1 = require("./notification");
const prisma = new client_1.PrismaClient({});
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
    const messages = await prisma.message.findMany({
        where: { conversationId: task.conversationId },
        orderBy: { createdAt: 'desc' },
        take: 10,
    });
    const reversedMessages = messages.reverse();
    const result = await (0, extraction_1.extractOrderInfo)(task.tenantId, task.conversationId, task.customerId, reversedMessages.map((m) => ({
        senderType: m.senderType,
        content: m.content,
        createdAt: m.createdAt,
    })));
    console.log(`[LLM Queue] Extraction result:`, JSON.stringify(result, null, 2));
    if (result.draft_action === 'create_or_update' || result.draft_action === 'ask_followup') {
        await prisma.orderDraft.deleteMany({
            where: {
                tenantId: task.tenantId,
                conversationId: task.conversationId,
                status: { in: ['draft_needs_review', 'draft_pending_info'] },
            },
        });
        const draftStatus = result.missing_fields.length > 0 ? 'draft_pending_info' : 'draft_needs_review';
        const customer = await prisma.customer.findUnique({
            where: { id: task.customerId },
        });
        const tenant = await prisma.tenant.findUnique({
            where: { id: task.tenantId },
        });
        const conversation = await prisma.conversation.findUnique({
            where: { id: task.conversationId },
        });
        if (!customer || !tenant || !conversation) {
            console.error('[LLM Queue] Missing required relations for OrderDraft');
            return;
        }
        const draft = await prisma.orderDraft.create({
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
                rawLlMOutput: result,
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
            const lineChannel = await prisma.lineChannel.findFirst({
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
//# sourceMappingURL=queue.js.map