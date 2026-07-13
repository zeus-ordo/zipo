"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../tenant");
const prisma = new client_1.PrismaClient({});
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: '信箱和密碼必填' });
            return;
        }
        const user = await prisma.user.findUnique({
            where: { email, isActive: true },
        });
        if (!user || !(await bcryptjs_1.default.compare(password, user.passwordHash))) {
            res.status(401).json({ error: '帳號或密碼錯誤' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, tenantId: user.tenantId, role: user.role }, config_1.config.jwt.secret, { expiresIn: '7d' });
        prisma.auditLog.create({
            data: {
                userId: user.id,
                tenantId: user.tenantId,
                action: 'LOGIN',
                entityType: 'User',
                entityId: user.id,
            },
        }).catch(console.error);
        const response = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                tenantId: user.tenantId,
            },
            tokens: { accessToken: token },
        };
        res.json(response);
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: '登入失敗' });
    }
});
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, role, tenantId } = req.body;
        if (!email || !password || !name || !role) {
            res.status(400).json({ error: '所有欄位必填' });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ error: '密碼長度需至少 8 個字元' });
            return;
        }
        if (!['platform_admin', 'store_admin', 'staff'].includes(role)) {
            res.status(400).json({ error: '無效的角色' });
            return;
        }
        if ((role === 'store_admin' || role === 'staff') && !tenantId) {
            res.status(400).json({ error: '店家員工需要提供 tenantId' });
            return;
        }
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            res.status(409).json({ error: '信箱已被註冊' });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                role,
                tenantId: role === 'platform_admin' ? null : tenantId,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, tenantId: user.tenantId, role: user.role }, config_1.config.jwt.secret, { expiresIn: '7d' });
        prisma.auditLog.create({
            data: {
                userId: user.id,
                tenantId: user.tenantId,
                action: 'REGISTER',
                entityType: 'User',
                entityId: user.id,
            },
        }).catch(console.error);
        const response = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                tenantId: user.tenantId,
            },
            tokens: { accessToken: token },
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: '註冊失敗' });
    }
});
router.get('/me', auth_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: '未授權' });
            return;
        }
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });
        if (!user || !user.isActive) {
            res.status(404).json({ error: '使用者不存在' });
            return;
        }
        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            tenantId: user.tenantId,
        });
    }
    catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ error: '取得使用者資訊失敗' });
    }
});
router.use('/tenants', tenant_1.tenantRoutes);
exports.default = router;
//# sourceMappingURL=routes.js.map