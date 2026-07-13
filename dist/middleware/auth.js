"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.requireRole = requireRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: '未授權' });
        return;
    }
    const token = authHeader.substring(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        req.user = payload;
        next();
    }
    catch {
        res.status(401).json({ error: '無效的權杖' });
    }
}
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: '未授權' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: '權限不足' });
            return;
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map