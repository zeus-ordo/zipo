import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { orderApi } from '../api/client';
import { formatDate } from '../utils/date';
import { CheckCircle, Truck, Package, XCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrderDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState(false);
  const [itemPrices, setItemPrices] = useState<Record<string, number>>({});
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});

  const { data, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.get(id!),
    enabled: !!id,
  });

  const order = data?.data;

  const statusConfig: Record<string, { labelKey: string; bgColor: string; textColor: string; icon: typeof CheckCircle }> = {
    confirmed: { labelKey: 'orders.status_confirmed', bgColor: 'var(--color-accent-light)', textColor: 'var(--color-accent)', icon: CheckCircle },
    ready_to_ship: { labelKey: 'orders.status_ready_to_ship', bgColor: 'rgba(255, 149, 0, 0.15)', textColor: 'var(--color-warning)', icon: Truck },
    shipped: { labelKey: 'orders.status_shipped', bgColor: 'rgba(52, 199, 89, 0.15)', textColor: 'var(--color-success)', icon: Package },
    cancelled: { labelKey: 'orders.status_cancelled', bgColor: 'var(--color-bg)', textColor: 'var(--color-text-secondary)', icon: XCircle },
  };

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, unitPrice, quantity }: { itemId: string; unitPrice?: number; quantity?: number }) =>
      orderApi.updateItem(id!, itemId, { unitPrice, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      toast.success(t('orderDrafts.product_updated'));
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
    },
  });

  const handlePriceChange = (itemId: string, price: number) => {
    setItemPrices(prev => ({ ...prev, [itemId]: price }));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setItemQuantities(prev => ({ ...prev, [itemId]: quantity }));
  };

  const handleSaveItem = (itemId: string) => {
    updateItemMutation.mutate({
      itemId,
      unitPrice: itemPrices[itemId],
      quantity: itemQuantities[itemId],
    });
  };

  const statusMutation = useMutation({
    mutationFn: (status: string) => orderApi.updateStatus(id!, status),
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ['order', id] });
      await queryClient.cancelQueries({ queryKey: ['orders'] });

      const previousOrder = queryClient.getQueryData(['order', id]);
      const previousOrders = queryClient.getQueryData(['orders']);

      queryClient.setQueryData(['order', id], (old: any) => ({
        ...old,
        data: old?.data ? { ...old.data, status: newStatus } : old,
      }));

      queryClient.setQueryData(['orders'], (old: any) => {
        if (!old?.data?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: old.data.data.map((o: any) =>
              o.id === id ? { ...o, status: newStatus } : o
            ),
          },
        };
      });

      return { previousOrder, previousOrders };
    },
    onError: (err: any, _status: string, context: any) => {
      if (context?.previousOrder) {
        queryClient.setQueryData(['order', id], context.previousOrder);
      }
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
    },
    onSettled: () => {
      setUpdating(false);
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleStatusChange = (newStatus: string) => {
    setUpdating(true);
    statusMutation.mutate(newStatus);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('orders.no_orders')}</div>
      </Layout>
    );
  }

  const config = statusConfig[order.status];
  const StatusIcon = config?.icon || CheckCircle;

  const calculateTotal = () => {
    if (!order.items) return 0;
    return order.items.reduce((sum: number, item: any) => {
      const price = itemPrices[item.id] ?? item.unitPrice ?? 0;
      const qty = itemQuantities[item.id] ?? item.quantity ?? 1;
      return sum + (price * qty);
    }, 0);
  };

  const getDeliveryLabel = (method: string | null) => {
    if (method === 'home_delivery') return t('orders.home_delivery');
    if (method === 'store_pickup') return t('orders.store_pickup');
    if (method === 'meet_up') return t('orders.meet_up');
    return '-';
  };

  const getPaymentLabel = (method: string | null) => {
    if (method === 'bank_transfer') return t('orders.transfer');
    if (method === 'cash_on_delivery') return t('orders.cash_on_delivery');
    if (method === 'line_pay') return 'LINE Pay';
    return '-';
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="page-title">{t('orders.order_detail')}</h1>
        <p className="page-subtitle">
          {formatDate(order.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('orders.order_items')}</h2>
          <div className="space-y-4">
            {order.items?.map((item: any) => (
              <div key={item.id} className="border rounded-lg p-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="grid grid-cols-4 gap-2 text-sm mb-3">
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.product_name')}</span>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.name || item.rawText}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.variants')}</span>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.color || '-'} / {item.size || '-'}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.unit_price')}</span>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>${itemPrices[item.id] ?? item.unitPrice ?? 0}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.subtotal')}</span>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      ${((itemPrices[item.id] ?? item.unitPrice ?? 0) * (itemQuantities[item.id] ?? item.quantity ?? 1))}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center pt-2" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                  <div className="flex items-center gap-1">
                    <label className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{t('orders.unit_price')}</label>
                    <input
                      type="number"
                      value={itemPrices[item.id] ?? item.unitPrice ?? ''}
                      onChange={(e) => handlePriceChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border rounded text-sm"
                      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{t('common.quantity')}</label>
                    <input
                      type="number"
                      value={itemQuantities[item.id] ?? item.quantity ?? 1}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border rounded text-sm"
                      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
                    />
                  </div>
                  <button
                    onClick={() => handleSaveItem(item.id)}
                    disabled={updateItemMutation.isPending}
                    className="btn btn-secondary text-sm"
                  >
                    <Save size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 flex justify-between items-center" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <span className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('orders.total_amount')}</span>
            <span className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>${calculateTotal().toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('orders.order_status')}</h2>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-medium"
                style={{ backgroundColor: config?.bgColor, color: config?.textColor }}
              >
                <StatusIcon size={20} />
                {config ? t(config.labelKey) : order.status}
              </span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleStatusChange('ready_to_ship')}
                disabled={updating || order.status !== 'confirmed'}
                className="w-full btn"
                style={{ backgroundColor: 'rgba(255, 149, 0, 0.15)', color: 'var(--color-warning)' }}
              >
                {t('orders.mark_ready_to_ship')}
              </button>
              <button
                onClick={() => handleStatusChange('shipped')}
                disabled={updating || order.status !== 'ready_to_ship'}
                className="w-full btn"
                style={{ backgroundColor: 'rgba(52, 199, 89, 0.15)', color: 'var(--color-success)' }}
              >
                {t('orders.mark_shipped')}
              </button>
              <button
                onClick={() => handleStatusChange('cancelled')}
                disabled={updating || order.status === 'shipped'}
                className="w-full btn"
                style={{ backgroundColor: 'rgba(255, 59, 48, 0.15)', color: 'var(--color-error)' }}
              >
                {t('orders.cancel_order')}
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('orders.recipient_info')}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.recipient')}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{order.recipientName || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.phone')}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{order.recipientPhone || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.address')}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{order.recipientAddress || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.delivery_method')}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{getDeliveryLabel(order.deliveryMethod)}</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('orders.payment_info')}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.payment_method')}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{getPaymentLabel(order.paymentMethod)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.payment_status')}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{order.paymentStatus || '-'}</span>
              </div>
              {order.paymentLastFiveDigits && (
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-secondary)' }}>{t('orders.last_five_digits')}</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>{order.paymentLastFiveDigits}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
