"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recognizeProductFromImage = recognizeProductFromImage;
const extraction_1 = require("../llm/extraction");
const SYSTEM_PROMPT = `你是服飾商品辨識專家。分析這張圖片，輸出商品資訊：

Output JSON only, no other text:
{
  "name": "商品名稱（如：黑色T恤、藍色洋裝）",
  "color": "顏色（如：黑色、藍色、紅色），如無法判斷回傳 null",
  "size": "尺寸（如：S、M、L、32），如無法判斷回傳 null",
  "price": 價格（數字，如：1290），如無法判斷回傳 null",
  "raw_text": "圖片中所有辨識到的文字原文",
  "confidence": 0.0-1.0 的信心度
}`;
async function recognizeProductFromImage(base64Image) {
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        {
            role: 'user',
            content: [
                {
                    type: 'image_url',
                    image_url: { url: imageUrl },
                },
                {
                    type: 'text',
                    text: '請辨識這張圖片中的商品資訊',
                },
            ],
        },
    ];
    const response = await (0, extraction_1.callLlmApi)(messages);
    try {
        const result = JSON.parse(response);
        return {
            name: result.name || null,
            color: result.color || null,
            size: result.size || null,
            price: result.price ? Number(result.price) : null,
            raw_text: result.raw_text || '',
            confidence: result.confidence || 0,
        };
    }
    catch {
        throw new Error('Failed to parse recognition result');
    }
}
