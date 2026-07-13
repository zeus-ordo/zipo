"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExcelFile = parseExcelFile;
exports.importProducts = importProducts;
const XLSX = __importStar(require("xlsx"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({});
async function parseExcelFile(buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data;
}
async function importProducts(tenantId, rows) {
    let success = 0;
    let failed = 0;
    const errors = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2;
        try {
            if (!row.name || row.name.trim() === '') {
                errors.push(`列 ${rowNum}: 商品名稱為必填欄位`);
                failed++;
                continue;
            }
            let product = await prisma.product.findFirst({
                where: {
                    tenantId,
                    name: row.name.trim(),
                    sku: row.sku?.trim() || null,
                },
            });
            if (!product) {
                product = await prisma.product.create({
                    data: {
                        tenantId,
                        name: row.name.trim(),
                        sku: row.sku?.trim() || null,
                        category: row.category?.trim() || null,
                        description: row.description?.trim() || null,
                        basePrice: row.base_price || null,
                        sourceType: 'excel',
                        isActive: true,
                    },
                });
            }
            if (row.color || row.size || row.price !== undefined) {
                const existingVariant = await prisma.productVariant.findFirst({
                    where: {
                        tenantId,
                        productId: product.id,
                        color: row.color?.trim() || null,
                        size: row.size?.trim() || null,
                    },
                });
                if (!existingVariant) {
                    await prisma.productVariant.create({
                        data: {
                            tenantId,
                            productId: product.id,
                            color: row.color?.trim() || null,
                            size: row.size?.trim() || null,
                            price: row.price !== undefined ? row.price : null,
                            isActive: true,
                        },
                    });
                }
            }
            else {
                const hasVariants = await prisma.productVariant.count({
                    where: { tenantId, productId: product.id },
                });
                if (hasVariants === 0) {
                    await prisma.productVariant.create({
                        data: {
                            tenantId,
                            productId: product.id,
                            isActive: true,
                        },
                    });
                }
            }
            success++;
        }
        catch (error) {
            errors.push(`列 ${rowNum}: ${error instanceof Error ? error.message : '未知錯誤'}`);
            failed++;
        }
    }
    return { success, failed, errors };
}
//# sourceMappingURL=import.js.map