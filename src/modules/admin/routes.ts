import { Router } from 'express';
import { authenticate, requireRole } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';

const MAX_LIMIT = 100;
const PAGE_SIZE_DEFAULT = 20;

const router = Router();

router.use(authenticate, requireRole('platform_admin'));

router.get('/stats', async (req, res) => {
  try {
    const [totalTenants, totalOrders, totalCustomers, totalConversations] = await Promise.all([
      prisma.tenant.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.conversation.count(),
    ]);

    const llmUsageEstimate = totalOrders * 0.5;

    res.json({
      totalTenants,
      totalOrders,
      totalCustomers,
      totalConversations,
      llmUsageEstimate,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: '取得平台統計失敗' });
  }
});

router.get('/tenants/:id/usage', async (req, res) => {
  try {
    const { id } = req.params;

    const tenant = await prisma.tenant.findUnique({
      where: { id },
    });

    if (!tenant) {
      res.status(404).json({ error: '店家不存在' });
      return;
    }

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      totalCustomers,
      totalProducts,
      monthOrders,
      totalConversations,
    ] = await Promise.all([
      prisma.order.count({ where: { tenantId: id } }),
      prisma.customer.count({ where: { tenantId: id } }),
      prisma.product.count({ where: { tenantId: id, isActive: true } }),
      prisma.order.count({ where: { tenantId: id, createdAt: { gte: startOfMonth } } }),
      prisma.conversation.count({ where: { tenantId: id } }),
    ]);

    const llmUsageEstimate = totalOrders * 0.5;

    res.json({
      tenantId: id,
      tenantName: tenant.name,
      totalOrders,
      totalCustomers,
      totalProducts,
      monthOrders,
      totalConversations,
      llmUsageEstimate,
    });
  } catch (error) {
    console.error('Error fetching tenant usage:', error);
    res.status(500).json({ error: '取得店家使用量失敗' });
  }
});

router.get('/audit-logs', async (req, res) => {
  try {
    const { tenantId, action, page = '1', limit = '50' } = req.query;
    const pageNum = Math.min(parseInt(page as string), MAX_LIMIT) || 1;
    const limitNum = Math.min(parseInt(limit as string), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const where: Record<string, unknown> = {};
    if (tenantId) where.tenantId = tenantId;
    if (action) where.action = action as string;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      data: logs,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(take ? total / take : 0),
      },
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: '取得審計日誌失敗' });
  }
});

router.post('/subscriptions', async (req, res) => {
  try {
    const { tenantId, planId } = req.body;

    if (!tenantId || !planId) {
      res.status(400).json({ error: 'tenantId and planId are required' });
      return;
    }

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      res.status(404).json({ error: 'Plan not found' });
      return;
    }

    const existing = await prisma.subscription.findUnique({ where: { tenantId } });
    if (existing) {
      res.status(409).json({ error: 'Subscription already exists', subscription: existing });
      return;
    }

    const subscription = await prisma.subscription.create({
      data: {
        tenantId,
        planId,
        status: 'active',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      include: { plan: true },
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: '建立訂閱失敗' });
  }
});

router.get('/debug/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        tenantId: true,
        tenant: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const lineChannels = await prisma.lineChannel.findMany({
      select: {
        id: true,
        channelId: true,
        tenantId: true,
      },
    });

    res.json({ users, lineChannels });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Debug error' });
  }
});

export default router;