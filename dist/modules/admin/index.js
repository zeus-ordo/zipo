"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = exports.adminRoutes = void 0;
const routes_1 = __importDefault(require("./routes"));
exports.adminRoutes = routes_1.default;
const dashboard_1 = require("./dashboard");
Object.defineProperty(exports, "dashboardRouter", { enumerable: true, get: function () { return dashboard_1.dashboardRouter; } });
//# sourceMappingURL=index.js.map