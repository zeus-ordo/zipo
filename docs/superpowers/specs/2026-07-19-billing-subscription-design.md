# 付費訂閱系統設計規格

## 1. 概述

本系統為 ZIPO SaaS 平台提供付費訂閱功能，支援多級方案、用量控管、儲值金機制，並串接綠界金流。

## 2. 方案分級

### 預設方案

| 方案 | 價格 (USD/月) | 訂單上限 (筆/月) | LINE 頻道數 | 商品目錄 | 庫存管理 | 進階報表 | API 存取 |
|------|---------------|------------------|-------------|----------|----------|----------|----------|
| 基礎版 | $9.9 | 50 | 1 | 否 | 否 | 否 | 否 |
| 專業版 | $19.9 | 200 | 2 | 是 | 是 | 否 | 否 |
| 企業版 | $99 | 無限 | 5 | 是 | 是 | 是 | 是 |

### 方案管理

- Admin 可新增、編輯、刪除方案
- 方案可設定的欄位：
  - 名稱 (name)
  - 價格 (price) - USD
  - 訂單上限 (orderLimit) - 0 = 無限
  - LINE 頻道數 (channelLimit)
  - 功能開關 (features) - JSON 格式

### 功能項目 (Features)

```json
{
  "productCatalog": "商品目錄",
  "inventory": "庫存管理",
  "advancedReports": "進階報表",
  "apiAccess": "API 存取",
  "prioritySupport": "優先支援"
}
```

## 3. 資料模型

### 新增 Model: Plan

```prisma
model Plan {
  id          String   @id @default(uuid())
  name        String   // 方案名稱
  price       Float    // 月費 (USD)
  orderLimit  Int      // 0 = 無限
  channelLimit Int     // LINE 頻道數上限
  features    Json     // 功能開關
  isDefault   Boolean  @default(false) // 是否為預設方案
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  subscriptions Subscription[]
  @@index([isActive])
}
```

### 新增 Model: Subscription

```prisma
model Subscription {
  id            String   @id @default(uuid())
  tenantId     String   @unique  // 保持單一 current subscription
  planId       String
  status        String   // active, cancelled, expired, suspended
  expiresAt    DateTime // 方案到期日
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  plan   Plan   @relation(fields: [planId], references: [id])
  @@index([tenantId])
  @@index([expiresAt])  // 用於查詢即將到期的訂閱
}
```

**設計說明**：`tenantId @unique` 確保每個 tenant 只有一個當前訂閱。升級/降級時直接更新現有記錄，不建立新記錄。

### 新增 Model: BalanceTransaction

```prisma
model BalanceTransaction {
  id          String   @id @default(uuid())
  tenantId   String
  amount      Float    // 正數 = 儲值, 負數 = 扣款
  type        String   // topup, deduction, refund
  description String?
  createdAt   DateTime @default(now())

  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  @@index([tenantId, createdAt])
}
```

### 修改 Tenant Model

```prisma
model Tenant {
  // ... existing fields ...
  balance      Float    @default(0) // 儲值金餘額 (USD)
}
```

## 4. 用量計算邏輯

### 訂單計數

- 每筆訂單確認時計入當月用量
- 每月 1 日凌晨重置計數
- 查詢：`SELECT COUNT(*) FROM "Order" WHERE "tenantId" = ? AND "createdAt" >= ?`

### 用量檢查時機

1. **建立訂單草稿時** - 檢查當月用量是否已達上限
2. **用量的 90% 時** - 發送通知提醒

### 超量處理

**無儲值金時**：
- 已達上限：阻擋新訂單，回傳錯誤訊息「已達當月訂單上限，請升級方案或聯繫客服」

**有儲值金時**：
- 已達上限：可選擇使用儲值金超額，每筆 $0.5 USD
- 店家可設定「超額時是否自動使用儲值金」

**超額扣款流程**：
1. 系統偵測到訂單超量
2. 檢查店家是否有啟用自動超額並有足夠儲值金
3. 若有：自動扣款並建立訂單
4. 若無：回傳錯誤訊息

### 用量計算時區

所有時間計算使用 UTC，以確保跨時區一致性。台灣時間每月 1 日 00:00 = UTC 前一天 16:00。

## 5. 續費與到期

### 到期提醒

- 到期前 7 天發送通知
- 通知方式：系統通知 + Email

### 到期處理

- 到期日當天：`Subscription.status` 改為 `expired`
- 店家無法建立新訂單（可瀏覽舊訂單）
- 續費後立即恢復服務

### 自動暫停

- 到期後自動停用，阻擋新訂單建立
- Admin 可手動啟用

### 新店家註冊

- 新店家註冊時，自動加入「基礎版」方案
- Subscription.status = 'active'
- expiresAt = 30 天後（試用期）
- 試用期結束前可付費升級

### 方案變更（升級/降級）

- **升級**：立即生效，收取差價 proration
- **降級**：下次 billing cycle 生效，當前週期結束後自動切換
- Proration 計算：(新方案日均價格 - 舊方案日均價格) × 剩餘天數

## 6. 金流 (綠界)

### 支援付款方式

- 信用卡
- WebATM
- ATM 轉帳

### 付款項目

1. **月費訂閱** - 方案費用 (月繳)
2. **儲值** - 額度儲值 (最低 $10 USD)

### 串接流程

1. 店家選擇方案或儲值
2. 後端向綠界建立訂單
3. 店家完成付款
4. 綠界回傳付款結果
5. 更新 Subscription 或 Balance

### 綠界 API

- 使用 ECPay SDK 或 REST API
- 必須在 Render 設定 `ECPAY_MERCHANT_ID`、`ECPAY_HASH_KEY`、`ECPAY_HASH_IV`

### 綠界 Webhook 驗證

- 綠界回傳時需驗證 CheckMacValue 確保資料完整性
- 驗證失敗的 request 需記錄並回傳 fail

### LINE 頻道數量限制

- 建立新頻道前檢查：`SELECT COUNT(*) FROM "LineChannel" WHERE "tenantId" = ?`
- 若已達上限，回傳錯誤：「您的方案僅支援 N 個 LINE 頻道，請升級方案」

## 7. 功能權限控管

### 權限檢查點

| 功能 | 檢查位置 |
|------|----------|
| LINE 頻道數量 | 建立頻道時 (line/settings PATCH) |
| 商品目錄 | /products 頁面 middleware |
| 庫存管理 | /products 頁面 middleware |
| 進階報表 | /dashboard 頁面 middleware |
| API 存取 | API middleware |

### 實作方式

```typescript
// 中間層檢查
function requireFeature(feature: string) {
  return (req, res, next) => {
    const plan = req.user?.tenant?.subscription?.plan;
    if (!plan || !plan.features?.[feature]) {
      return res.status(403).json({ error: '此功能需要進階方案' });
    }
    next();
  };
}
```

## 8. Admin 功能

### 方案管理

- CRUD 方案
- 設定方案功能開關

### 店家管理

- 查看店家方案狀態
- 調整店家方案
- 手動修改到期日
- 手動增減儲值金
- 暫停/啟用店家

### 用量報表

- 各店家用量列表
- 訂單統計

## 9. 店家後台

### 方案與用量頁面

- 目前方案名稱與價格
- 到期日
- 當月用量 / 上限
- LINE 頻道使用情形

### 儲值頁面

- 當前餘額
- 儲值（最小 $10）
- 交易歷史

### 方案升級

- 選擇方案
- 確認價格差異
- 前往付款

## 10. 通知機制

### 通知類型

| 類型 | 觸發時機 | 頻道 |
|------|----------|------|
| 用量達 90% | 當月訂單達 90% | 系統通知 + Email |
| 用量已滿 | 超過上限 | 系統通知 + Email |
| 即將到期 | 到期前 7 天 | 系統通知 + Email |
| 已到期 | 到期當天 | 系統通知 + Email |

### 通知目標

- 店家 Admin 用戶

## 11. 資料庫遷移

需執行以下 Prisma migration：

1. 新增 `Plan` table
2. 新增 `Subscription` table
3. 新增 `BalanceTransaction` table
4. 新增 `Tenant.balance` 欄位
5. 預設插入三個方案 (基礎版/專業版/企業版)

## 12. 環境變數

```env
ECPAY_MERCHANT_ID=你的商家ID
ECPAY_HASH_KEY=你的HashKey
ECPAY_HASH_IV=你的HashIV
ECPAY_API_URL=https://payment.ecpay.com.tw
```

## 13. 預估工時

- 資料模型與 Migration：2 小時
- Plan/Subscription API：4 小時
- 用量計算與攔截：3 小時
- Admin 頁面：4 小時
- 店家後台頁面：4 小時
- 綠界串接：6 小時
- 通知機制：3 小時
- 測試與除錯：4 小時

**總計：約 30 小時**
