import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireTenant } from '../../middleware/tenant';
import { prisma } from '../../lib/prisma';
const router = Router();

router.use(authenticate, requireTenant);

router.get('/stats', async (req, res) => {
  try {
    const tenantId = req.user!.tenantId!;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [todayOrders, pendingDrafts, readyToShip, monthOrders, totalCustomers] = await Promise.all([
      prisma.order.count({
        where: { tenantId, createdAt: { gte: today } },
      }),
      prisma.orderDraft.count({
        where: {
          tenantId,
          status: { in: ['draft_needs_review', 'draft_pending_info'] },
        },
      }),
      prisma.order.count({
        where: { tenantId, status: 'ready_to_ship' },
      }),
      prisma.order.count({
        where: { tenantId, createdAt: { gte: startOfMonth } },
      }),
      prisma.customer.count({
        where: { tenantId },
      }),
    ]);

    res.json({
      todayOrders,
      pendingDrafts,
      readyToShip,
      monthOrders,
      totalCustomers,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: '取得儀表板統計失敗' });
  }
});

export { router as dashboardRouter };