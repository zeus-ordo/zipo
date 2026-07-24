"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const tenant_1 = require("../../middleware/tenant");
const prisma_1 = require("../../lib/prisma");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
const ECPayConfig = {
    MerchantID: process.env.ECPAY_MERCHANT_ID || '2000132',
    HashKey: process.env.ECPAY_HASH_KEY || '5294y06JbISpM5x9',
    HashIV: process.env.ECPAY_HASH_IV || 'v77h1SKNWqOq2NWM',
    PaymentURL: process.env.ECPAY_PAYMENT_URL || 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
};
function createECPayCheckMacValue(params) {
    const sorted = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
    const raw = `HashKey=${ECPayConfig.HashKey}&${sorted}&HashIV=${ECPayConfig.HashIV}`;
    const hash = crypto_1.default.createHash('sha256').update(raw).digest('hex').toUpperCase();
    return hash;
}
router.post('/topup', auth_1.authenticate, tenant_1.requireTenant, async (req, res) => {
    const tenantId = req.user.tenantId;
    const { amount, description } = req.body;
    if (amount <= 0) {
        res.status(400).json({ error: 'Invalid amount' });
        return;
    }
    const TWD_AMOUNT = Math.round(amount * 30);
    const MerchantTradeNo = `TOPUP_${tenantId}_${Date.now()}`;
    const MerchantTradeDate = new Date().toISOString().replace(/T/, ' ').substring(0, 19);
    const baseURL = process.env.BASE_URL || 'http://localhost:3000';
    const params = {
        MerchantID: ECPayConfig.MerchantID,
        MerchantTradeNo,
        MerchantTradeDate,
        PaymentType: 'aio',
        TotalAmount: String(TWD_AMOUNT),
        TradeDesc: description || 'Balance topup',
        ItemName: '餘額儲值',
        ReturnURL: `${baseURL}/api/ecpay/callback`,
        ClientBackURL: `${baseURL}/dashboard`,
        OrderResultURL: `${baseURL}/api/ecpay/callback`,
    };
    params['CheckMacValue'] = createECPayCheckMacValue(params);
    res.json({
        paymentURL: ECPayConfig.PaymentURL,
        params,
    });
});
router.post('/callback', async (req, res) => {
    const { RtnCode, RtnMsg, MerchantTradeNo, TradeAmt } = req.body;
    if (RtnCode === '1') {
        const match = MerchantTradeNo.match(/^TOPUP_(.+)_(\d+)$/);
        if (match) {
            const tenantId = match[1];
            const usdAmount = Math.round((parseInt(TradeAmt) / 30) * 100) / 100;
            await prisma_1.prisma.$transaction([
                prisma_1.prisma.tenant.update({
                    where: { id: tenantId },
                    data: { balance: { increment: usdAmount } },
                }),
                prisma_1.prisma.balanceTransaction.create({
                    data: {
                        tenantId,
                        amount: usdAmount,
                        type: 'topup',
                        description: 'ECPay payment successful',
                    },
                }),
            ]);
        }
    }
    res.send('1|OK');
});
router.get('/status/:tradeNo', auth_1.authenticate, tenant_1.requireTenant, async (req, res) => {
    const { tradeNo } = req.params;
    res.json({ status: 'pending' });
});
exports.default = router;
