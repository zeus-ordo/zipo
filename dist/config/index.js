"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
    line: {
        channelId: process.env.LINE_CHANNEL_ID || '',
        channelSecret: process.env.LINE_CHANNEL_SECRET || '',
        accessToken: process.env.LINE_ACCESS_TOKEN || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    },
    llm: {
        apiKey: process.env.LLM_API_KEY || '',
        model: process.env.LLM_MODEL || '',
    },
    port: parseInt(process.env.PORT || '3000', 10),
};
//# sourceMappingURL=index.js.map