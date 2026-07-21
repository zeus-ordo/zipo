import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { storeSettingsApi } from '../api/client';
import { Store } from 'lucide-react';
import toast from 'react-hot-toast';

const PAYMENT_METHOD_OPTIONS = [
  { value: 'bank_transfer', label: 'orders.transfer' },
  { value: 'cash_on_delivery', label: 'orders.cod' },
  { value: 'line_pay', label: 'LINE Pay' },
  { value: 'credit_card', label: 'orders.credit_card' },
];

const DELIVERY_METHOD_OPTIONS = [
  { value: 'home_delivery', label: 'orders.home_delivery' },
  { value: 'store_pickup', label: 'orders.store_pickup' },
  { value: 'meet_up', label: 'orders.meet_up' },
];

export function StoreSettingsPage() {
  const { t } = useTranslation();
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
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        storeName: data.data.storeName || '',
        paymentMethods: data.data.paymentMethods || [],
        deliveryMethods: data.data.deliveryMethods || [],
        customerGreeting: data.data.customerGreeting || '',
        orderConfirmTemplate: data.data.orderConfirmTemplate || '',
      });
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData) => storeSettingsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-settings'] });
      toast.success(t('store_settings.settings_saved'));
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
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
        <h1 className="text-2xl font-bold text-gray-800">{t('store_settings.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('store_settings.title')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">{t('common.loading')}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('store_settings.store_name')}</label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder={t('store_settings.store_name')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('store_settings.payment_methods')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHOD_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.paymentMethods.includes(opt.value)}
                          onChange={() => handlePaymentChange(opt.value)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{t(opt.label)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('store_settings.delivery_methods')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {DELIVERY_METHOD_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.deliveryMethods.includes(opt.value)}
                          onChange={() => handleDeliveryChange(opt.value)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{t(opt.label)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('store_settings.greeting')}</label>
                  <textarea
                    value={formData.customerGreeting}
                    onChange={(e) => setFormData({ ...formData, customerGreeting: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder={t('store_settings.greeting')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('store_settings.order_template')}</label>
                  <textarea
                    value={formData.orderConfirmTemplate}
                    onChange={(e) => setFormData({ ...formData, orderConfirmTemplate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={4}
                    placeholder={t('store_settings.order_template')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {updateMutation.isPending ? t('common.loading') : t('common.save')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Store size={20} />
              {t('store_settings.title')}
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">{t('store_settings.store_name')}</span>
                <p className="font-medium">{data?.data?.storeName || '-'}</p>
              </div>
              <div>
                <span className="text-gray-500">{t('store_settings.payment_methods')}</span>
                <p className="font-medium">
                  {data?.data?.paymentMethods?.length
                    ? data.data.paymentMethods.map((m) => {
                        const opt = PAYMENT_METHOD_OPTIONS.find((o) => o.value === m);
                        return opt ? t(opt.label) : m;
                      }).join(', ')
                    : '-'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">{t('store_settings.delivery_methods')}</span>
                <p className="font-medium">
                  {data?.data?.deliveryMethods?.length
                    ? data.data.deliveryMethods.map((m) => {
                        const opt = DELIVERY_METHOD_OPTIONS.find((o) => o.value === m);
                        return opt ? t(opt.label) : m;
                      }).join(', ')
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}