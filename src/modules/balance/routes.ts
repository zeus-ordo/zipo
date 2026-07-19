import { Router, Request, Response } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireTenant } from '../../middleware/tenant';
import { prisma } from '../../lib/prisma';

const router = Router();

router.use(authenticate);

router.get('/current', requireTenant, async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId!;

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { balance: true },
  });

  const transactions = await prisma.balanceTransaction.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  res.json({
    balance: tenant?.balance || 0,
    transactions,
  });
});

router.post('/deduct', requireTenant, async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId!;
  const { amount, description } = req.body;

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant || tenant.balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  const [transaction] = await prisma.$transaction([
    prisma.tenant.update({
      where: { id: tenantId },
      data: { balance: { decrement: amount } },
    }),
    prisma.balanceTransaction.create({
      data: {
        tenantId,
        amount: -amount,
        type: 'deduction',
        description: description || 'Order deduction',
      },
    }),
  ]);

  res.json(transaction);
});

router.post('/topup', requireTenant, async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId!;
  const { amount, description } = req.body;

  const [transaction] = await prisma.$transaction([
    prisma.tenant.update({
      where: { id: tenantId },
      data: { balance: { increment: amount } },
    }),
    prisma.balanceTransaction.create({
      data: {
        tenantId,
        amount,
        type: 'topup',
        description: description || 'Balance topup',
      },
    }),
  ]);

  res.json(transaction);
});

export default router;