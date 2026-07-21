import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { productApi } from '../api/client';
import { Package, Plus, Upload, Pencil, Trash2, X, Save } from 'lucide-react';
import type { Product, ProductVariant } from '../types';
import toast from 'react-hot-toast';

export function ProductsPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [importing, setImporting] = useState(false);

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

    const productData: Partial<Product> = {
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
        <h1 className="text-2xl font-bold text-gray-800">{t('products.title')}</h1>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
            <Upload size={18} />
            {importing ? t('common.loading') : t('products.import_excel')}
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleImport} className="hidden" disabled={importing} />
          </label>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            {t('products.add_product')}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">{t('common.loading')}</div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t('products.no_products')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('products.product_name')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('products.category')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('products.variants')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.price')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{t('products.sku')}: {product.sku || '-'}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.category || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.variants?.map((v: ProductVariant) => (
                        <span key={v.id} className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {v.color || '-'} / {v.size || '-'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${product.basePrice?.toLocaleString() || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.isActive ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50'}`}>
                      {product.isActive ? t('products.active') : t('products.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
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
                        className="text-red-600 hover:text-red-800 text-sm"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? t('products.edit_product') : t('products.add_product')}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('products.product_name')} *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('products.sku')}</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('products.category')}</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.price')}</label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('products.description')}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                  />
                </div>
              </div>

              {editingProduct && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{t('products.variants')}</h3>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <Plus size={14} />
                      {t('products.add_variant')}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div key={index} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 grid grid-cols-4 gap-2">
                          <div>
                            <input
                              type="text"
                              placeholder={t('products.color')}
                              value={variant.color}
                              onChange={(e) => updateVariant(index, 'color', e.target.value)}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder={t('products.size')}
                              value={variant.size}
                              onChange={(e) => updateVariant(index, 'size', e.target.value)}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder={t('common.price')}
                              value={variant.price}
                              onChange={(e) => updateVariant(index, 'price', e.target.value)}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder={t('products.sku')}
                              value={variant.variantSku}
                              onChange={(e) => updateVariant(index, 'variantSku', e.target.value)}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => saveVariant(index)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded"
                            title={t('common.save')}
                          >
                            <Save size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                            title={t('products.delete_variant')}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button type="button" onClick={closeModal} className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50">
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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