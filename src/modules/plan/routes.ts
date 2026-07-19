import { Router, Request, Response } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireRole } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';

const router = Router();

router.use(authenticate);
router.use(requireRole('platform_admin'));

router.get('/', async (req: Request, res: Response) => {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
  });
  res.json(plans);
});

router.post('/', async (req: Request, res: Response) => {
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

router.patch('/:id', async (req: Request, res: Response) => {
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

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.plan.update({
    where: { id },
    data: { isActive: false },
  });
  res.status(204).send();
});

export default router;
