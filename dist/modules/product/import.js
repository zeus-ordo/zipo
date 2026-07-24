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
exports.parseExcelWithMapping = parseExcelWithMapping;
exports.parseExcelFile = parseExcelFile;
exports.importProducts = importProducts;
const XLSX = __importStar(require("xlsx"));
const prisma_1 = require("../../lib/prisma");
const FIELD_ALIASES = {
    name: ['品項', '商品名稱', '名稱', '產品名稱', '产品名称', '名称', '品名', '商品', '产品', 'item', 'product', 'product_name', 'item_name'],
    sku: ['SKU', '貨號', '編號', '商品編號', '商品号', '型号', 'model', 'code', 'item_code', 'product_code'],
    category: ['類別', '分類', '類型', 'category', 'type', '分类', '种类'],
    description: ['說明', '描述', '詳細', '备注', '备注', 'memo', 'note', 'notes', 'description', 'detail'],
    base_price: ['基本價格', '價格', '定價', '原价', 'base_price', 'baseprice', 'list_price', 'original_price'],
    color: ['顏色', '色', '色彩', 'color', 'colour', '颜色', '色码'],
    size: ['尺寸', '大小', '尺碼', 'size', '尺寸', '尺码'],
    price: ['售價', '售價', '售價', 'sale_price', 'selling_price', 'saleprice', 'sellingprice', 'selling_price'],
};
function buildMappingTable(headers) {
    const mapping = {};
    const lowerHeaders = headers.map(h => String(h).trim().toLowerCase());
    for (const [standardField, aliases] of Object.entries(FIELD_ALIASES)) {
        for (let i = 0; i < lowerHeaders.length; i++) {
            const header = lowerHeaders[i];
            if (mapping[headers[i]])
                continue;
            if (aliases.some(alias => alias.toLowerCase() === header ||
                header.includes(alias.toLowerCase()) ||
                alias.toLowerCase().includes(header))) {
                mapping[headers[i]] = standardField;
                break;
            }
        }
    }
    return mapping;
}
function normalizeRow(row, mapping, originalHeaders) {
    const normalized = {};
    for (const [originalHeader, value] of Object.entries(row)) {
        const standardField = mapping[originalHeader] || originalHeader.toLowerCase();
        if (standardField in FIELD_ALIASES) {
            normalized[standardField] = value;
        }
    }
    return {
        name: String(normalized.name || ''),
        sku: normalized.sku ? String(normalized.sku) : undefined,
        category: normalized.category ? String(normalized.category) : undefined,
        description: normalized.description ? String(normalized.description) : undefined,
        base_price: normalized.base_price !== undefined ? Number(normalized.base_price) : undefined,
        color: normalized.color ? String(normalized.color) : undefined,
        size: normalized.size ? String(normalized.size) : undefined,
        price: normalized.price !== undefined ? Number(normalized.price) : undefined,
    };
}
function parseExcelWithMapping(buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    if (rawData.length === 0) {
        return { rows: [], mapping: {}, headers: [] };
    }
    const headers = rawData[0].map(h => String(h));
    const mapping = buildMappingTable(headers);
    const dataRows = rawData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));
    const rows = dataRows.map(row => {
        const rowObj = {};
        headers.forEach((header, i) => {
            rowObj[header] = row[i];
        });
        return normalizeRow(rowObj, mapping, headers);
    });
    return { rows, mapping, headers };
}
async function parseExcelFile(buffer) {
    const { rows } = parseExcelWithMapping(buffer);
    return rows;
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
            let product = await prisma_1.prisma.product.findFirst({
                where: {
                    tenantId,
                    name: row.name.trim(),
                    sku: row.sku?.trim() || null,
                },
            });
            if (!product) {
                product = await prisma_1.prisma.product.create({
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
                const existingVariant = await prisma_1.prisma.productVariant.findFirst({
                    where: {
                        tenantId,
                        productId: product.id,
                        color: row.color?.trim() || null,
                        size: row.size?.trim() || null,
                    },
                });
                if (!existingVariant) {
                    await prisma_1.prisma.productVariant.create({
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
                const hasVariants = await prisma_1.prisma.productVariant.count({
                    where: { tenantId, productId: product.id },
                });
                if (hasVariants === 0) {
                    await prisma_1.prisma.productVariant.create({
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
