# 圖片辨識建商品與訂單 - 實作計劃

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**目標：** 實作圖片辨識功能，包括店家上傳圖片建立商品，以及 LINE 對話中圖片辨識建立訂單草稿

**架構：**
- 使用 Supabase Storage 儲存商品圖片
- 使用現有 LLM API（GPT-4o-mini）進行 Vision 圖片辨識
- 圖片辨識結果預填商品表單，店家確認後建立
- LINE 對話圖片自動下載、辨識、比對商品，建立訂單草稿項目

**技術堆疊：**
- Prisma + PostgreSQL
- Supabase Storage
- GPT-4o-mini Vision API
- React + TypeScript

---

## Chunk 1: 資料庫變更

**目標：** 更新 Prisma Schema，新增商品圖片、訊息圖片、功能開關欄位

**Files:**
- Modify: `prisma/schema.prisma`
- Modify: `src/modules/product/routes.ts` (API route changes)

---

- [ ] **Step 1: 修改 Prisma Schema - Product 新增 imageUrl, imageKey**

找到 `model Product`，在最後一個欄位後新增：

```prisma
model Product {
  id          String   @id @default(cuid())
  tenantId    String
  name        String
  sku         String?
  category    String?
  description String?
  basePrice   Float?
  imageUrl    String?  // 商品圖片 URL
  imageKey    String?  // Storage key
  // ... existing fields
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- [ ] **Step 2: 修改 Prisma Schema - Message 新增 imageUrl, imageBase64**

找到 `model Message`，在最後一個欄位後新增：

```prisma
model Message {
  id             String   @id @default(cuid())
  conversationId String
  senderType     String   // "customer" | "staff" | "system"
  content        String?
  imageUrl       String?  // LINE 圖片 URL（短期有效）
  imageBase64    String?  // base64 格式（長期儲存）
  // ... existing fields
}
```

- [ ] **Step 3: 修改 Prisma Schema - Plan 新增 features**

找到 `model Plan`，新增：

```prisma
model Plan {
  id          String   @id @default(cuid())
  name        String
  price       Float
  interval    String   // "month" | "year"
  features    Json?    // 功能開關，如 { "imageRecognition": true }
  // ... existing fields
}
```

- [ ] **Step 4: 產生 Migration**

```bash
cd C:\Users\Zues\Desktop\CR\zipo
npx prisma migrate dev --name add_image_fields_and_features
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add imageUrl to Product, imageUrl/imageBase64 to Message, features to Plan"
git push
```

---

## Chunk 2: Supabase Storage 服務

**目標：** 建立圖片上傳/下載工具

**Files:**
- Create: `src/lib/storage.ts`
- Modify: `src/config/index.ts` (新增 STORAGE_* 環境變數)

---

- [ ] **Step 1: 建立 storage.ts**

```typescript
// src/lib/storage.ts
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import { v4 as uuidv4 } from 'uuid';

const supabase = config.storage.url
  ? createClient(config.storage.url, config.storage.key)
  : null;

export interface UploadResult {
  url: string;
  key: string;
}

export async function uploadProductImage(
  tenantId: string,
  productId: string,
  base64Data: string,
  contentType: string = 'image/jpeg'
): Promise<UploadResult> {
  if (!supabase) {
    throw new Error('Storage not configured');
  }

  const ext = contentType.split('/')[1] || 'jpg';
  const key = `products/${tenantId}/${productId}/${uuidv4()}.${ext}`;

  // Remove data URL prefix if present
  const base64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');

  const { error } = await supabase.storage
    .bucket('products')
    .upload(key, buffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.bucket('products').getPublicUrl(key);

  return {
    url: data.publicUrl,
    key,
  };
}

export async function deleteProductImage(key: string): Promise<void> {
  if (!supabase) return;

  await supabase.storage.bucket('products').remove([key]);
}

export function getImageUrl(key: string): string {
  if (!supabase) return '';
  const { data } = supabase.storage.bucket('products').getPublicUrl(key);
  return data.publicUrl;
}
```

- [ ] **Step 2: 安裝 Supabase client**

```bash
cd C:\Users\Zues\Desktop\CR\zipo
npm install @supabase/supabase-js
npm install -D @types/uuid
```

- [ ] **Step 3: 更新 config/index.ts**

```typescript
// 在現有 config 中新增
storage: {
  url: process.env.SUPABASE_URL || '',
  key: process.env.SUPABASE_SERVICE_KEY || '',
},
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Supabase Storage integration for product images"
git push
```

---

## Chunk 3: 圖片辨識 API

**目標：** 建立 `/api/products/recognize-image` 端點

**Files:**
- Create: `src/modules/product/recognize.ts`
- Modify: `src/modules/product/routes.ts`
- Modify: `src/modules/llm/extraction.ts` (共用 callLlmApi)

---

- [ ] **Step 1: 建立 recognize.ts**

```typescript
// src/modules/product/recognize.ts
import { callLlmApi } from '../llm/extraction';

export interface ImageRecognitionResult {
  name: string | null;
  color: string | null;
  size: string | null;
  price: number | null;
  raw_text: string;
  confidence: number;
}

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

export async function recognizeProductFromImage(
  base64Image: string
): Promise<ImageRecognitionResult> {
  const imageUrl = `data:image/jpeg;base64,${base64Image}`;

  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    {
      role: 'user' as const,
      content: [
        {
          type: 'image_url' as const,
          image_url: { url: imageUrl },
        },
        {
          type: 'text' as const,
          text: '請辨識這張圖片中的商品資訊',
        },
      ],
    },
  ];

  const response = await callLlmApi(messages);

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
  } catch {
    throw new Error('Failed to parse recognition result');
  }
}
```

- [ ] **Step 2: 更新 extraction.ts - 讓 callLlmApi 支援 vision**

找到 `callLlmApi` 函數，修改 `body` 部分：

```typescript
// 在 callLlmApi 中修改
const body = JSON.stringify({
  model: config.llm.model || 'gpt-4o-mini',
  messages,  // messages 現在可以包含 image_url 類型
  temperature: 0.3,
});
```

- [ ] **Step 3: 在 routes.ts 新增端點**

在 `src/modules/product/routes.ts` 中引入並新增路由：

```typescript
import { recognizeProductFromImage } from './recognize';
import { checkFeatureEnabled } from '../../lib/subscription';

// ... existing code ...

// 新增 recognize-image 路由
router.post('/recognize-image', authenticate, requireTenant, async (req, res) => {
  try {
    const tenantId = req.user!.tenantId!;

    // 檢查功能是否啟用
    const enabled = await checkFeatureEnabled(tenantId, 'imageRecognition');
    if (!enabled) {
      res.status(403).json({ error: 'Image recognition not enabled for your plan' });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    // 驗證檔案類型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      res.status(400).json({ error: 'Only JPG, PNG, WEBP supported' });
      return;
    }

    // 驗證檔案大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      res.status(400).json({ error: 'File too large, max 5MB' });
      return;
    }

    const base64 = file.buffer.toString('base64');
    const result = await recognizeProductFromImage(base64);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Image recognition error:', error);
    res.status(500).json({ error: 'Recognition failed' });
  }
});
```

- [ ] **Step 4: 建立 subscription helper**

建立 `src/lib/subscription.ts`：

```typescript
import { prisma } from './prisma';

export async function checkFeatureEnabled(
  tenantId: string,
  feature: string
): Promise<boolean> {
  const subscription = await prisma.subscription.findFirst({
    where: { tenantId },
    include: { plan: true },
  });

  if (!subscription?.plan?.features) {
    return false;
  }

  const features = subscription.plan.features as Record<string, boolean>;
  return features[feature] ?? false;
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add image recognition API endpoint"
git push
```

---

## Chunk 4: LINE 對話圖片處理

**目標：** 修改 LINE Webhook 處理 image 類型事件

**Files:**
- Modify: `src/modules/line/routes.ts`

---

- [ ] **Step 1: 新增 handleImageEvent 函數**

在 `src/modules/line/routes.ts` 中新增：

```typescript
async function handleImageEvent(
  event: LineWebhookEvent,
  tenantId: string,
  channelId: string,
  lineAccessToken?: string
): Promise<void> {
  const lineUserId = event.source?.userId;
  const messageId = event.message?.id;

  if (!lineUserId || !messageId) return;

  // 下載 LINE 圖片
  let imageBase64: string | null = null;
  let imageUrl: string | null = null;

  if (lineAccessToken) {
    try {
      const response = await fetch(
        `https://api-data.line.me/v2/bot/message/${messageId}/content`,
        {
          headers: {
            Authorization: `Bearer ${lineAccessToken}`,
          },
        }
      );

      if (response.ok) {
        const buffer = await response.arrayBuffer();
        imageBase64 = Buffer.from(buffer).toString('base64');
        imageUrl = `https://api.line.me/v2/bot/message/${messageId}/content`;
      }
    } catch (error) {
      console.error('Failed to download LINE image:', error);
    }
  }

  // 取得或建立 customer
  let customer = await prisma.customer.findFirst({
    where: { tenantId, lineUserId },
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: { tenantId, lineUserId },
    });
  }

  // 取得或建立 conversation
  let conversation = await prisma.conversation.findFirst({
    where: { tenantId, customerId: customer.id },
    orderBy: { createdAt: 'desc' },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { tenantId, customerId: customer.id },
    });
  }

  // 建立 message record
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderType: 'customer',
      content: null,
      imageUrl,
      imageBase64,
    },
  });

  // 如果有圖片 base64，嘗試辨識並建立訂單草稿項目
  if (imageBase64) {
    queueLlmExtraction({
      conversationId: conversation.id,
      tenantId,
      customerId: customer.id,
      lastMessage: '',
      imageBase64,
    });
  }
}
```

- [ ] **Step 2: 修改 webhook 處理 text + image 事件**

在 webhook 中找到 `for (const event of events)` 迴圈，修改為：

```typescript
for (const event of events) {
  // ... existing deduplication code ...

  if (event.type === 'text' && event.source?.userId) {
    await handleTextEvent(event, lineChannel.tenantId, lineChannel.channelId, lineChannel.channelAccessToken);
  } else if (event.type === 'image' && event.source?.userId) {
    await handleImageEvent(event, lineChannel.tenantId, lineChannel.channelId, lineChannel.channelAccessToken);
  }
}
```

- [ ] **Step 3: 更新 queue.ts 以支援 imageBase64**

找到 `queueLlmExtraction` 類型並新增 `imageBase64` 參數。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: handle LINE image events with vision recognition"
git push
```

---

## Chunk 5: 前端 - 商品頁圖片建立按鈕

**目標：** 在商品頁新增「用圖片建立」按鈕和上傳流程

**Files:**
- Modify: `frontend/src/pages/ProductsPage.tsx`
- Modify: `frontend/src/api/client.ts`
- Modify: `frontend/src/i18n/locales/zh.json`
- Modify: `frontend/src/i18n/locales/en.json`
- Modify: `frontend/src/i18n/locales/ja.json`

---

- [ ] **Step 1: 更新 API client**

在 `frontend/src/api/client.ts` 新增：

```typescript
async recognizeImage(file: File): Promise<{
  name: string | null;
  color: string | null;
  size: string | null;
  price: number | null;
  raw_text: string;
  confidence: number;
}> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await this.fetch('/products/recognize-image', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Recognition failed');
  }

  return data.data;
}
```

- [ ] **Step 2: 更新 ProductsPage - 新增狀態**

```typescript
const [imageRecognitionEnabled, setImageRecognitionEnabled] = useState(false);
const [recognizingImage, setRecognizingImage] = useState(false);
const [imagePreview, setImagePreview] = useState<string | null>(null);
```

- [ ] **Step 3: 新增圖片上傳處理函數**

```typescript
const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // 驗證檔案類型
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    toast.error(t('products.invalid_image_type'));
    return;
  }

  // 驗證檔案大小
  if (file.size > 5 * 1024 * 1024) {
    toast.error(t('products.image_too_large'));
    return;
  }

  // 顯示預覽
  const reader = new FileReader();
  reader.onload = (e) => {
    setImagePreview(e.target?.result as string);
  };
  reader.readAsDataURL(file);

  // 開始辨識
  setRecognizingImage(true);
  try {
    const result = await productApi.recognizeImage(file);
    setRecognizingImage(false);

    // 預填表單
    setFormData({
      ...formData,
      name: result.name || formData.name,
      basePrice: result.price?.toString() || formData.basePrice,
    });

    // 如果有規格資訊
    if (result.color || result.size) {
      setVariants([{
        variantSku: '',
        color: result.color || '',
        size: result.size || '',
        price: result.price?.toString() || '',
      }]);
    }

    toast.success(t('products.image_recognized'));

    // 打開 modal
    if (!showModal) {
      setShowModal(true);
    }
  } catch (error) {
    setRecognizingImage(false);
    toast.error(t('products.recognition_failed'));
  }

  e.target.value = '';
};
```

- [ ] **Step 4: 新增按鈕和 input**

在商品列表頁的「新增商品」按鈕旁新增：

```tsx
<label className="btn btn-secondary cursor-pointer">
  <Camera size={16} />
  {t('products.recognize_from_image')}
  <input
    type="file"
    accept="image/jpeg,image/png,image/webp"
    className="hidden"
    onChange={handleImageSelect}
    disabled={recognizingImage}
  />
</label>
```

- [ ] **Step 5: 新增翻譯**

zh.json:
```json
"products": {
  "recognize_from_image": "用圖片建立",
  "invalid_image_type": "只支援 JPG、PNG、WEBP 格式",
  "image_too_large": "圖片太大，請選擇小於 5MB 的圖片",
  "image_recognized": "已從圖片自動填入",
  "recognition_failed": "圖片辨識失敗，請手動填寫"
}
```

en.json 和 ja.json 同樣新增。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add image upload and recognition to products page"
git push
```

---

## Chunk 6: 前端 - 商品列表顯示圖片

**目標：** 在商品列表和詳情頁顯示商品圖片

**Files:**
- Modify: `frontend/src/pages/ProductsPage.tsx`

---

- [ ] **Step 1: 在商品列表的 table 增加圖片欄位**

在 `<th>` 和 `<td>` 中新增圖片欄位：

```tsx
<th className="w-16">{t('products.image')}</th>

// 在 td 中
<td>
  {product.imageUrl ? (
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-12 h-12 object-cover rounded-lg"
    />
  ) : (
    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
      <Package size={20} className="text-gray-400" />
    </div>
  )}
</td>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: display product images in products list"
git push
```

---

## Chunk 7: 整合測試

**目標：** 測試完整流程

---

- [ ] **Step 1: 本地測試**

1. 啟動本地伺服器
2. 測試商品頁上傳圖片
3. 測試 LINE 對話發送圖片
4. 確認訂單草稿正確建立

- [ ] **Step 2: Commit 最終變更**

```bash
git add -A
git commit -m "feat: complete image recognition integration"
git push
```

---

## 環境變數

在 `.env` 或 Render Environment Variables 中設定：

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

---

## 依賴套件

```bash
npm install @supabase/supabase-js uuid
npm install -D @types/uuid
```

---

## 預期完成時間

預計 7 個 chunks，全部完成後系統即可支援：
1. ✅ 店家上傳圖片建立商品
2. ✅ 商品列表顯示圖片
3. ✅ LINE 對話圖片自動辨識建立訂單草稿
