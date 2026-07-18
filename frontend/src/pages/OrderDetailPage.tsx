import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { orderApi } from '../api/client';
import { formatDate } from '../utils/date';
import { CheckCircle, Truck, Package, XCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const statusConfig = {
  confirmed: { label: '已確認', color: 'text-blue-600 bg-blue-50', icon: CheckCircle },
  ready_to_ship: { label: '待出貨', color: 'text-orange-600 bg-orange-50', icon: Truck },
  shipped: { label: '已出貨', color: 'text-green-600 bg-green-50', icon: Package },
  cancelled: { label: '已取消', color: 'text-gray-600 bg-gray-50', icon: XCircle },
};

export function OrderDetailPage() {
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

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, unitPrice, quantity }: { itemId: string; unitPrice?: number; quantity?: number }) =>
      orderApi.updateItem(id!, itemId, { unitPrice, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      toast.success('已更新商品');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || '更新失敗');
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
      toast.error(err.response?.data?.error || '更新失敗');
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
        <div className="text-center py-12 text-gray-500">載入中...</div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="text-center py-12 text-gray-500">訂單不存在</div>
      </Layout>
    );
  }

  const config = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = config?.icon || CheckCircle;

  const calculateTotal = () => {
    if (!order.items) return 0;
    return order.items.reduce((sum: number, item: any) => {
      const price = itemPrices[item.id] ?? item.unitPrice ?? 0;
      const qty = itemQuantities[item.id] ?? item.quantity ?? 1;
      return sum + (price * qty);
    }, 0);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">訂單詳情</h1>
        <p className="text-sm text-gray-500 mt-1">
          {formatDate(order.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Items */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">商品項目</h2>
          <div className="space-y-4">
            {order.items?.map((item: any) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-4 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">商品名稱</span>
                    <p className="font-medium">{item.name || item.rawText}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">規格</span>
                    <p className="font-medium">{item.color || '-'} / {item.size || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">單價</span>
                    <p className="font-medium">${itemPrices[item.id] ?? item.unitPrice ?? 0}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">小計</span>
                    <p className="font-medium">
                      ${((itemPrices[item.id] ?? item.unitPrice ?? 0) * (itemQuantities[item.id] ?? item.quantity ?? 1))}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-gray-500">單價</label>
                    <input
                      type="number"
                      value={itemPrices[item.id] ?? item.unitPrice ?? ''}
                      onChange={(e) => handlePriceChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-gray-500">數量</label>
                    <input
                      type="number"
                      value={itemQuantities[item.id] ?? item.quantity ?? 1}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <button
                    onClick={() => handleSaveItem(item.id)}
                    disabled={updateItemMutation.isPending}
                    className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 disabled:opacity-50"
                  >
                    <Save size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">總金額</span>
            <span className="text-2xl font-bold text-blue-600">${calculateTotal().toLocaleString()}</span>
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">訂單狀態</h2>
            <div className="flex items-center gap-3 mb-6">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-medium ${config?.color}`}>
                <StatusIcon size={20} />
                {config?.label || order.status}
              </span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleStatusChange('ready_to_ship')}
                disabled={updating || order.status !== 'confirmed'}
                className="w-full py-2 px-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50"
              >
                標記為待出貨
              </button>
              <button
                onClick={() => handleStatusChange('shipped')}
                disabled={updating || order.status !== 'ready_to_ship'}
                className="w-full py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
              >
                標記為已出貨
              </button>
              <button
                onClick={() => handleStatusChange('cancelled')}
                disabled={updating || order.status === 'shipped'}
                className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                取消訂單
              </button>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">收件資訊</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">收件人</span>
                <span className="text-gray-800">{order.recipientName || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">電話</span>
                <span className="text-gray-800">{order.recipientPhone || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">地址</span>
                <span className="text-gray-800">{order.recipientAddress || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">配送方式</span>
                <span className="text-gray-800">
                  {order.deliveryMethod === 'home_delivery' ? '宅配' :
                   order.deliveryMethod === 'store_pickup' ? '超商取貨' :
                   order.deliveryMethod === 'meet_up' ? '面交' : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">付款資訊</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">付款方式</span>
                <span className="text-gray-800">
                  {order.paymentMethod === 'bank_transfer' ? '匯款' :
                   order.paymentMethod === 'cash_on_delivery' ? '貨到付款' :
                   order.paymentMethod === 'line_pay' ? 'LINE Pay' : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">付款狀態</span>
                <span className="text-gray-800">{order.paymentStatus || '-'}</span>
              </div>
              {order.paymentLastFiveDigits && (
                <div className="flex justify-between">
                  <span className="text-gray-500">後五碼</span>
                  <span className="text-gray-800">{order.paymentLastFiveDigits}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}