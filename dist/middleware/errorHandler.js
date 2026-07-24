"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
exports.notFoundHandler = notFoundHandler;
function globalErrorHandler(err, req, res, next) {
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
function notFoundHandler(req, res) {
    res.status(404).json({ error: '找不到資源' });
}
