import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { orderDraftApi, productApi } from '../api/client';
import { formatDate } from '../utils/date';
import { AlertTriangle, Check, Trash2, Save, User } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrderDraftDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    deliveryMethod: '',
    paymentMethod: '',
  });
  const [itemPrices, setItemPrices] = useState<Record<string, number>>({});
  const [itemProducts, setItemProducts] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ['order-draft', id],
    queryFn: () => orderDraftApi.get(id!),
    enabled: !!id,
  });

  const { data: productsData } = useQuery({
    queryKey: ['products', { limit: 100 }],
    queryFn: () => productApi.list({ limit: 100 }),
  });

  const draft = data?.data;
  const products = productsData?.data?.data || [];

  useEffect(() => {
    if (draft?.customer) {
      setFormData(prev => ({
        ...prev,
        recipientName: draft.customer?.name || prev.recipientName,
        recipientPhone: draft.customer?.phone || prev.recipientPhone,
        recipientAddress: draft.customer?.address || prev.recipientAddress,
      }));
    }
    if (draft?.items) {
      const prices: Record<string, number> = {};
      const productIds: Record<string, string> = {};
      draft.items.forEach((item: any) => {
        if (item.unitPrice) prices[item.id] = item.unitPrice;
        if (item.matchedProductId) productIds[item.id] = item.matchedProductId;
      });
      setItemPrices(prices);
      setItemProducts(productIds);
    }
  }, [draft]);

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, productId, unitPrice }: { itemId: string; productId?: string; unitPrice?: number }) =>
      orderDraftApi.updateItem(id!, itemId, { matchedProductId: productId, unitPrice }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-draft', id] });
      toast.success(t('orderDrafts.product_updated'));
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('orderDrafts.update_failed'));
    },
  });

  const handlePriceChange = (itemId: string, price: number) => {
    setItemPrices(prev => ({ ...prev, [itemId]: price }));
  };

  const handleProductChange = (itemId: string, productId: string) => {
    setItemProducts(prev => ({ ...prev, [itemId]: productId }));
    const product = products.find((p: any) => p.id === productId);
    if (product && product.basePrice) {
      setItemPrices(prev => ({ ...prev, [itemId]: product.basePrice }));
    }
  };

  const handleSaveItem = (itemId: string) => {
    updateItemMutation.mutate({
      itemId,
      productId: itemProducts[itemId] || undefined,
      unitPrice: itemPrices[itemId] || undefined,
    });
  };

  const confirmMutation = useMutation({
    mutationFn: (data: { recipientName: string; recipientPhone: string; recipientAddress: string; deliveryMethod: string; paymentMethod: string }) =>
      orderDraftApi.confirm(id!, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['order-drafts'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate(`/orders/${res.data.id}`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('orderDrafts.confirm_failed'));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => orderDraftApi.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-drafts'] });
      navigate('/order-drafts');
    },
  });

  const handleConfirm = async () => {
    if (!formData.recipientName || !formData.recipientPhone || !formData.recipientAddress) {
      toast.error(t('orderDrafts.fill_required_fields'));
      return;
    }
    setConfirming(true);
    try {
      await Promise.all(
        draft.items.map((item: any) => {
          if (itemPrices[item.id] || itemProducts[item.id]) {
            return orderDraftApi.updateItem(id!, item.id, {
              matchedProductId: itemProducts[item.id] || undefined,
              unitPrice: itemPrices[item.id] || undefined,
            });
          }
          return Promise.resolve();
        })
      );
      confirmMutation.mutate({
        recipientName: formData.recipientName,
        recipientPhone: formData.recipientPhone,
        recipientAddress: formData.recipientAddress,
        deliveryMethod: formData.deliveryMethod,
        paymentMethod: formData.paymentMethod,
      });
    } finally {
      setConfirming(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
      </Layout>
    );
  }

  if (!draft) {
    return (
      <Layout>
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('orderDrafts.draft_not_found')}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="page-title">{t('orderDrafts.order_draft')}</h1>
        <p className="page-subtitle">
          {draft.customer?.lineDisplayName || draft.customer?.name || t('orderDrafts.unknown')} · {formatDate(draft.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('orderDrafts.product_items')}</h2>
          {draft.items?.length === 0 ? (
            <p style={{ color: 'var(--color-text-secondary)' }}>{t('orderDrafts.no_product_items')}</p>
          ) : (
            <div className="space-y-4">
              {draft.items?.map((item: any) => (
                <div key={item.id} className="border rounded-lg p-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  {item.isFuzzy && (
                    <div className="flex items-center gap-1 text-sm mb-2" style={{ color: 'var(--color-warning)' }}>
                      <AlertTriangle size={14} />
                      {t('orderDrafts.fuzzy_product')}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.product_name')}</span>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.name || item.rawText}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.variants')}</span>
                        <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.color || '-'} / {item.size || '-'}</p>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{t('common.quantity')}</span>
                        <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.quantity || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{t('orderDrafts.select_product')}</label>
                        <select
                          value={itemProducts[item.id] || ''}
                          onChange={(e) => handleProductChange(item.id, e.target.value)}
                          className="input text-sm"
                        >
                          <option value="">{t('orderDrafts.select_product_placeholder')}</option>
                          {products.map((product: any) => (
                            <option key={product.id} value={product.id}>
                              {product.name} (${product.basePrice || '-'})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{t('orders.unit_price')}</label>
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={itemPrices[item.id] || ''}
                            onChange={(e) => handlePriceChange(item.id, parseInt(e.target.value) || 0)}
                            className="input text-sm"
                            placeholder="0"
                          />
                          <button
                            onClick={() => handleSaveItem(item.id)}
                            className="btn btn-secondary text-sm"
                          >
                            <Save size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.fuzzyReason && (
                    <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>{t('orderDrafts.reason_fuzzy')}: {item.fuzzyReason}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg)' }}>
            <h3 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>{t('orderDrafts.llm_summary')}</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{draft.summaryForStaff || t('orderDrafts.none')}</p>
            {draft.replySuggestion && (
              <>
                <h3 className="font-medium mt-4 mb-2" style={{ color: 'var(--color-text-primary)' }}>{t('orderDrafts.suggested_reply')}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{draft.replySuggestion}</p>
              </>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('orderDrafts.recipient_and_payment_info')}</h2>

          {draft.customer?.pendingInfoUpdate && (
            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 149, 0, 0.1)', border: '1px solid rgba(255, 149, 0, 0.2)' }}>
              <div className="flex items-start gap-2">
                <User style={{ color: 'var(--color-warning)' }} className="mt-0.5" size={18} />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-warning)' }}>{t('orderDrafts.customer_data_updated')}</p>
                  <div className="mt-2 text-xs space-y-1" style={{ color: 'var(--color-warning)' }}>
                    {(() => {
                      try {
                        const pending = JSON.parse(draft.customer.pendingInfoUpdate);
                        return (
                          <>
                            {pending.name && <p>{t('orders.recipient_name')}: {pending.name}</p>}
                            {pending.phone && <p>{t('orders.phone')}: {pending.phone}</p>}
                            {pending.address && <p>{t('orders.address')}: {pending.address}</p>}
                          </>
                        );
                      } catch {
                        return null;
                      }
                    })()}
                  </div>
                  <button
                    onClick={() => {
                      try {
                        const pending = JSON.parse(draft.customer.pendingInfoUpdate);
                        setFormData(prev => ({
                          ...prev,
                          recipientName: pending.name || prev.recipientName,
                          recipientPhone: pending.phone || prev.recipientPhone,
                          recipientAddress: pending.address || prev.recipientAddress,
                        }));
                        toast.success(t('orderDrafts.apply_new_data'));
                      } catch {
                        toast.error(t('orderDrafts.parsing_customer_data_failed'));
                      }
                    }}
                    className="mt-2 px-3 py-1 text-xs rounded"
                    style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)', color: 'var(--color-warning)' }}
                  >
                    {t('orderDrafts.apply_new_data')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="label">{t('orderDrafts.recipient_name_required')}</label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">{t('orderDrafts.recipient_phone_required')}</label>
              <input
                type="text"
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">{t('orderDrafts.recipient_address_required')}</label>
              <input
                type="text"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">{t('orders.delivery_method')}</label>
              <select
                value={formData.deliveryMethod}
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                className="input"
              >
                <option value="">{t('orderDrafts.please_select')}</option>
                <option value="home_delivery">{t('orders.home_delivery')}</option>
                <option value="store_pickup">{t('orders.store_pickup')}</option>
                <option value="meet_up">{t('orders.meet_up')}</option>
              </select>
            </div>
            <div>
              <label className="label">{t('orders.payment_method')}</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="input"
              >
                <option value="">{t('orderDrafts.please_select')}</option>
                <option value="bank_transfer">{t('orders.transfer')}</option>
                <option value="cash_on_delivery">{t('orders.cash_on_delivery')}</option>
                <option value="line_pay">LINE Pay</option>
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleConfirm}
              disabled={confirmMutation.isPending || confirming}
              className="w-full btn text-white"
              style={{ backgroundColor: 'var(--color-success)' }}
            >
              <Check size={20} />
              {confirming ? t('orderDrafts.updating') : t('orderDrafts.confirm_and_create_order')}
            </button>
            <button
              onClick={() => {
                if (window.confirm(t('orderDrafts.confirm_delete_draft'))) {
                  deleteMutation.mutate();
                }
              }}
              disabled={deleteMutation.isPending}
              className="w-full btn"
              style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', color: 'var(--color-error)' }}
            >
              <Trash2 size={20} />
              {t('orderDrafts.delete_draft')}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
