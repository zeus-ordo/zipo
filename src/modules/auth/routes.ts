import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { authenticate } from '../../middleware/auth';
import { AuthResponse, LoginInput, RegisterInput } from './types';
import { tenantRoutes } from '../tenant';
import { prisma } from '../../lib/prisma';
const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password }: LoginInput = req.body;

    if (!email || !password) {
      res.status(400).json({ error: '信箱和密碼必填' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email, isActive: true },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ error: '帳號或密碼錯誤' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, tenantId: user.tenantId, role: user.role },
      config.jwt.secret,
      { expiresIn: '7d' }
    );

    prisma.auditLog.create({
      data: {
        userId: user.id,
        tenantId: user.tenantId,
        action: 'LOGIN',
        entityType: 'User',
        entityId: user.id,
      },
    }).catch(console.error);

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
      },
      tokens: { accessToken: token },
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '登入失敗' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, tenantId, tenantName }: RegisterInput & { tenantName?: string } = req.body;

    if (!email || !password || !name || !role) {
      res.status(400).json({ error: '所有欄位必填' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ error: '密碼長度需至少 8 個字元' });
      return;
    }

    if (!['platform_admin', 'store_admin', 'staff'].includes(role)) {
      res.status(400).json({ error: '無效的角色' });
      return;
    }

    let finalTenantId = tenantId;

    if ((role === 'store_admin' || role === 'staff') && !tenantId && !tenantName) {
      res.status(400).json({ error: '店家員工需要提供 tenantId 或 tenantName' });
      return;
    }

    if ((role === 'store_admin' || role === 'staff') && tenantName && !tenantId) {
      const tenant = await prisma.tenant.create({
        data: {
          name: tenantName,
          storeSettings: {
            create: {
              paymentMethods: '[]',
              deliveryMethods: '[]',
            },
          },
        },
      });
      finalTenantId = tenant.id;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: '信箱已被註冊' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role,
        tenantId: role === 'platform_admin' ? null : finalTenantId,
      },
    });

    const token = jwt.sign(
      { userId: user.id, tenantId: user.tenantId, role: user.role },
      config.jwt.secret,
      { expiresIn: '7d' }
    );

    prisma.auditLog.create({
      data: {
        userId: user.id,
        tenantId: user.tenantId,
        action: 'REGISTER',
        entityType: 'User',
        entityId: user.id,
      },
    }).catch(console.error);

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
      },
      tokens: { accessToken: token },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: '註冊失敗' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: '未授權' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user || !user.isActive) {
      res.status(404).json({ error: '使用者不存在' });
      return;
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenantId: user.tenantId,
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: '取得使用者資訊失敗' });
  }
});

router.use('/tenants', tenantRoutes);

export default router;
