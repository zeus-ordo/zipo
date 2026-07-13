"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLlmApi = callLlmApi;
exports.extractOrderInfo = extractOrderInfo;
exports.sendLineReply = sendLineReply;
const config_1 = require("../../config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({});
async function callLlmApi(messages) {
    if (!config_1.config.llm.apiKey) {
        throw new Error('LLM API key not configured');
    }
    const apiEndpoint = process.env.LLM_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config_1.config.llm.apiKey}`,
        },
        body: JSON.stringify({
            model: config_1.config.llm.model || 'gpt-4o-mini',
            messages,
            temperature: 0.3,
            response_format: { type: 'json_object' },
        }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`LLM API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}
function buildSystemPrompt(paymentMethods, deliveryMethods, products) {
    const productList = products.map(p => {
        const variants = p.variants.map(v => `[${v.color || 'N/A'}/${v.size || 'N/A'}]`).join(', ');
        return `- ${p.name} (ID: ${p.id}, Base Price: ${p.basePrice || 'N/A'}) ${variants ? `Variants: ${variants}` : ''}`;
    }).join('\n');
    return `你是服飾業訂單助理，專門從LINE對話中萃取訂單資訊。

## 你的職責
1. 從對話中識別客戶的訂購意圖
2. 萃取商品資訊（名稱、顏色、尺寸、數量、單價）
3. 萃取客戶資訊（姓名、電話、地址）
4. 萃取付款與配送資訊
5. 判斷是否需要人工確認

## 店家設定
- 支援的付款方式: ${paymentMethods || '未設定'}
- 支援的配送方式: ${deliveryMethods || '未設定'}

## 商品列表（最多20筆）
${productList || '無商品'}

## 輸出格式
你必須輸出一个JSON物件，包含以下欄位：
{
  "intent": "order | inquiry | greeting | other",
  "confidence": 0.0-1.0,
  "needs_human_review": true/false,
  "draft_action": "create_or_update | ask_followup | no_action | escalate_to_human",
  "missing_fields": ["field1", "field2"],
  "items": [
    {
      "matched_product_id": "商品ID或null",
      "matched_variant_id": "商品規格ID或null",
      "raw_text": "原始文字",
      "name": "商品名稱或null",
      "color": "顏色或null",
      "size": "尺寸或null",
      "quantity": 數量或null,
      "unit_price": 單價或null,
      "is_fuzzy": true/false,
      "fuzzy_reason": "說明為何無法準確匹配或null"
    }
  ],
  "customer_info": {
    "name": "姓名或null",
    "phone": "電話或null",
    "address": "地址或null",
    "line_display_name": "LINE顯示名稱或null"
  },
  "payment": {
    "method": "付款方式或null",
    "last_five_digits": "卡號後五碼或null",
    "status": "pending | confirmed | unknown",
    "note": "備註或null"
  },
  "delivery": {
    "method": "配送方式或null",
    "address": "地址或null",
    "store_pickup_info": "超商取貨資訊或null",
    "note": "備註或null"
  },
  "summary_for_staff": "給店家的訂單摘要或null",
  "reply_suggestion": "建議回覆客戶的文字或null",
  "risk_flags": ["flag1", "flag2"]
}

## 重要規則
- 如果無法從對話中確認任何商品，回傳 "no_action"
- 如果對話是寒暄問候，回傳 "no_action"
- 如果缺少必要資訊（電話、配送方式等），回傳 "ask_followup" 並在 reply_suggestion 提供追問文字
- 如果訂單複雜或有多個風險，回傳 "escalate_to_human"
- 只有在意圖明確、商品明確、且必要資訊齊全時，才回傳 "create_or_update"
- matched_product_id 為 null 時，is_fuzzy 必須為 true，並說明原因
- missing_fields 陣列列出所有缺少的必要資訊`;
}
function generateMockResult() {
    const mockItems = [
        {
            matched_product_id: null,
            matched_variant_id: null,
            raw_text: '黑色洋裝 M 一件',
            name: '黑色洋裝',
            color: '黑色',
            size: 'M',
            quantity: 1,
            unit_price: null,
            is_fuzzy: true,
            fuzzy_reason: '商品未在商品列表中找到精確匹配',
        },
    ];
    return {
        intent: 'order',
        confidence: 0.75,
        needs_human_review: true,
        draft_action: 'draft_needs_review',
        missing_fields: ['phone', 'delivery_method'],
        items: mockItems,
        customer_info: {
            name: null,
            phone: null,
            address: null,
            line_display_name: null,
        },
        payment: {
            method: null,
            last_five_digits: null,
            status: 'unknown',
            note: null,
        },
        delivery: {
            method: null,
            address: null,
            store_pickup_info: null,
            note: null,
        },
        summary_for_staff: '客戶想要訂購: 黑色洋裝 M x1（待確認）',
        reply_suggestion: '感謝您的詢問！請問您要的黑色洋裝是哪一个款式呢？另外請提供您的電話和配送方式（超商取貨/宅配），以便我們為您下單。',
        risk_flags: ['fuzzy_product_match'],
    };
}
async function extractOrderInfo(tenantId, conversationId, customerId, recentMessages) {
    if (!config_1.config.llm.apiKey) {
        console.log('[LLM Extraction] No API key configured, using mock result');
        return generateMockResult();
    }
    try {
        const [storeSetting, products, customer] = await Promise.all([
            prisma.storeSetting.findFirst({
                where: { tenantId },
            }),
            prisma.product.findMany({
                where: { tenantId, isActive: true },
                take: 20,
                include: {
                    variants: {
                        select: { color: true, size: true, basePrice: true },
                    },
                },
            }),
            prisma.customer.findUnique({
                where: { id: customerId },
            }),
        ]);
        const paymentMethods = storeSetting?.paymentMethods || '';
        const deliveryMethods = storeSetting?.deliveryMethods || '';
        const productList = products.map((p) => ({
            id: p.id,
            name: p.name,
            basePrice: p.basePrice,
            variants: (p.variants || []).map((v) => ({
                color: v.color,
                size: v.size,
                price: v.basePrice,
            })),
        }));
        const systemPrompt = buildSystemPrompt(paymentMethods, deliveryMethods, productList);
        const userMessages = recentMessages
            .map(m => `${m.senderType}: ${m.content}`)
            .join('\n');
        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessages },
        ];
        const responseContent = await callLlmApi(messages);
        try {
            const result = JSON.parse(responseContent);
            return result;
        }
        catch (parseError) {
            console.error('[LLM Extraction] Failed to parse LLM response:', parseError);
            console.error('[LLM Extraction] Raw response:', responseContent);
            return {
                intent: 'unknown',
                confidence: 0,
                needs_human_review: true,
                draft_action: 'escalate_to_human',
                missing_fields: [],
                items: [],
                customer_info: {
                    name: customer?.lineDisplayName || null,
                    phone: null,
                    address: null,
                    line_display_name: customer?.lineDisplayName || null,
                },
                payment: { method: null, last_five_digits: null, status: 'unknown', note: null },
                delivery: { method: null, address: null, store_pickup_info: null, note: null },
                summary_for_staff: 'LLM回傳格式無效，需要人工處理',
                reply_suggestion: '抱歉，我無法處理您的請求，請稍後由專人為您服務。',
                risk_flags: ['llm_parse_error'],
            };
        }
    }
    catch (error) {
        console.error('[LLM Extraction] Error:', error);
        return {
            intent: 'unknown',
            confidence: 0,
            needs_human_review: true,
            draft_action: 'escalate_to_human',
            missing_fields: [],
            items: [],
            customer_info: {
                name: null,
                phone: null,
                address: null,
                line_display_name: null,
            },
            payment: { method: null, last_five_digits: null, status: 'unknown', note: null },
            delivery: { method: null, address: null, store_pickup_info: null, note: null },
            summary_for_staff: 'LLM API呼叫失敗',
            reply_suggestion: '抱歉，系統發生錯誤，請稍後再試。',
            risk_flags: ['llm_api_error'],
        };
    }
}
async function sendLineReply(channelAccessToken, userId, replyText) {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${channelAccessToken}`,
        },
        body: JSON.stringify({
            to: userId,
            messages: [{ type: 'text', text: replyText }],
        }),
    });
    if (!response.ok) {
        console.error('Failed to send LINE reply:', await response.text());
    }
}
//# sourceMappingURL=extraction.js.map