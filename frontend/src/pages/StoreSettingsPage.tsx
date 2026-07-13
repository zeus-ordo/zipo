import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { storeSettingsApi } from '../api/client';
import { Store } from 'lucide-react';
import toast from 'react-hot-toast';

const PAYMENT_METHOD_OPTIONS = [
  { value: 'bank_transfer', label: '銀行匯款' },
  { value: 'cash_on_delivery', label: '貨到付款' },
  { value: 'line_pay', label: 'LINE Pay' },
  { value: 'credit_card', label: '信用卡' },
];

const DELIVERY_METHOD_OPTIONS = [
  { value: 'home_delivery', label: '宅配' },
  { value: 'store_pickup', label: '超商取貨' },
  { value: 'meet_up', label: '面交' },
];

export function StoreSettingsPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    storeName: '',
    paymentMethods: [] as string[],
    deliveryMethods: [] as string[],
    customerGreeting: '',
    orderConfirmTemplate: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['store-settings'],
    queryFn: () => storeSettingsApi.get(),
    onSuccess: (res) => {
      if (res.data) {
        setFormData({
          storeName: res.data.storeName || '',
          paymentMethods: res.data.paymentMethods || [],
          deliveryMethods: res.data.deliveryMethods || [],
          customerGreeting: res.data.customerGreeting || '',
          orderConfirmTemplate: res.data.orderConfirmTemplate || '',
        });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData) => storeSettingsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-settings'] });
      toast.success('設定已更新');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || '更新失敗');
    },
  });

  const handlePaymentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(value)
        ? prev.paymentMethods.filter((v) => v !== value)
        : [...prev.paymentMethods, value],
    }));
  };

  const handleDeliveryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMethods: prev.deliveryMethods.includes(value)
        ? prev.deliveryMethods.filter((v) => v !== value)
        : [...prev.deliveryMethods, value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">商店設定</h1>
        <p className="text-sm text-gray-500 mt-1">設定商店名稱、付款與配送方式</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">載入中...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">商店名稱</label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="您的商店名稱"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">付款方式</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHOD_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.paymentMethods.includes(opt.value)}
                          onChange={() => handlePaymentChange(opt.value)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">配送方式</label>
                  <div className="grid grid-cols-2 gap-3">
                    {DELIVERY_METHOD_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.deliveryMethods.includes(opt.value)}
                          onChange={() => handleDeliveryChange(opt.value)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">客服歡迎語</label>
                  <textarea
                    value={formData.customerGreeting}
                    onChange={(e) => setFormData({ ...formData, customerGreeting: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder="LINE 顧客初次接洽時的自動歡迎語"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">訂單確認範本</label>
                  <textarea
                    value={formData.orderConfirmTemplate}
                    onChange={(e) => setFormData({ ...formData, orderConfirmTemplate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={4}
                    placeholder="訂單確認後發送給顧客的訊息範本，可用變數：{customer_name}、{order_no}、{total_amount}"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {updateMutation.isPending ? '儲存中...' : '儲存設定'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Store size={20} />
              商店資訊
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">商店名稱</span>
                <p className="font-medium">{data?.data?.storeName || '未設定'}</p>
              </div>
              <div>
                <span className="text-gray-500">付款方式</span>
                <p className="font-medium">
                  {data?.data?.paymentMethods?.length
                    ? data.data.paymentMethods.map((m) => PAYMENT_METHOD_OPTIONS.find((o) => o.value === m)?.label || m).join('、')
                    : '未設定'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">配送方式</span>
                <p className="font-medium">
                  {data?.data?.deliveryMethods?.length
                    ? data.data.deliveryMethods.map((m) => DELIVERY_METHOD_OPTIONS.find((o) => o.value === m)?.label || m).join('、')
                    : '未設定'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}