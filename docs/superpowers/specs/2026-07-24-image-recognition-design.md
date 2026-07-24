# 圖片辨識建商品與訂單功能設計

**日期：** 2026-07-24
**版本：** v1.1

---

## 1. 概述

提供兩個相關功能：
- **A) 圖片辨識建商品**：店家可在商品頁上傳圖片，系統自動辨識圖片上的文字，填入商品表單
- **B) 對話圖片辨識**：當客戶在 LINE 對話中上傳圖片時，系統自動辨識並建立訂單草稿項目

**重要原則：**
- 一張圖片 = 一個商品
- 圖片辨識後預填表單，由店家確認後才建立
- 商品建立後需儲存圖片，供後續辨識比對使用
- 此功能可依據店家訂閱方案開啟或關閉

---

## 2. 功能詳情

### 2.A 店家圖片建商品

**流程：**
1. 店家點擊商品頁的「📷 用圖片建立」按鈕
2. 選擇圖片（支援 .jpg, .png, .webp，最大 5MB）
3. 前端顯示圖片預覽 + loading 狀態
4. 前端將圖片上傳至後端 API
5. 後端呼叫 Vision API 辨識
6. 前端收到結果，自動填入表單
7. 店家編輯確認後，建立商品
8. **系統將圖片儲存至商品記錄**

**API 端點：**
```
POST /api/products/recognize-image
Content-Type: multipart/form-data

Request: image file (max 5MB)
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
- price: 價格（如果圖片上有標價，請回傳數字）
- raw_text: 圖片中所有辨識到的文字
- confidence: 辨識信心度 0-1

只輸出 JSON，無其他文字。
```

---

### 2.B LINE 對話圖片辨識

**流程：**
1. 客戶在 LINE 對話中上傳圖片
2. LINE Webhook 收到 image 類型事件
3. 系統下載圖片（LINE CDN，有效期內）
4. 呼叫 Vision API 辨識
5. 嘗試比對商品：
   - **有相符商品** → 建立有 `matched_product_id` 的 item
   - **無相符** → 建立模糊項目 "商品名稱 x1"
6. 圖片 base64 存入 message record
7. 訂單草稿建立，等待店員確認

**LINE Webhook 修改：**
- 新增 `handleImageEvent` 函數
- 下載 LINE 圖片：`GET https://api.line.me/v2/bot/message/{messageId}/content`
- 圖片轉 base64 存入 message

**商品比對邏輯：**
- 使用相似度比對（商品名稱關鍵字 + 顏色）
- threshold: 0.7 以上視為相符
- 模糊項目設 `is_fuzzy: true`，fuzzy_reason 說明

---

## 3. 資料庫變更

### 3.1 Product 表新增欄位
```prisma
model Product {
  // ... existing fields
  imageUrl       String?   // 商品圖片 URL
  imageKey       String?   // 儲存空間的 key（如 S3/R2）
}
```

### 3.2 Message 表新增欄位
```prisma
model Message {
  // ... existing fields
  imageUrl       String?   // LINE 圖片 URL（短期有效）
  imageBase64    String?   // base64 格式（長期儲存）
}
```

### 3.3 Subscription/Plan 新增功能開關
```prisma
model Plan {
  // ... existing fields
  features Json  // 方案功能列表
}

// features 範例：
// {
//   "imageRecognition": true,  // 圖片辨識功能
//   "excelImport": true,
//   "multiTenant": false
// }
```

---

## 4. API 規格

### 4.1 POST /api/products/recognize-image

**功能：** 辨識圖片中的商品資訊

**認證：** 需要店家登入

**Request：**
- Content-Type: `multipart/form-data`
- Body: `image` (file, max 5MB)

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

**Error (400):** 無效的圖片格式或大小
**Error (403):** 該方案未啟用圖片辨識功能
**Error (500):** 辨識失敗

---

### 4.2 POST /api/products (with image)

**功能：** 建立商品（可附加圖片）

**Request：**
```json
{
  "name": "黑色洋裝",
  "image": "base64 string or multipart file",
  // ... other fields
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "prod_xxx",
    "name": "黑色洋裝",
    "imageUrl": "https://storage.example.com/products/prod_xxx.jpg",
    // ...
  }
}
```

---

## 5. 前端規格

### 5.1 商品頁新增按鈕

**位置：** 商品列表頁，「新增商品」按鈕旁

**條件顯示：** 只有方案有開啟 `imageRecognition` 才顯示此按鈕

**按鈕樣式：**
```tsx
{planFeatures.imageRecognition && (
  <button
    onClick={() => setShowImageUpload(true)}
    className="btn btn-secondary"
  >
    <Camera size={16} />
    {t('products.recognize_from_image')}
  </button>
)}
```

### 5.2 圖片上傳流程

** Step 1: 選擇圖片 **
- 點擊按鈕 → 開啟 file input (accept="image/jpeg,image/png,image/webp")
- 選擇後顯示預覽

**Step 2: 辨識中**
- 顯示 loading spinner
- 禁用確認按鈕

**Step 3: 結果**
- 成功：自動填入表單，顯示「已從圖片自動填入」提示
- 失敗：顯示錯誤，不影響手動填寫

**Step 4: 店家確認**
- 店家可修改任何欄位
- 點擊建立後，圖片連同商品一起上傳

### 5.3 Modal 表單預填邏輯

當從圖片辨識結果時：
| 辨識結果 | 填入欄位 |
|----------|----------|
| `name` | 商品名稱（必填） |
| `color` | 第一個規格的顏色 |
| `size` | 第一個規格的尺寸 |
| `price` | 基本價格 |

---

## 6. 錯誤處理

| 情況 | 處理方式 |
|------|----------|
| 無 API key | 回傳錯誤，提示設定 LLM API Key |
| 圖片格式不正確 | 顯示「只支援 JPG/PNG/WEBP」 |
| 圖片太大 (>5MB) | 顯示「圖片太大，請選擇小於 5MB 的圖片」 |
| 無法辨識 | 回傳空的 name，並說明「無法從圖片辨識商品資訊」 |
| LINE 圖片下載失敗 | 跳過該圖片，不阻斷對話處理 |
| 方案未開啟功能 | 403 錯誤，前端隱藏該按鈕 |

---

## 7. 圖片儲存策略

**儲存位置：** 統一使用 S3-compatible storage（如 Cloudflare R2、AWS S3）

**儲存流程：**
1. 店家上傳圖片 → 前端 base64
2. 建立商品時一併上傳圖片
3. 取得 storage URL
4. 圖片 URL 存入 Product.imageUrl

**檔案命名：**
```
products/{tenantId}/{productId}/{timestamp}.{ext}
```

**圖片用途：**
- 未來可用於商品列表顯示
- LINE 對話圖片比對時，可比對已建立商品的圖片

---

## 8. 方案功能控制

### 8.1 Plan Features 結構
```typescript
interface PlanFeatures {
  imageRecognition: boolean;  // 圖片辨識功能
  excelImport: boolean;       // Excel 匯入
  aiExtraction: boolean;     // AI 訂單萃取
  // ... 其他功能
}
```

### 8.2 檢查流程
```typescript
async function checkImageRecognitionEnabled(tenantId: string): Promise<boolean> {
  const subscription = await prisma.subscription.findFirst({
    where: { tenantId },
    include: { plan: true }
  });

  const features = subscription?.plan?.features as PlanFeatures;
  return features?.imageRecognition ?? false;
}
```

### 8.3 前端控制
```tsx
const { data: plan } = useQuery({
  queryKey: ['plan'],
  queryFn: () => subscriptionApi.getPlan()
});

const canUseImageRecognition = plan?.features?.imageRecognition ?? false;
```

---

## 9. 安全性考量

- LINE 圖片 URL 有時效性，下載後盡快處理
- base64 圖片壓縮後儲存（max 500KB）
- API 需要認證（existing middleware）
- 頻率限制：同一店家最多 10 次/分鐘（避免濫用）
- 方案檢查在 API 層和前端層都要做

---

## 10. 影響範圍

| 檔案 | 變更 |
|------|------|
| `prisma/schema.prisma` | Product 新增 imageUrl, imageKey；Message 新增 imageUrl, imageBase64；Plan 新增 features |
| `src/modules/product/routes.ts` | 新增 `/recognize-image` 端點；修改 `POST /` 支援圖片上傳 |
| `src/modules/product/recognize.ts` | 新建，圖片辨識商業邏輯 |
| `src/modules/product/storage.ts` | 新建，圖片儲存邏輯（S3/R2） |
| `src/modules/line/routes.ts` | 新增 `handleImageEvent` |
| `src/lib/storage.ts` | 新建，S3/R2 client 包裝 |
| `frontend/src/pages/ProductsPage.tsx` | 新增按鈕、上傳流程、表單預填 |
| `frontend/src/api/client.ts` | 新增 `recognizeImage` API |
| `frontend/src/i18n/locales/*.json` | 新增翻譯 |

---

## 11. 依賴項目

- [ ] S3/R2 儲存服務設定（預計使用 Cloudflare R2，費用較低）
- [ ] 現有 LLM API Key（用於 Vision 辨識）
- [ ] Plan/Subscription 功能開關機制（需確認現有結構）

---

## 12. 待確認

- [x] 一張圖片限1商品
- [x] 預填後讓商家確認
- [x] 建立商品後儲存圖片
- [x] 依付費方案開啟/關閉
- [ ] 儲存服務要用哪一個？（R2/S3/其他）
- [ ] 圖片是否需要壓縮？
- [ ] 是否需要商品圖片展示功能？
