"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLineSignature = verifyLineSignature;
const crypto_1 = __importDefault(require("crypto"));
function verifyLineSignature(channelSecret, body, signature) {
    const hmac = crypto_1.default.createHmac('SHA256', channelSecret);
    const hash = hmac.update(body).digest('base64');
    return hash === signature;
}
