import { Router, Request, Response } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireTenant } from '../../middleware/tenant';
import { requireRole } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';

const router = Router();

router.use(authenticate);

router.get('/current', requireTenant, async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId!;

  console.log('[Subscription] Checking for tenant:', tenantId);

  let subscription = await prisma.subscription.findUnique({
    where: { tenantId },
    include: { plan: true },
  });

  if (!subscription) {
    console.log('[Subscription] No subscription found, creating one...');
    const defaultPlan = await prisma.plan.findFirst({
      where: { isDefault: true },
    });
    console.log('[Subscription] Default plan:', defaultPlan);
    if (defaultPlan) {
      try {
        subscription = await prisma.subscription.create({
          data: {
            tenantId,
            planId: defaultPlan.id,
            status: 'active',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          include: { plan: true },
        });
        console.log('[Subscription] Created subscription:', subscription);
      } catch (err) {
        console.error('[Subscription] Error creating subscription:', err);
      }
    }
  }

  if (!subscription) {
    return res.status(404).json({ error: 'No subscription found' });
  }

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

router.get('/tenant/:tenantId', authenticate, async (req: Request, res: Response) => {
  const tenantId = req.params.tenantId as string;
  const subscription = await prisma.subscription.findUnique({
    where: { tenantId },
    include: { plan: true },
  });
  res.json(subscription);
});

router.patch('/tenant/:tenantId', authenticate, async (req: Request, res: Response) => {
  const tenantId = req.params.tenantId as string;
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

export default router;
