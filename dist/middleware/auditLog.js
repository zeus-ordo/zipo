"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditLog = createAuditLog;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({});
function createAuditLog(action, entityType, entityId) {
    return async (req, _res, next) => {
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
//# sourceMappingURL=auditLog.js.map