import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../../middleware/auth';
import { requireTenant } from '../../middleware/tenant';
import { parseExcelWithMapping, importProducts, ImportRow } from './import';
import { prisma } from '../../lib/prisma';

const MAX_LIMIT = 100;
const PAGE_SIZE_DEFAULT = 20;

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticate, requireTenant);

router.get('/', async (req, res) => {
  try {
    const tenantId = req.user!.tenantId!;
    const { category, isActive, page = '1', limit = '20' } = req.query;
    const pageNum = Math.min(parseInt(page as string), MAX_LIMIT) || 1;
    const limitNum = Math.min(parseInt(limit as string), MAX_LIMIT) || PAGE_SIZE_DEFAULT;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const where: Record<string, unknown> = { tenantId };
    if (category) {
      where.category = category;
    }
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          variants: {
            where: { isActive: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      data: products,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(take ? total / take : 0),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: '取得商品失敗' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user!.tenantId!;

    const product = await prisma.product.findFirst({
      where: { id, tenantId },
      include: {
        variants: {
          where: { isActive: true },
        },
      },
    });

    if (!product) {
      res.status(404).json({ error: '找不到商品' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: '取得商品失敗' });
  }
});

router.post('/', async (req, res) => {
  try {
    const tenantId = req.user!.tenantId!;
    const { name, sku, category, description, basePrice, variants } = req.body;

    if (!name || name.trim() === '') {
      res.status(400).json({ error: '商品名稱為必填欄位' });
      return;
    }

    const product = await prisma.product.create({
      data: {
        tenantId,
        name: name.trim(),
        sku: sku?.trim() || null,
        category: category?.trim() || null,
        description: description?.trim() || null,
        basePrice: basePrice !== undefined ? basePrice : null,
        sourceType: 'manual',
        isActive: true,
        variants: variants && variants.length > 0 ? {
          create: variants.map((v: { color?: string; size?: string; price?: number; variantSku?: string }) => ({
            tenantId,
            color: v.color?.trim() || null,
            size: v.size?.trim() || null,
            price: v.price !== undefined ? v.price : null,
            variantSku: v.variantSku?.trim() || null,
            isActive: true,
          })),
        } : {
          create: {
            tenantId,
            isActive: true,
          },
        },
      },
      include: {
        variants: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        tenantId,
        action: 'CREATE_PRODUCT',
        entityType: 'Product',
        entityId: product.id,
        metadata: JSON.stringify(req.body),
      },
    }).catch(console.error);

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: '建立商品失敗' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user!.tenantId!;
    const { name, sku, category, description, basePrice } = req.body;

    const existing = await prisma.product.findFirst({
      where: { id, tenantId },
    });

    if (!existing) {
      res.status(404).json({ error: '找不到商品' });
      return;
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name.trim();
    if (sku !== undefined) updateData.sku = sku?.trim() || null;
    if (category !== undefined) updateData.category = category?.trim() || null;
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (basePrice !== undefined) updateData.basePrice = basePrice;

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        variants: {
          where: { isActive: true },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        tenantId,
        action: 'UPDATE_PRODUCT',
        entityType: 'Product',
        entityId: id,
        metadata: JSON.stringify(req.body),
      },
    }).catch(console.error);

    res.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: '更新商品失敗' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user!.tenantId!;

    const existing = await prisma.product.findFirst({
      where: { id, tenantId },
    });

    if (!existing) {
      res.status(404).json({ error: '找不到商品' });
      return;
    }

    await prisma.product.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });

    await prisma.productVariant.updateMany({
      where: { productId: id, tenantId },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        tenantId,
        action: 'DELETE_PRODUCT',
        entityType: 'Product',
        entityId: id,
      },
    }).catch(console.error);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: '刪除商品失敗' });
  }
});

router.post('/:id/variants', async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user!.tenantId!;
    const { variantSku, color, size, price } = req.body;

    const product = await prisma.product.findFirst({
      where: { id, tenantId },
    });

    if (!product) {
      res.status(404).json({ error: '找不到商品' });
      return;
    }

    const variant = await prisma.productVariant.create({
      data: {
        tenantId,
        productId: id,
        variantSku: variantSku?.trim() || null,
        color: color?.trim() || null,
        size: size?.trim() || null,
        price: price !== undefined ? price : null,
        isActive: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        tenantId,
        action: 'CREATE_VARIANT',
        entityType: 'ProductVariant',
        entityId: variant.id,
        metadata: JSON.stringify({ productId: id }),
      },
    }).catch(console.error);

    res.status(201).json(variant);
  } catch (error) {
    console.error('Error creating variant:', error);
    res.status(500).json({ error: '建立商品規格失敗' });
  }
});

router.patch('/:id/variants/:variantId', async (req, res) => {
  try {
    const { id, variantId } = req.params;
    const tenantId = req.user!.tenantId!;
    const { variantSku, color, size, price } = req.body;

    const variant = await prisma.productVariant.findFirst({
      where: { id: variantId, productId: id, tenantId },
    });

    if (!variant) {
      res.status(404).json({ error: '找不到商品規格' });
      return;
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (variantSku !== undefined) updateData.variantSku = variantSku?.trim() || null;
    if (color !== undefined) updateData.color = color?.trim() || null;
    if (size !== undefined) updateData.size = size?.trim() || null;
    if (price !== undefined) updateData.price = price;

    const updated = await prisma.productVariant.update({
      where: { id: variantId },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        tenantId,
        action: 'UPDATE_VARIANT',
        entityType: 'ProductVariant',
        entityId: variantId,
        metadata: JSON.stringify(req.body),
      },
    }).catch(console.error);

    res.json(updated);
  } catch (error) {
    console.error('Error updating variant:', error);
    res.status(500).json({ error: '更新商品規格失敗' });
  }
});

router.delete('/:id/variants/:variantId', async (req, res) => {
  try {
    const { id, variantId } = req.params;
    const tenantId = req.user!.tenantId!;

    const variant = await prisma.productVariant.findFirst({
      where: { id: variantId, productId: id, tenantId },
    });

    if (!variant) {
      res.status(404).json({ error: '找不到商品規格' });
      return;
    }

    await prisma.productVariant.update({
      where: { id: variantId },
      data: { isActive: false, updatedAt: new Date() },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        tenantId,
        action: 'DELETE_VARIANT',
        entityType: 'ProductVariant',
        entityId: variantId,
      },
    }).catch(console.error);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting variant:', error);
    res.status(500).json({ error: '刪除商品規格失敗' });
  }
});

router.post('/import', upload.single('file'), async (req, res) => {
  try {
    const tenantId = req.user!.tenantId!;

    if (!req.file) {
      res.status(400).json({ error: '請上傳檔案' });
      return;
    }

    const file = req.file;
    const ext = file.originalname.split('.').pop()?.toLowerCase();

    if (!['xlsx', 'xls', 'csv'].includes(ext || '')) {
      res.status(400).json({ error: '只支援 .xlsx, .xls, .csv 格式' });
      return;
    }

    const { rows, mapping, headers } = parseExcelWithMapping(file.buffer);

    if (rows.length === 0) {
      res.status(400).json({ error: '檔案中沒有資料' });
      return;
    }

    const result = await importProducts(tenantId, rows as ImportRow[]);

    const detectedFields = Object.values(mapping).filter((v, i, a) => a.indexOf(v) === i);

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        tenantId,
        action: 'IMPORT_PRODUCTS',
        entityType: 'Product',
        metadata: JSON.stringify({ success: result.success, failed: result.failed }),
      },
    }).catch(console.error);

    res.json({
      message: `匯入完成`,
      success: result.success,
      failed: result.failed,
      errors: result.errors,
      detectedFields,
    });
  } catch (error) {
    console.error('Error importing products:', error);
    res.status(500).json({ error: '匯入商品失敗' });
  }
});

export default router;