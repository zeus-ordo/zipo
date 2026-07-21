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
        <h1 className="page-title">{t('store_settings.title')}</h1>
        <p className="page-subtitle">{t('store_settings.title')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            {isLoading ? (
              <div className="text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="label">{t('store_settings.store_name')}</label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="input"
                    placeholder={t('store_settings.store_name')}
                  />
                </div>

                <div>
                  <label className="label">{t('store_settings.payment_methods')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHOD_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.paymentMethods.includes(opt.value)}
                          onChange={() => handlePaymentChange(opt.value)}
                          className="w-4 h-4"
                          style={{ accentColor: 'var(--color-accent)' }}
                        />
                        <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{t(opt.label)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">{t('store_settings.delivery_methods')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {DELIVERY_METHOD_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.deliveryMethods.includes(opt.value)}
                          onChange={() => handleDeliveryChange(opt.value)}
                          className="w-4 h-4"
                          style={{ accentColor: 'var(--color-accent)' }}
                        />
                        <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{t(opt.label)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">{t('store_settings.greeting')}</label>
                  <textarea
                    value={formData.customerGreeting}
                    onChange={(e) => setFormData({ ...formData, customerGreeting: e.target.value })}
                    className="input"
                    rows={3}
                    placeholder={t('store_settings.greeting')}
                  />
                </div>

                <div>
                  <label className="label">{t('store_settings.order_template')}</label>
                  <textarea
                    value={formData.orderConfirmTemplate}
                    onChange={(e) => setFormData({ ...formData, orderConfirmTemplate: e.target.value })}
                    className="input"
                    rows={4}
                    placeholder={t('store_settings.order_template')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="btn btn-primary w-full"
                >
                  {updateMutation.isPending ? t('common.loading') : t('common.save')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <Store size={20} />
              {t('store_settings.title')}
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('store_settings.store_name')}</span>
                <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{data?.data?.storeName || '-'}</p>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('store_settings.payment_methods')}</span>
                <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {data?.data?.paymentMethods?.length
                    ? data.data.paymentMethods.map((m) => {
                        const opt = PAYMENT_METHOD_OPTIONS.find((o) => o.value === m);
                        return opt ? t(opt.label) : m;
                      }).join(', ')
                    : '-'}
                </p>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('store_settings.delivery_methods')}</span>
                <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
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
