"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireTenant = requireTenant;
exports.optionalTenant = optionalTenant;
function requireTenant(req, res, next) {
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
function optionalTenant(req, _res, next) {
    next();
}
