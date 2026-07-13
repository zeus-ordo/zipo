import * as XLSX from 'xlsx';
import { prisma } from '../../lib/prisma';

export interface ImportRow {
  name: string;
  sku?: string;
  category?: string;
  description?: string;
  base_price?: number;
  color?: string;
  size?: string;
  price?: number;
}

export async function parseExcelFile(buffer: Buffer): Promise<ImportRow[]> {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json<ImportRow>(worksheet);
  return data;
}

export async function importProducts(
  tenantId: string,
  rows: ImportRow[]
): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

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
      } else {
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
    } catch (error) {
      errors.push(`列 ${rowNum}: ${error instanceof Error ? error.message : '未知錯誤'}`);
      failed++;
    }
  }

  return { success, failed, errors };
}