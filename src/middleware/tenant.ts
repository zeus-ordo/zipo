import { Request, Response, NextFunction } from 'express';

export function requireTenant(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: '未授權' });
    return;
  }
  if (!req.user.tenantId) {
    res.status(403).json({ error: '需要綁定店家' });
    return;
  }
  next();
}

export function optionalTenant(req: Request, _res: Response, next: NextFunction): void {
  next();
}
