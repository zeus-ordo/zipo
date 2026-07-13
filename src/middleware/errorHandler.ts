import { Request, Response, NextFunction } from 'express';

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[Global Error]', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: '伺服器內部錯誤',
    ...(process.env.NODE_ENV === 'development' && { message: err.message }),
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ error: '找不到資源' });
}
