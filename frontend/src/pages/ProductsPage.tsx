import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { productApi } from '../api/client';
import { formatDistanceToNow } from '../utils/date';
import { Package, Plus, Upload, Pencil, Trash2, X, Save } from 'lucide-react';
import type { Product, ProductVariant } from '../types';
import toast from 'react-hot-toast';

export function ProductsPage() {
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
      toast.error(_err.response?.data?.error || '建立失敗');
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
      toast.error(_err.response?.data?.error || '更新失敗');
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
      toast.error(_err.response?.data?.error || '停用失敗');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const createVariantMutation = useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: any }) =>
      productApi.createVariant(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || '新增規格失敗');
    },
  });

  const updateVariantMutation = useMutation({
    mutationFn: ({ productId, variantId, data }: { productId: string; variantId: string; data: any }) =>
      productApi.updateVariant(productId, variantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || '更新規格失敗');
    },
  });

  const deleteVariantMutation = useMutation({
    mutationFn: ({ productId, variantId }: { productId: string; variantId: string }) =>
      productApi.deleteVariant(productId, variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || '刪除規格失敗');
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

    const productData: any = {
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
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await productApi.import(formData);
      toast.success(`匯入成功: ${res.data.success} 筆`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (err: any) {
      toast.error(err.response?.data?.error || '匯入失敗');
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
      if (confirm('確定要刪除這個規格？')) {
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
        <h1 className="text-2xl font-bold text-gray-800">商品管理</h1>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
            <Upload size={18} />
            {importing ? '匯入中...' : '匯入 Excel'}
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleImport} className="hidden" disabled={importing} />
          </label>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            新增商品
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">載入中...</div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">目前沒有商品</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">商品名稱</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分類</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">款式/尺寸</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">價格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">SKU: {product.sku || '-'}</p>
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
                      {product.isActive ? '啟用' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <Pencil size={14} />
                        編輯
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('確定要停用這個商品？')) {
                            deleteMutation.mutate(product.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        停用
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? '編輯商品' : '新增商品'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">商品名稱 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">基本價格</label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">說明</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Variants Section */}
              {editingProduct && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">商品規格</h3>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <Plus size={14} />
                      新增規格
                    </button>
                  </div>

                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div key={index} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 grid grid-cols-4 gap-2">
                          <div>
                            <input
                              type="text"
                              placeholder="顏色"
                              value={variant.color}
                              onChange={(e) => updateVariant(index, 'color', e.target.value)}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="尺寸"
                              value={variant.size}
                              onChange={(e) => updateVariant(index, 'size', e.target.value)}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder="價格"
                              value={variant.price}
                              onChange={(e) => updateVariant(index, 'price', e.target.value)}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="規格SKU"
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
                            title="儲存規格"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                            title="刪除規格"
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
                  取消
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? '儲存中...' : '儲存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}