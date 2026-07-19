# 付費訂閱系統實作計畫

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立完整的付費訂閱系統，包含方案管理、訂閱、用量控管、儲值金、綠界金流

**Architecture:**
- 新增 Plan, Subscription, BalanceTransaction 三個資料模型
- Admin 可管理方案與店家訂閱狀態
- 店家可查看用量、儲值、升級方案
- 所有功能依方案功能開關控管
- ECPay 串接用於信用卡/WebATM/ATM 付款

**Tech Stack:** Prisma, Express, React, ECPay API

---

## Chunk 1: 資料模型與 Migration

### Files

**Modify:** `prisma/schema.prisma`
- 新增 `Plan` model
- 新增 `Subscription` model
- 新增 `BalanceTransaction` model
- 修改 `Tenant` model 加 `balance` 欄位

### Steps

- [ ] **Step 1: Add Plan model to schema**

```prisma
model Plan {
  id           String   @id @default(uuid())
  name         String
  price        Float
  orderLimit   Int      @default(0)  // 0 = unlimited
  channelLimit Int      @default(1)
  features     Json     @default("{}")
  isDefault    Boolean  @default(false)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  subscriptions Subscription[]
  @@index([isActive])
}
```

- [ ] **Step 2: Add Subscription model**

```prisma
model Subscription {
  id         String   @id @default(uuid())
  tenantId   String   @unique
  planId     String
  status     String   @default("active")  // active, cancelled, expired, suspended
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  plan   Plan   @relation(fields: [planId], references: [id])
  @@index([tenantId])
  @@index([expiresAt])
}
```

- [ ] **Step 3: Add BalanceTransaction model**

```prisma
model BalanceTransaction {
  id          String   @id @default(uuid())
  tenantId    String
  amount      Float    // positive = credit, negative = debit
  type        String   // topup, deduction, refund
  description String?
  createdAt   DateTime @default(now())

  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  @@index([tenantId, createdAt])
}
```

- [ ] **Step 4: Add balance field to Tenant**

```prisma
model Tenant {
  // ... existing fields ...
  balance Float @default(0) // 儲值金餘額 (USD)
}
```

- [ ] **Step 5: Run Prisma migration**

```bash
npx prisma db push
```

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add Plan, Subscription, BalanceTransaction models"
```

---

## Chunk 2: 後端 API - 方案管理

### Files

**Create:** `src/modules/plan/routes.ts`
**Create:** `src/modules/plan/types.ts`
**Create:** `src/modules/plan/index.ts`
**Modify:** `src/middleware/auth.ts` - add helper for plan features

### Steps

- [ ] **Step 1: Create plan types**

```typescript
// src/modules/plan/types.ts
export interface PlanFeatures {
  productCatalog?: boolean;
  inventory?: boolean;
  advancedReports?: boolean;
  apiAccess?: boolean;
  prioritySupport?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  orderLimit: number;
  channelLimit: number;
  features: PlanFeatures;
  isDefault: boolean;
  isActive: boolean;
}

export interface CreatePlanInput {
  name: string;
  price: number;
  orderLimit: number;
  channelLimit: number;
  features: PlanFeatures;
  isDefault?: boolean;
}
```

- [ ] **Step 2: Create plan routes with CRUD**

```typescript
// src/modules/plan/routes.ts
import { Router, Request, Response } from 'express';
import { authenticate, requireRole } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';

const router = Router();

router.use(authenticate);
router.use(requireRole('platform_admin'));

// List all plans
router.get('/', async (req, res) => {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
  });
  res.json(plans);
});

// Create plan
router.post('/', async (req, res) => {
  const { name, price, orderLimit, channelLimit, features, isDefault } = req.body;

  if (isDefault) {
    await prisma.plan.updateMany({
      where: { isDefault: true },
      data: { isDefault: false },
    });
  }

  const plan = await prisma.plan.create({
    data: { name, price, orderLimit, channelLimit, features, isDefault: isDefault || false },
  });
  res.status(201).json(plan);
});

// Update plan
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, orderLimit, channelLimit, features, isActive, isDefault } = req.body;

  if (isDefault) {
    await prisma.plan.updateMany({
      where: { isDefault: true },
      data: { isDefault: false },
    });
  }

  const plan = await prisma.plan.update({
    where: { id },
    data: { name, price, orderLimit, channelLimit, features, isActive, isDefault },
  });
  res.json(plan);
});

// Delete plan (soft delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.plan.update({
    where: { id },
    data: { isActive: false },
  });
  res.status(204).send();
});

export default router;
```

- [ ] **Step 3: Export from index**

```typescript
// src/modules/plan/index.ts
export { default } from './routes';
```

- [ ] **Step 4: Register route in index.ts**

```typescript
// src/index.ts
import planRoutes from './modules/plan';
// ... existing imports ...

app.use('/api/plans', planRoutes);
```

- [ ] **Step 5: Commit**

```bash
git add src/modules/plan/ src/index.ts
git commit -m "feat: add Plan CRUD API"
```

---

## Chunk 3: 後端 API - 訂閱管理

### Files

**Create:** `src/modules/subscription/routes.ts`
**Create:** `src/modules/subscription/types.ts`
**Create:** `src/modules/subscription/index.ts`
**Modify:** `src/modules/auth/routes.ts` - auto-create subscription on tenant creation

### Steps

- [ ] **Step 1: Create subscription types**

```typescript
// src/modules/subscription/types.ts
export interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'suspended';
  expiresAt: string;
  plan?: Plan;
}

export interface TenantSubscription extends Subscription {
  plan: Plan;
  currentUsage: {
    orderCount: number;
    channelCount: number;
  };
}
```

- [ ] **Step 2: Create subscription routes**

```typescript
// src/modules/subscription/routes.ts
import { Router, Request, Response } from 'express';
import { authenticate, requireTenant } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';

const router = Router();

router.use(authenticate);

// Get current tenant subscription with usage
router.get('/current', requireTenant, async (req, res) => {
  const tenantId = req.user!.tenantId!;

  const subscription = await prisma.subscription.findUnique({
    where: { tenantId },
    include: { plan: true },
  });

  if (!subscription) {
    return res.status(404).json({ error: 'No subscription found' });
  }

  // Count current month orders
  const startOfMonth = new Date();
  startOfMonth.setUTCDate(1);
  startOfMonth.setUTCHours(0, 0, 0, 0);

  const [orderCount, channelCount] = await Promise.all([
    prisma.order.count({
      where: { tenantId, createdAt: { gte: startOfMonth } },
    }),
    prisma.lineChannel.count({
      where: { tenantId },
    }),
  ]);

  res.json({
    ...subscription,
    currentUsage: { orderCount, channelCount },
  });
});

// Get tenant subscription by admin
router.get('/tenant/:tenantId', requireTenant, async (req, res) => {
  // Admin only check should be in middleware
  const subscription = await prisma.subscription.findUnique({
    where: { tenantId: req.params.tenantId },
    include: { plan: true },
  });
  res.json(subscription);
});

// Update subscription (upgrade/downgrade/cancel)
router.patch('/:tenantId', requireTenant, async (req, res) => {
  const { tenantId } = req.params;
  const { planId, status } = req.body;

  const subscription = await prisma.subscription.findUnique({
    where: { tenantId },
  });

  if (!subscription) {
    return res.status(404).json({ error: 'Subscription not found' });
  }

  const updated = await prisma.subscription.update({
    where: { tenantId },
    data: { planId, status },
    include: { plan: true },
  });

  res.json(updated);
});

// Get subscription with plan details
router.get('/:tenantId', async (req, res) => {
  const subscription = await prisma.subscription.findUnique({
    where: { tenantId: req.params.tenantId },
    include: { plan: true },
  });
  res.json(subscription);
});

export default router;
```

- [ ] **Step 3: Modify auth routes to create subscription on tenant creation**

Find the tenant creation code in `src/modules/auth/routes.ts` or `src/modules/tenant/routes.ts` and add:

```typescript
// After tenant creation, create default subscription
const defaultPlan = await prisma.plan.findFirst({
  where: { isDefault: true },
});

if (defaultPlan) {
  await prisma.subscription.create({
    data: {
      tenantId: tenant.id,
      planId: defaultPlan.id,
      status: 'active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
    },
  });
}
```

- [ ] **Step 4: Register routes**

```typescript
// src/index.ts
import subscriptionRoutes from './modules/subscription';
// ...
app.use('/api/subscriptions', subscriptionRoutes);
```

- [ ] **Step 5: Commit**

```bash
git add src/modules/subscription/ src/modules/auth/routes.ts src/index.ts
git commit -m "feat: add subscription management API"
```

---

## Chunk 4: 後端 API - 儲值金管理

### Files

**Create:** `src/modules/balance/routes.ts`
**Create:** `src/modules/balance/index.ts`

### Steps

- [ ] **Step 1: Create balance routes**

```typescript
// src/modules/balance/routes.ts
import { Router } from 'express';
import { authenticate, requireTenant } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';

const router = Router();

router.use(authenticate);

// Get current balance and transactions
router.get('/current', requireTenant, async (req, res) => {
  const tenantId = req.user!.tenantId!;

  const [tenant, transactions] = await Promise.all([
    prisma.tenant.findUnique({ where: { id: tenantId } }),
    prisma.balanceTransaction.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
  ]);

  res.json({
    balance: tenant?.balance || 0,
    transactions,
  });
});

// Deduct balance (called when order exceeds limit)
router.post('/deduct', requireTenant, async (req, res) => {
  const tenantId = req.user!.tenantId!;
  const { amount, description } = req.body;

  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });

  if (!tenant || tenant.balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  const [updatedTenant] = await Promise.all([
    prisma.tenant.update({
      where: { id: tenantId },
      data: { balance: { decrement: amount } },
    }),
    prisma.balanceTransaction.create({
      data: {
        tenantId,
        amount: -amount,
        type: 'deduction',
        description,
      },
    }),
  ]);

  res.json({ balance: updatedTenant.balance });
});

export default router;
```

- [ ] **Step 2: Register routes**

```typescript
// src/index.ts
import balanceRoutes from './modules/balance';
// ...
app.use('/api/balance', balanceRoutes);
```

- [ ] **Step 3: Commit**

```bash
git add src/modules/balance/ src/index.ts
git commit -m "feat: add balance management API"
```

---

## Chunk 5: 用量檢查 Middleware

### Files

**Create:** `src/middleware/subscriptionCheck.ts`

### Steps

- [ ] **Step 1: Create subscription check middleware**

```typescript
// src/middleware/subscriptionCheck.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export async function checkSubscription(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.user?.tenantId;
  if (!tenantId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const subscription = await prisma.subscription.findUnique({
    where: { tenantId },
    include: { plan: true },
  });

  if (!subscription) {
    return res.status(403).json({ error: 'No active subscription' });
  }

  if (subscription.status !== 'active') {
    return res.status(403).json({ error: 'Subscription not active' });
  }

  if (new Date() > subscription.expiresAt) {
    return res.status(403).json({ error: 'Subscription expired' });
  }

  // Attach to request for later use
  (req as any).subscription = subscription;
  next();
}

export async function checkFeature(feature: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const subscription = (req as any).subscription;
    if (!subscription) {
      return res.status(403).json({ error: 'No subscription' });
    }

    const features = subscription.plan.features as Record<string, boolean>;
    if (!features?.[feature]) {
      return res.status(403).json({ error: `This feature requires a higher plan` });
    }

    next();
  };
}

export async function checkUsageLimit(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.user?.tenantId;
  if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

  const subscription = (req as any).subscription;
  if (!subscription) return res.status(403).json({ error: 'No subscription' });

  const startOfMonth = new Date();
  startOfMonth.setUTCDate(1);
  startOfMonth.setUTCHours(0, 0, 0, 0);

  const orderCount = await prisma.order.count({
    where: { tenantId, createdAt: { gte: startOfMonth } },
  });

  const { orderLimit } = subscription.plan;
  if (orderLimit > 0 && orderCount >= orderLimit) {
    return res.status(403).json({
      error: 'Monthly order limit reached',
      code: 'ORDER_LIMIT_EXCEEDED',
      current: orderCount,
      limit: orderLimit,
    });
  }

  (req as any).currentOrderCount = orderCount;
  next();
}
```

- [ ] **Step 2: Update order routes to use middleware**

Modify `src/modules/order/routes.ts` to check subscription before creating order:

```typescript
// In the confirm order endpoint, add at the beginning:
import { checkSubscription, checkUsageLimit } from '../../middleware/subscriptionCheck';

// Add middleware to routes that need it
orderDraftRouter.post('/:id/confirm', authenticate, requireTenant, checkSubscription, async (req, res) => {
  // ... existing code ...
});
```

- [ ] **Step 3: Update LINE channel creation to check limit**

Modify `src/modules/line/routes.ts`:

```typescript
import { checkSubscription } from '../../middleware/subscriptionCheck';

// Before creating/updating channel:
const channelCount = await prisma.lineChannel.count({
  where: { tenantId },
});

if (channelCount >= subscription.plan.channelLimit) {
  return res.status(403).json({
    error: `Channel limit reached (${subscription.plan.channelLimit})`,
  });
}
```

- [ ] **Step 4: Commit**

```bash
git add src/middleware/subscriptionCheck.ts src/modules/order/routes.ts src/modules/line/routes.ts
git commit -m "feat: add subscription check middleware"
```

---

## Chunk 6: 綠界金流串接

### Files

**Create:** `src/modules/billing/ecpay.ts`
**Create:** `src/modules/billing/routes.ts`
**Create:** `src/modules/billing/index.ts`
**Modify:** `src/modules/balance/routes.ts` - add topup endpoint

### Steps

- [ ] **Step 1: Create ECPay utility**

```typescript
// src/modules/billing/ecpay.ts
import crypto from 'crypto';

const MERCHANT_ID = process.env.ECPAY_MERCHANT_ID!;
const HASH_KEY = process.env.ECPAY_HASH_KEY!;
const HASH_IV = process.env.ECPAY_HASH_IV!;
const API_URL = process.env.ECPAY_API_URL || 'https://payment.ecpay.com.tw';

export interface ECPayOrder {
  merchantTradeNo: string;
  storeId?: string;
  merchantTradeDate: string;
  totalAmount: string;
  tradeDesc: string;
  itemName: string;
  returnURL?: string;
  clientBackURL?: string;
  aioCheckOut?: string;
}

export function createECPayForm(params: ECPayOrder): string {
  const form = `
    <form id="ecpay_form" method="post" action="${API_URL}/cashier/AioCheckOut">
      <input type="hidden" name="MerchantID" value="${MERCHANT_ID}">
      <input type="hidden" name="MerchantTradeNo" value="${params.merchantTradeNo}">
      <input type="hidden" name="MerchantTradeDate" value="${params.merchantTradeDate}">
      <input type="hidden" name="TotalAmount" value="${params.totalAmount}">
      <input type="hidden" name="TradeDesc" value="${params.tradeDesc}">
      <input type="hidden" name="ItemName" value="${params.itemName}">
      <input type="hidden" name="ReturnURL" value="${params.returnURL || 'https://zipo-tumx.onrender.com/api/billing/callback'}">
      <input type="hidden" name="ClientBackURL" value="${params.clientBackURL || 'https://zipo-tumx.onrender.com/dashboard'}">
      <input type="submit" value="前往付款" style="display:none;">
    </form>
  `;
  return form;
}

export function verifyCheckMacValue(params: Record<string, string>): boolean {
  const { CheckMacValue, ...data } = params;
  const sorted = Object.keys(data)
    .sort()
    .map(k => `${k}=${data[k]}`)
    .join('&');

  const hash = crypto
    .createHash('sha256')
    .update(encodeURIComponent(`HashKey=${HASH_KEY}&${sorted}&HashIV=${HASH_IV}`))
    .digest('hex')
    .toUpperCase();

  return hash === CheckMacValue;
}

export function generateTradeNo(): string {
  const date = new Date();
  return `ZIPO${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}
```

- [ ] **Step 2: Create billing routes**

```typescript
// src/modules/billing/routes.ts
import { Router, Request, Response } from 'express';
import { authenticate, requireTenant } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';
import { createECPayForm, generateTradeNo, verifyCheckMacValue } from './ecpay';

const router = Router();

// Create payment for subscription renewal
router.post('/subscribe', authenticate, requireTenant, async (req, res) => {
  const { planId } = req.body;
  const tenantId = req.user!.tenantId!;

  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  const tradeNo = generateTradeNo();

  // Store pending payment in DB or session
  // ... implementation

  const form = createECPayForm({
    merchantTradeNo: tradeNo,
    merchantTradeDate: new Date().toISOString(),
    totalAmount: String(plan.price),
    tradeDesc: `ZIPO 訂閱 - ${plan.name}`,
    itemName: `${plan.name} 月費`,
  });

  res.json({ form, tradeNo });
});

// Create payment for balance topup
router.post('/topup', authenticate, requireTenant, async (req, res) => {
  const { amount } = req.body;
  const tenantId = req.user!.tenantId!;

  if (amount < 10) {
    return res.status(400).json({ error: 'Minimum topup is $10' });
  }

  const tradeNo = generateTradeNo();

  const form = createECPayForm({
    merchantTradeNo: tradeNo,
    merchantTradeDate: new Date().toISOString(),
    totalAmount: String(amount),
    tradeDesc: 'ZIPO 儲值',
    itemName: `儲值 $${amount}`,
  });

  res.json({ form, tradeNo });
});

// ECPay callback (must be POST)
router.post('/callback', async (req, res) => {
  const { MerchantTradeNo, RtnCode, TradeAmt, PaymentType } = req.body;

  // Verify CheckMacValue
  if (!verifyCheckMacValue(req.body)) {
    console.error('[Billing] Invalid CheckMacValue');
    return res.status(400).send('fail');
  }

  if (RtnCode === '1') {
    // Payment successful
    // Look up by MerchantTradeNo to determine if subscription or topup
    // Update accordingly

    console.log(`[Billing] Payment success: ${MerchantTradeNo}, amount: ${TradeAmt}`);
  }

  res.send('1|OK');
});

export default router;
```

- [ ] **Step 3: Register routes**

```typescript
// src/index.ts
import billingRoutes from './modules/billing';
// ...
app.use('/api/billing', billingRoutes);
```

- [ ] **Step 4: Commit**

```bash
git add src/modules/billing/ src/index.ts
git commit -m "feat: add ECPay billing integration"
```

---

## Chunk 7: Admin 管理頁面

### Files

**Create:** `frontend/src/pages/admin/AdminPlansPage.tsx`
**Create:** `frontend/src/pages/admin/AdminSubscriptionsPage.tsx`
**Modify:** `frontend/src/api/client.ts` - add plan/subscription APIs

### Steps

- [ ] **Step 1: Add API methods**

```typescript
// frontend/src/api/client.ts

// Plans
export const planApi = {
  list: () => api.get<Plan[]>('/plans'),
  create: (data: Partial<Plan>) => api.post<Plan>('/plans', data),
  update: (id: string, data: Partial<Plan>) => api.patch<Plan>(`/plans/${id}`, data),
  delete: (id: string) => api.delete(`/plans/${id}`),
};

// Subscriptions
export const subscriptionApi = {
  getCurrent: () => api.get('/subscriptions/current'),
  getByTenant: (tenantId: string) => api.get(`/subscriptions/tenant/${tenantId}`),
  update: (tenantId: string, data: Partial<Subscription>) =>
    api.patch(`/subscriptions/${tenantId}`, data),
};

// Balance
export const balanceApi = {
  getCurrent: () => api.get('/balance/current'),
  deduct: (amount: number, description: string) =>
    api.post('/balance/deduct', { amount, description }),
};
```

- [ ] **Step 2: Create Admin Plans Page**

```tsx
// frontend/src/pages/admin/AdminPlansPage.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { planApi } from '../../api/client';
import toast from 'react-hot-toast';

const FEATURE_OPTIONS = [
  { key: 'productCatalog', label: '商品目錄' },
  { key: 'inventory', label: '庫存管理' },
  { key: 'advancedReports', label: '進階報表' },
  { key: 'apiAccess', label: 'API 存取' },
  { key: 'prioritySupport', label: '優先支援' },
];

export function AdminPlansPage() {
  const { data: plans, isLoading } = useQuery({
    queryKey: ['admin-plans'],
    queryFn: planApi.list,
  });

  const [editing, setEditing] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: planApi.create,
    onSuccess: () => {
      toast.success('方案已建立');
      queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => planApi.update(id, data),
    onSuccess: () => {
      toast.success('方案已更新');
      queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
      setEditing(null);
    },
  });

  if (isLoading) return <div>載入中...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">方案管理</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">建立新方案</h2>
        <PlanForm onSubmit={(data) => createMutation.mutate(data)} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">名稱</th>
              <th className="px-4 py-2 text-left">價格</th>
              <th className="px-4 py-2 text-left">訂單上限</th>
              <th className="px-4 py-2 text-left">頻道數</th>
              <th className="px-4 py-2 text-left">功能</th>
              <th className="px-4 py-2 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {plans?.data?.map((plan) => (
              <tr key={plan.id} className="border-t">
                <td className="px-4 py-2">{plan.name}</td>
                <td className="px-4 py-2">${plan.price}</td>
                <td className="px-4 py-2">{plan.orderLimit || '無限'}</td>
                <td className="px-4 py-2">{plan.channelLimit}</td>
                <td className="px-4 py-2">
                  {FEATURE_OPTIONS.filter(f => plan.features?.[f.key]).map(f => f.label).join(', ')}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => setEditing(plan)} className="text-blue-600">編輯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlanForm({ plan, onSubmit }: { plan?: any; onSubmit: (data: any) => void }) {
  const [form, setForm] = useState({
    name: plan?.name || '',
    price: plan?.price || 0,
    orderLimit: plan?.orderLimit || 0,
    channelLimit: plan?.channelLimit || 1,
    features: plan?.features || {},
  });

  const toggleFeature = (key: string) => {
    setForm(f => ({
      ...f,
      features: { ...f.features, [key]: !f.features[key] },
    }));
  };

  return (
    <div className="space-y-4">
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="方案名稱"
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
        placeholder="價格 (USD)"
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        value={form.orderLimit}
        onChange={(e) => setForm({ ...form, orderLimit: parseInt(e.target.value) })}
        placeholder="訂單上限 (0=無限)"
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        value={form.channelLimit}
        onChange={(e) => setForm({ ...form, channelLimit: parseInt(e.target.value) })}
        placeholder="LINE 頻道數"
        className="border rounded px-3 py-2"
      />
      <div className="flex gap-4">
        {FEATURE_OPTIONS.map((f) => (
          <label key={f.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!form.features[f.key]}
              onChange={() => toggleFeature(f.key)}
            />
            {f.label}
          </label>
        ))}
      </div>
      <button onClick={() => onSubmit(form)} className="bg-blue-600 text-white px-4 py-2 rounded">
        {plan ? '更新' : '建立'}
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Create Admin Subscriptions Page** (similar pattern)

- [ ] **Step 4: Register pages in App.tsx**

```tsx
<Route path="/admin/plans" element={<AdminPlansPage />} />
<Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
```

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/admin/ frontend/src/api/client.ts frontend/src/App.tsx
git commit -m "feat: add admin billing management pages"
```

---

## Chunk 8: 店家後台頁面

### Files

**Create:** `frontend/src/pages/StoreBillingPage.tsx`
**Create:** `frontend/src/pages/StorePlanPage.tsx`

### Steps

- [ ] **Step 1: Create Store Billing Page** (subscription info, usage, topup)

```tsx
// frontend/src/pages/StoreBillingPage.tsx
import { useQuery } from '@tanstack/react-query';
import { subscriptionApi, balanceApi } from '../../api/client';
import { formatDate } from '../../utils/date';

export function StoreBillingPage() {
  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: subscriptionApi.getCurrent,
  });

  const { data: balanceData } = useQuery({
    queryKey: ['balance'],
    queryFn: balanceApi.getCurrent,
  });

  if (!subscription?.data) return <div>載入中...</div>;

  const sub = subscription.data;
  const { orderLimit } = sub.plan;
  const usagePercent = orderLimit > 0
    ? Math.round((sub.currentUsage.orderCount / orderLimit) * 100)
    : 0;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">方案與用量</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">目前方案</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">方案</p>
            <p className="font-medium">{sub.plan.name}</p>
          </div>
          <div>
            <p className="text-gray-500">月費</p>
            <p className="font-medium">${sub.plan.price}</p>
          </div>
          <div>
            <p className="text-gray-500">到期日</p>
            <p className="font-medium">{formatDate(sub.expiresAt)}</p>
          </div>
          <div>
            <p className="text-gray-500">狀態</p>
            <p className="font-medium">{sub.status}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">當月用量</h2>
        <div className="mb-2">
          <span>{sub.currentUsage.orderCount} / {orderLimit || '無限制'}</span>
          <span className="float-right">{usagePercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${usagePercent > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">儲值金</h2>
        <p className="text-3xl font-bold mb-4">${balanceData?.balance?.toFixed(2) || '0.00'}</p>
        <a href="/store/topup" className="bg-green-600 text-white px-4 py-2 rounded inline-block">
          儲值
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Topup Page**

```tsx
// frontend/src/pages/StoreTopupPage.tsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { balanceApi } from '../../api/client';
import toast from 'react-hot-toast';

const TOPUP_AMOUNTS = [10, 20, 50, 100];

export function StoreTopupPage() {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const createPaymentMutation = useMutation({
    mutationFn: (amount: number) =>
      fetch('/api/billing/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      }).then(r => r.json()),
    onSuccess: (data) => {
      if (data.form) {
        // Submit the ECPay form
        const div = document.createElement('div');
        div.innerHTML = data.form;
        document.body.appendChild(div);
        (div.querySelector('form') as HTMLFormElement)?.submit();
      }
    },
  });

  const handleTopup = (amount: number) => {
    createPaymentMutation.mutate(amount);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">儲值</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">選擇金額</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {TOPUP_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => handleTopup(amount)}
              className="py-4 text-xl font-bold border rounded-lg hover:bg-gray-50"
            >
              ${amount}
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-500 mb-2">或輸入自訂金額（最低 $10）</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="輸入金額"
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              onClick={() => handleTopup(parseFloat(customAmount))}
              disabled={parseFloat(customAmount) < 10}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              儲值
            </button>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 text-sm">
        <p className="text-yellow-800">
          儲值金額可用於支付超出方案限制的訂單。每筆超額訂單收取 $0.5 USD。
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Register pages in App.tsx**

```tsx
<Route path="/store/billing" element={<StoreBillingPage />} />
<Route path="/store/topup" element={<StoreTopupPage />} />
```

- [ ] **Step 4: Add links to Layout**

Update sidebar or navigation to include billing links.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/StoreBillingPage.tsx frontend/src/pages/StoreTopupPage.tsx frontend/src/App.tsx
git commit -m "feat: add store billing pages"
```

---

## Chunk 9: 試算表資料與測試

### Steps

- [ ] **Step 1: Seed default plans**

```typescript
// prisma/seed.ts or a migration script
const plans = [
  {
    name: '基礎版',
    price: 9.9,
    orderLimit: 50,
    channelLimit: 1,
    features: {},
    isDefault: true,
  },
  {
    name: '專業版',
    price: 19.9,
    orderLimit: 200,
    channelLimit: 2,
    features: { productCatalog: true, inventory: true },
  },
  {
    name: '企業版',
    price: 99,
    orderLimit: 0, // unlimited
    channelLimit: 5,
    features: { productCatalog: true, inventory: true, advancedReports: true, apiAccess: true, prioritySupport: true },
  },
];

for (const plan of plans) {
  await prisma.plan.create({ data: plan });
}
```

- [ ] **Step 2: Test subscription check middleware**

```typescript
// Test that exceeding order limit blocks order creation
// Test that expired subscription blocks access
// Test that feature flag blocks certain pages
```

- [ ] **Step 3: Test ECPay integration**

```typescript
// Test callback URL receives and validates ECPay responses
// Test topup flow
// Test subscription payment flow
```

- [ ] **Step 4: Commit seed**

```bash
git add prisma/seed.ts
git commit -m "feat: add default plans seed data"
```

---

## Chunk 10: 最終整合測試

### Steps

- [ ] **Step 1: Test complete flow**

1. 新店家註冊 → 自動加入基礎版試用
2. 嘗試建立超過 50 筆訂單 → 應被阻擋
3. 儲值 → 繳費成功後餘額增加
4. 超額訂單 → 自動扣儲值金
5. Admin 修改方案 → 功能立即生效
6. LINE 頻道超限 → 建立被阻擋

- [ ] **Step 2: Test edge cases**

1. 到期日當天狀態變更
2. 方案降級
3. 刪除有訂閱的方案

- [ ] **Step 3: Push to GitHub and deploy**

```bash
git push origin master
```

等待 Render 自動部署完成。

- [ ] **Step 4: Final smoke test on production**

確認所有功能正常運作。
