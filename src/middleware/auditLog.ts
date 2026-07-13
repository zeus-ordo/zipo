import { prisma } from '../lib/prisma';

export function createAuditLog(action: string, entityType?: string, entityId?: string) {
  return async (req: any, _res: any, next: any) => {
    const userId = req.user?.userId || null;
    const tenantId = req.user?.tenantId || null;

    prisma.auditLog.create({
      data: {
        userId,
        tenantId,
        action,
        entityType,
        entityId,
      },
    }).catch((err) => {
      console.error('Failed to create audit log:', err);
    });

    next();
  };
}
