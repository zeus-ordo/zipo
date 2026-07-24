"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditLog = createAuditLog;
const prisma_1 = require("../lib/prisma");
function createAuditLog(action, entityType, entityId) {
    return async (req, _res, next) => {
        const userId = req.user?.userId || null;
        const tenantId = req.user?.tenantId || null;
        prisma_1.prisma.auditLog.create({
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
