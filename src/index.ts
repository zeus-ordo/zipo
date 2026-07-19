import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { authRoutes } from './modules/auth';
import { tenantRoutes } from './modules/tenant';
import { lineRoutes } from './modules/line';
import { conversationRoutes } from './modules/conversation';
import { orderDraftRouter, orderRouter } from './modules/order';
import productRoutes from './modules/product/routes';
import llmRoutes from './modules/llm/routes';
import { notificationRoutes } from './modules/notification';
import { adminRoutes, dashboardRouter } from './modules/admin';
import planRoutes from './modules/plan';
import subscriptionRoutes from './modules/subscription';
import { storeSettingRouter } from './modules/store-setting';
import balanceRoutes from './modules/balance';
import ecpayRoutes from './modules/ecpay';
import { webhookRoutes } from './modules/webhook/routes';
import { apiLimiter, authLimiter, webhookLimiter } from './middleware/rateLimit';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: isProduction ? false : '*',
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (isProduction) {
  app.use(express.static(frontendDistPath));
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/debug/users', async (_req, res) => {
  const { prisma } = await import('./lib/prisma');
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, tenantId: true },
    });
    const channels = await prisma.lineChannel.findMany({
      select: { channelId: true, tenantId: true },
    });
    res.json({ users, channels });
  } catch (error) {
    res.status(500).json({ error: 'debug error' });
  }
});

app.use('/api/webhooks/line', webhookRoutes);
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/line', lineRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/order-drafts', orderDraftRouter);
app.use('/api/orders', orderRouter);
app.use('/api/llm', llmRoutes);
app.use('/api/products', productRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/store-settings', storeSettingRouter);
app.use('/api/balance', balanceRoutes);
app.use('/api/ecpay', ecpayRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

if (isProduction) {
  app.get('/{*path}', (_req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
