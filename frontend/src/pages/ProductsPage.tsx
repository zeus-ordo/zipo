import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { productApi } from '../api/client';
import { Package, Plus, Upload, Pencil, Trash2, X, Save, Camera } from 'lucide-react';
import type { Product, ProductVariant } from '../types';
import toast from 'react-hot-toast';

export function ProductsPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [importing, setImporting] = useState(false);
  const [recognizingImage, setRecognizingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    description: '',
    basePrice: '',
  });

  const [variants, setVariants] = useState<Array<{
    id?: string;
    variantSku: string;
    color: string;
    size: string;
    price: string;
  }>>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.list({ limit: 100 }),
  });

  const products = data?.data?.data ?? [];

  const createMutation = useMutation({
    mutationFn: (productData: Partial<Product>) => productApi.create(productData),
    onMutate: async (productData) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousProducts = queryClient.getQueryData(['products']);

      const tempId = `temp-${Date.now()}`;
      const optimisticProduct: Product = {
        id: tempId,
        tenantId: '',
        sku: null,
        name: productData.name || '',
        category: productData.category || null,
        description: productData.description || null,
        basePrice: productData.basePrice ?? null,
        isActive: true,
        sourceType: 'manual',
        sourceRef: null,
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(['products'], (old: any) => {
        if (!old?.data?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: [optimisticProduct, ...old.data.data],
          },
        };
      });

      return { previousProducts };
    },
    onError: (_err: any, _product: any, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      toast.error(_err.response?.data?.error || t('errors.unknown_error'));
    },
    onSettled: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => productApi.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousProducts = queryClient.getQueryData(['products']);

      queryClient.setQueryData(['products'], (old: any) => {
        if (!old?.data?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: old.data.data.map((p: Product) =>
              p.id === id ? { ...p, ...data } : p
            ),
          },
        };
      });

      return { previousProducts };
    },
    onError: (_err: any, _vars: any, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      toast.error(_err.response?.data?.error || t('errors.unknown_error'));
    },
    onSettled: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousProducts = queryClient.getQueryData(['products']);

      queryClient.setQueryData(['products'], (old: any) => {
        if (!old?.data?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: old.data.data.filter((p: Product) => p.id !== id),
          },
        };
      });

      return { previousProducts };
    },
    onError: (_err: any, _id: any, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      toast.error(_err.response?.data?.error || t('errors.unknown_error'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const createVariantMutation = useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: { variantSku?: string; color?: string; size?: string; price?: number } }) =>
      productApi.createVariant(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
    },
  });

  const updateVariantMutation = useMutation({
    mutationFn: ({ productId, variantId, data }: { productId: string; variantId: string; data: { variantSku?: string; color?: string; size?: string; price?: number } }) =>
      productApi.updateVariant(productId, variantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
    },
  });

  const deleteVariantMutation = useMutation({
    mutationFn: ({ productId, variantId }: { productId: string; variantId: string }) =>
      productApi.deleteVariant(productId, variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
    },
  });

  const resetForm = () => {
    setFormData({ name: '', sku: '', category: '', description: '', basePrice: '' });
    setVariants([{ variantSku: '', color: '', size: '', price: '' }]);
    setEditingProduct(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      sku: product.sku || '',
      category: product.category || '',
      description: product.description || '',
      basePrice: product.basePrice?.toString() || '',
    });
    setVariants(
      (product.variants || []).map((v: ProductVariant) => ({
        id: v.id,
        variantSku: v.variantSku || '',
        color: v.color || '',
        size: v.size || '',
        price: v.price?.toString() || '',
      }))
    );
    if ((product.variants || []).length === 0) {
      setVariants([{ variantSku: '', color: '', size: '', price: '' }]);
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validVariants = variants
      .filter(v => v.color || v.size || v.price || v.variantSku)
      .map(v => ({
        color: v.color || undefined,
        size: v.size || undefined,
        price: v.price ? parseFloat(v.price) : undefined,
        variantSku: v.variantSku || undefined,
      }));

    const productData: Partial<Product> & { variants?: Array<{ color?: string; size?: string; price?: number; variantSku?: string }> } = {
      name: formData.name,
      sku: formData.sku || undefined,
      category: formData.category || undefined,
      description: formData.description || undefined,
      basePrice: formData.basePrice ? parseFloat(formData.basePrice) : undefined,
      sourceType: 'manual',
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      if (validVariants.length > 0) {
        productData.variants = validVariants;
      }
      createMutation.mutate(productData);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await productApi.import(fd);
      toast.success(t('products.import_success') + `: ${res.data.success}`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (err: any) {
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
    } finally {
      setImporting(false);
    }
    e.target.value = '';
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error(t('products.invalid_image_type'));
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('products.image_too_large'));
      e.target.value = '';
      return;
    }

    setRecognizingImage(true);
    try {
      const result = await productApi.recognizeImage(file);
      setRecognizingImage(false);

      setFormData({
        name: result.data.data.name || formData.name,
        sku: formData.sku,
        category: formData.category,
        description: formData.description,
        basePrice: result.data.data.price?.toString() || formData.basePrice,
      });

      if (result.data.data.color || result.data.data.size) {
        setVariants([{
          id: undefined,
          variantSku: '',
          color: result.data.data.color || '',
          size: result.data.data.size || '',
          price: result.data.data.price?.toString() || '',
        }]);
      }

      if (!showModal) {
        setShowModal(true);
      }
      toast.success(t('products.image_recognized'));
    } catch (err: any) {
      setRecognizingImage(false);
      toast.error(err.response?.data?.error || t('products.recognition_failed'));
    }

    e.target.value = '';
  };

  const addVariant = () => {
    setVariants([...variants, { variantSku: '', color: '', size: '', price: '' }]);
  };

  const removeVariant = (index: number) => {
    const v = variants[index];
    if (v.id && editingProduct) {
      if (window.confirm(t('products.confirm_delete'))) {
        deleteVariantMutation.mutate({ productId: editingProduct.id, variantId: v.id });
      }
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const saveVariant = (index: number) => {
    const v = variants[index];
    if (!editingProduct) return;

    const variantData = {
      variantSku: v.variantSku || undefined,
      color: v.color || undefined,
      size: v.size || undefined,
      price: v.price ? parseFloat(v.price) : undefined,
    };

    if (v.id) {
      updateVariantMutation.mutate({
        productId: editingProduct.id,
        variantId: v.id,
        data: variantData,
      });
    } else {
      createVariantMutation.mutate({
        productId: editingProduct.id,
        data: variantData,
      });
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t('products.title')}</h1>
        <div className="flex gap-3">
          <label
            className="btn btn-secondary cursor-pointer"
            style={{ cursor: 'pointer' }}
          >
            <Upload size={18} />
            {importing ? t('common.loading') : t('products.import_excel')}
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleImport} className="hidden" disabled={importing} />
          </label>
          <label
            className="btn btn-secondary cursor-pointer"
            style={{ cursor: 'pointer' }}
          >
            <Camera size={18} />
            {recognizingImage ? t('common.loading') : t('products.recognize_from_image')}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageSelect} className="hidden" disabled={recognizingImage} />
          </label>
          <button
            onClick={() => { resetForm(); }}
            className="btn btn-primary"
          >
            <Plus size={18} />
            {t('products.add_product')}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
      ) : products.length === 0 ? (
        <div className="card p-12 text-center">
          <Package size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
          <p style={{ color: 'var(--color-text-secondary)' }}>{t('products.no_products')}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="w-16">{t('products.image')}</th>
                <th>{t('products.product_name')}</th>
                <th>{t('products.category')}</th>
                <th>{t('products.variants')}</th>
                <th>{t('common.price')}</th>
                <th>{t('common.status')}</th>
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                        <Package size={20} style={{ color: 'var(--color-text-tertiary)' }} />
                      </div>
                    )}
                  </td>
                  <td>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{product.name}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t('products.sku')}: {product.sku || '-'}</p>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>
                    {product.category || '-'}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {product.variants?.map((v: ProductVariant) => (
                        <span key={v.id} className="badge">
                          {v.color || '-'} / {v.size || '-'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-primary)' }}>
                    ${product.basePrice?.toLocaleString() || '-'}
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: product.isActive ? 'rgba(52, 199, 89, 0.15)' : 'var(--color-bg)',
                        color: product.isActive ? 'var(--color-success)' : 'var(--color-text-secondary)'
                      }}
                    >
                      {product.isActive ? t('products.active') : t('products.inactive')}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(product)}
                        className="btn-ghost text-sm flex items-center gap-1"
                      >
                        <Pencil size={14} />
                        {t('common.edit')}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(t('products.confirm_delete'))) {
                            deleteMutation.mutate(product.id);
                          }
                        }}
                        className="btn-ghost text-sm"
                        style={{ color: 'var(--color-error)' }}
                      >
                        {t('common.delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="card rounded-t-2xl sm:rounded-xl p-6 w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto modal-mobile">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {editingProduct ? t('products.edit_product') : t('products.add_product')}
              </h2>
              <button onClick={closeModal} className="btn-ghost sm:hidden p-2 -mr-2">
                <X size={24} />
              </button>
              <button onClick={closeModal} className="btn-ghost hidden sm:block">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">{t('products.product_name')} *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">{t('products.sku')}</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">{t('products.category')}</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input"
                  />
                </div>
                <div className="col-span-2">
                  <label className="label">{t('common.price')}</label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    className="input"
                  />
                </div>
                <div className="col-span-2">
                  <label className="label">{t('products.description')}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input"
                    rows={3}
                  />
                </div>
              </div>

              <div className="border-t pt-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('products.variants')}</h3>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="btn btn-secondary text-sm"
                  >
                    <Plus size={14} />
                    {t('products.add_variant')}
                  </button>
                </div>

                <div className="space-y-3">
                  {variants.map((variant, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2 items-start p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg)' }}>
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                        <div>
                          <input
                            type="text"
                            placeholder={t('products.color')}
                            value={variant.color}
                            onChange={(e) => updateVariant(index, 'color', e.target.value)}
                            className="input text-sm"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder={t('products.size')}
                            value={variant.size}
                            onChange={(e) => updateVariant(index, 'size', e.target.value)}
                            className="input text-sm"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder={t('common.price')}
                            value={variant.price}
                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                            className="input text-sm"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder={t('products.sku')}
                            value={variant.variantSku}
                            onChange={(e) => updateVariant(index, 'variantSku', e.target.value)}
                            className="input text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {editingProduct && (
                          <button
                            type="button"
                            onClick={() => saveVariant(index)}
                            className="btn-ghost"
                            style={{ color: 'var(--color-success)' }}
                            title={t('common.save')}
                          >
                            <Save size={16} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="btn-ghost"
                          style={{ color: 'var(--color-error)' }}
                          title={t('products.delete_variant')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <button type="button" onClick={closeModal} className="flex-1 btn btn-secondary">
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 btn btn-primary"
                >
                  {createMutation.isPending || updateMutation.isPending ? t('common.loading') : t('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
