"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("./modules/auth");
const line_1 = require("./modules/line");
const conversation_1 = require("./modules/conversation");
const order_1 = require("./modules/order");
const routes_1 = __importDefault(require("./modules/product/routes"));
const routes_2 = __importDefault(require("./modules/llm/routes"));
const notification_1 = require("./modules/notification");
const admin_1 = require("./modules/admin");
const plan_1 = __importDefault(require("./modules/plan"));
const subscription_1 = __importDefault(require("./modules/subscription"));
const store_setting_1 = require("./modules/store-setting");
const balance_1 = __importDefault(require("./modules/balance"));
const ecpay_1 = __importDefault(require("./modules/ecpay"));
const routes_3 = require("./modules/webhook/routes");
const rateLimit_1 = require("./middleware/rateLimit");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const frontendDistPath = path_1.default.resolve(__dirname, '..', 'frontend', 'dist');
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
app.use((0, cors_1.default)({
    origin: isProduction ? false : '*',
    credentials: true,
}));
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
if (isProduction) {
    app.use(express_1.default.static(frontendDistPath));
}
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/api/webhooks/line', routes_3.webhookRoutes);
app.use('/api/auth', rateLimit_1.authLimiter);
app.use('/api', rateLimit_1.apiLimiter);
app.use('/api/auth', auth_1.authRoutes);
app.use('/api/admin', admin_1.adminRoutes);
app.use('/api/line', line_1.lineRoutes);
app.use('/api/conversations', conversation_1.conversationRoutes);
app.use('/api/order-drafts', order_1.orderDraftRouter);
app.use('/api/orders', order_1.orderRouter);
app.use('/api/llm', routes_2.default);
app.use('/api/products', routes_1.default);
app.use('/api/notifications', notification_1.notificationRoutes);
app.use('/api/dashboard', admin_1.dashboardRouter);
app.use('/api/store-settings', store_setting_1.storeSettingRouter);
app.use('/api/balance', balance_1.default);
app.use('/api/ecpay', ecpay_1.default);
app.use('/api/plans', plan_1.default);
app.use('/api/subscriptions', subscription_1.default);
if (isProduction) {
    app.get('/{*path}', (_req, res) => {
        res.sendFile(path_1.default.join(frontendDistPath, 'index.html'));
    });
}
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.globalErrorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
