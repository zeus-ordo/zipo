import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export interface SubscriptionCheckOptions {
  checkOrderLimit?: boolean;
  checkChannelLimit?: boolean;
}

export async function checkSubscription(
  req: Request,
  res: Response,
  next: NextFunction,
  options: SubscriptionCheckOptions = {}
): Promise<void> {
  const tenantId = req.user?.tenantId;

  if (!tenantId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const subscription = await prisma.subscription.findUnique({
    where: { tenantId },
    include: { plan: true },
  });

  if (!subscription || subscription.status !== 'active') {
    res.status(403).json({
      error: 'No active subscription',
      code: 'SUBSCRIPTION_REQUIRED'
    });
    return;
  }

  if (new Date(subscription.expiresAt) < new Date()) {
    res.status(403).json({
      error: 'Subscription expired',
      code: 'SUBSCRIPTION_EXPIRED'
    });
    return;
  }

  if (options.checkChannelLimit) {
    const channelCount = await prisma.lineChannel.count({
      where: { tenantId },
    });

    if (channelCount >= subscription.plan.channelLimit) {
      res.status(403).json({
        error: 'Channel limit reached',
        code: 'CHANNEL_LIMIT_EXCEEDED',
        limit: subscription.plan.channelLimit
      });
      return;
    }
  }

  if (options.checkOrderLimit) {
    const startOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);

    const orderCount = await prisma.order.count({
      where: { tenantId, createdAt: { gte: startOfMonth } },
    });

    const orderLimit = subscription.plan.orderLimit;
    if (orderLimit > 0 && orderCount >= orderLimit) {
      res.status(403).json({
        error: 'Monthly order limit reached',
        code: 'ORDER_LIMIT_EXCEEDED',
        limit: orderLimit
      });
      return;
    }
  }

  next();
}

export function requireActiveSubscription(options?: SubscriptionCheckOptions) {
  return (req: Request, res: Response, next: NextFunction) =>
    checkSubscription(req, res, next, options || {});
}
