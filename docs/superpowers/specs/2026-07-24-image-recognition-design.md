# 圖片辨識建商品與訂單功能設計

**日期：** 2026-07-24
**版本：** v1.0

---

## 1. 概述

提供兩個相關功能：
- **A) 圖片辨識建商品**：店家可在商品頁上傳圖片，系統自動辨識圖片上的文字，填入商品表單
- **B) 對話圖片辨識**：當客戶在 LINE 對話中上傳圖片時，系統自動辨識並建立訂單草稿項目

---

## 2. 功能詳情

### 2.A 店家圖片建商品

**流程：**
1. 商品頁新增「📷 用圖片建立」按鈕
2. 店家選擇圖片（支援 .jpg, .png, .webp）
3. 前端將圖片轉為 base64，呼叫後端 API
4. 後端下載 LINE 圖片（或處理 base64）並呼叫 Vision API
5. API 回傳辨識結果（商品名稱、顏色、尺寸、價格）
6. 前端自動填入商品表單欄位
7. 店家確認後建立商品

**API 端點：**
```
POST /api/products/recognize-image
Content-Type: multipart/form-data

Request: image file
Response: {
  name: string,
  color: string | null,
  size: string | null,
  price: number | null,
  raw_text: string,
  confidence: number
}
```

**Prompt 設計：**
```
你是服飾商品辨識專家。分析這張圖片，輸出商品資訊：
- name: 商品名稱（如：黑色T恤、藍色洋裝）
- color: 顏色（如果能判斷）
- size: 尺寸（如果能從文字中看到）
- price: 價格（如果圖片上有標價）
- raw_text: 圖片中所有辨識到的文字
- confidence: 辨識信心度 0-1

只輸出 JSON，無其他文字。
```

---

### 2.B LINE 對話圖片辨識

**流程：**
1. 客戶在 LINE 對話中上傳圖片
2. LINE Webhook 收到 image 類型事件
3. 系統下載圖片（LINE CDN）
4. 呼叫 Vision API 辨識
5. 嘗試比對商品：
   - 有相符商品 → 建立有 `matched_product_id` 的 item
   - 無相符 → 建立模糊項目 "商品名稱 x1"
6. 圖片資訊存入 message record
7. 訂單草稿建立，等店員確認

**LINE Webhook 修改：**
- 新增 `handleImageEvent` 函數
- 下載 LINE 圖片：`GET https://api.line.me/v2/bot/message/{messageId}/content`
- 圖片轉 base64 存入 message

**商品比對邏輯：**
- 使用相似度比對（商品名稱 + 顏色）
- threshold: 0.7 以上視為相符
- 模糊項目設 `is_fuzzy: true`

---

## 3. 資料庫變更

### 3.1 Message 表新增欄位
```prisma
model Message {
  // ... existing fields
  imageUrl       String?
  imageBase64    String?
}
```

### 3.2 LlmItem 新增欄位
```typescript
interface LlmItem {
  // ... existing fields
  image_url?: string      // 圖片 URL
  raw_text?: string       // 圖片辨識原始文字
}
```

---

## 4. API 規格

### 4.1 POST /api/products/recognize-image

**功能：** 辨識圖片中的商品資訊

**Request：**
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "name": "黑色洋裝",
    "color": "黑色",
    "size": null,
    "price": 1290,
    "raw_text": "黑色洋裝 $1290",
    "confidence": 0.85
  }
}
```

**Error (400):** 無效的圖片格式
**Error (500):** 辨識失敗

---

## 5. 前端規格

### 5.1 商品頁新增按鈕

**位置：** 商品列表頁，「新增商品」按鈕旁

**按鈕樣式：**
```tsx
<button className="btn btn-secondary">
  <Camera size={16} />
  {t('products.recognize_from_image')}
</button>
```

**翻譯 key：** `products.recognize_from_image`

### 5.2 圖片選擇與上傳流程

1. 點擊按鈕 → 開啟 file input (accept="image/*")
2. 選擇圖片後 → 顯示預覽 + loading
3. 呼叫 API → 回傳結果
4. 成功 → 自動填入表單，顯示「已自動填入」提示
5. 失敗 → 顯示錯誤提示

### 5.3 Modal 表單預填

當從圖片辨識結果時：
- `name` → 商品名稱欄位
- `color` → 規格的顏色欄位
- `size` → 規格的尺寸欄位
- `price` → 價格欄位

---

## 6. 錯誤處理

| 情況 | 處理方式 |
|------|----------|
| 無 API key | 回傳錯誤，提示設定 |
| 圖片格式不正確 | 顯示「只支援 JPG/PNG/WEBP」 |
| 圖片太大 (>5MB) | 顯示「圖片太大，請選擇小於 5MB 的圖片」 |
| 無法辨識 | 回傳空的 name，並說明「無法從圖片辨識商品資訊」 |
| LINE 圖片下載失敗 | 跳過該圖片，不阻斷對話處理 |

---

## 7. 安全性考量

- LINE 圖片 URL 有時效性，盡快下載並處理
- base64 圖片不長期儲存
- API 需要認證（existing middleware）
- 頻率限制：同一店家最多 10 次/分鐘

---

## 8. 影響範圍

| 檔案 | 變更 |
|------|------|
| `src/modules/product/routes.ts` | 新增 `/recognize-image` 端點 |
| `src/modules/product/recognize.ts` | 新建，圖片辨識商業邏輯 |
| `src/modules/line/routes.ts` | 新增 `handleImageEvent` |
| `prisma/schema.prisma` | Message 新增 imageUrl, imageBase64 |
| `frontend/src/pages/ProductsPage.tsx` | 新增按鈕、上傳邏輯、表單預填 |
| `frontend/src/i18n/locales/*.json` | 新增翻譯 |

---

## 9. 待討論

- [ ] 是否需要支援多個商品辨識（一張圖有多件商品）？
- [ ] 店家建商品時，是否要先顯示辨識結果讓店家編輯後再建立？
- [ ] 圖片是否要儲存到 storage？（目前假設不儲存）
