"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const extraction_1 = require("./extraction");
const router = (0, express_1.Router)();
router.post('/test-extraction', async (req, res) => {
    try {
        const { tenantId, conversationId, customerId, messages } = req.body;
        if (!tenantId || !conversationId || !customerId) {
            res.status(400).json({ error: 'Missing required fields: tenantId, conversationId, customerId' });
            return;
        }
        const testMessages = messages || [
            { senderType: 'customer', content: '我要買黑色洋裝 M 一件', createdAt: new Date() },
        ];
        const result = await (0, extraction_1.extractOrderInfo)(tenantId, conversationId, customerId, testMessages.map((m, i) => ({
            senderType: m.senderType,
            content: m.content,
            createdAt: m.createdAt || new Date(Date.now() - i * 1000),
        })));
        res.json(result);
    }
    catch (error) {
        console.error('[LLM Routes] Test extraction error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map