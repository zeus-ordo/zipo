import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireRole } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';
const router = Router();

router.use(authenticate);
router.use(requireRole('platform_admin'));

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: '名稱必填' });
      return;
    }

    const tenant = await prisma.tenant.create({
      data: {
        name,
        storeSettings: {
          create: {
            paymentMethods: '[]',
            deliveryMethods: '[]',
          },
        },
      },
      include: {
        storeSettings: true,
      },
    });

    const defaultPlan = await prisma.plan.findFirst({
      where: { isDefault: true },
    });

    if (defaultPlan) {
      await prisma.subscription.create({
        data: {
          tenantId: tenant.id,
          planId: defaultPlan.id,
          status: 'active',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    res.status(201).json({
      id: tenant.id,
      name: tenant.name,
      isActive: tenant.isActive,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    });
  } catch (error) {
    console.error('Create tenant error:', error);
    res.status(500).json({ error: '建立店家失敗' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tenants = await prisma.tenant.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json((tenants as any[]).map((t: any) => ({
      id: t.id,
      name: t.name,
      isActive: t.isActive,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    })));
  } catch (error) {
    console.error('Get tenants error:', error);
    res.status(500).json({ error: '取得店家失敗' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.params.id },
    });

    if (!tenant) {
      res.status(404).json({ error: '店家不存在' });
      return;
    }

    res.json({
      id: tenant.id,
      name: tenant.name,
      isActive: tenant.isActive,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    });
  } catch (error) {
    console.error('Get tenant error:', error);
    res.status(500).json({ error: '取得店家失敗' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { name, isActive } = req.body;
    const data: any = {};
    if (name !== undefined) data.name = name;
    if (isActive !== undefined) data.isActive = isActive;

    const tenant = await prisma.tenant.update({
      where: { id: req.params.id },
      data,
    });

    res.json({
      id: tenant.id,
      name: tenant.name,
      isActive: tenant.isActive,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    });
  } catch (error) {
    console.error('Update tenant error:', error);
    res.status(500).json({ error: '更新店家失敗' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.tenant.update({
      where: { id: req.params.id },
      data: { isActive: false },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete tenant error:', error);
    res.status(500).json({ error: '停用店家失敗' });
  }
});

export default router;
