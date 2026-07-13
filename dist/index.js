"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./modules/auth");
const line_1 = require("./modules/line");
const conversation_1 = require("./modules/conversation");
const order_1 = require("./modules/order");
const routes_1 = __importDefault(require("./modules/product/routes"));
const routes_2 = __importDefault(require("./modules/llm/routes"));
const notification_1 = require("./modules/notification");
const admin_1 = require("./modules/admin");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'ZIPO API Server' });
});
app.use('/auth', auth_1.authRoutes);
app.use('/admin', admin_1.adminRoutes);
app.use('/line', line_1.lineRoutes);
app.use('/conversations', conversation_1.conversationRoutes);
app.use('/order-drafts', order_1.orderRoutes);
app.use('/orders', order_1.orderRoutes);
app.use('/llm', routes_2.default);
app.use('/products', routes_1.default);
app.use('/notifications', notification_1.notificationRoutes);
app.use('/dashboard', admin_1.dashboardRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map