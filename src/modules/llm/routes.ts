import { Router, Request, Response } from 'express';
import { extractOrderInfo } from './extraction';

const router = Router();

router.post('/test-extraction', async (req: Request, res: Response) => {
  try {
    const { tenantId, conversationId, customerId, messages } = req.body as {
      tenantId: string;
      conversationId: string;
      customerId: string;
      messages?: Array<{ senderType: string; content: string; createdAt?: Date }>;
    };

    if (!tenantId || !conversationId || !customerId) {
      res.status(400).json({ error: 'Missing required fields: tenantId, conversationId, customerId' });
      return;
    }

    const testMessages = messages || [
      { senderType: 'customer', content: '我要買黑色洋裝 M 一件', createdAt: new Date() },
    ];

    const result = await extractOrderInfo(
      tenantId,
      conversationId,
      customerId,
      testMessages.map((m, i) => ({
        senderType: m.senderType,
        content: m.content,
        createdAt: m.createdAt || new Date(Date.now() - i * 1000),
      }))
    );

    res.json(result);
  } catch (error) {
    console.error('[LLM Routes] Test extraction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;