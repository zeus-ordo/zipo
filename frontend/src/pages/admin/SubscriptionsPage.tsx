import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { tenantApi, subscriptionsApi } from '../../api/client';
import { Layout } from '../../components/Layout';

interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  status: string;
  expiresAt: string;
  tenant?: { name: string; email: string };
  plan?: { name: string; price: number };
}

export default function SubscriptionsPage() {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const tenantsRes = await tenantApi.list();
      const subscriptions: any[] = [];
      for (const tenant of tenantsRes.data) {
        try {
          const subRes = await subscriptionsApi.byTenant(tenant.id);
          subscriptions.push({ ...subRes.data, tenant });
        } catch {
        }
      }
      setSubscriptions(subscriptions);
    } catch (err) {
      console.error('Failed to load subscriptions', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (tenantId: string, status: string) => {
    try {
      await subscriptionsApi.update(tenantId, { status });
      loadSubscriptions();
    } catch (err) {
      console.error('Failed to update subscription', err);
    }
  };

  if (loading) return <div className="p-8">{t('common.loading')}</div>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">{t('admin.subscriptions.title')}</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.subscriptions.tenant')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.subscriptions.plan')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('admin.subscriptions.expires')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td className="px-6 py-4">
                  <div className="font-medium">{sub.tenant?.name || 'N/A'}</div>
                </td>
                  <td className="px-6 py-4">{sub.plan?.name || t('billing.no_subscription')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      sub.status === 'active' ? 'bg-green-100 text-green-800' :
                      sub.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sub.status === 'active' ? t('billing.status_active') :
                       sub.status === 'expired' ? t('billing.status_expired') :
                       sub.status === 'suspended' ? t('billing.status_suspended') :
                       sub.status === 'cancelled' ? t('billing.status_cancelled') : sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(sub.expiresAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <select
                      value={sub.status}
                      onChange={(e) => updateStatus(sub.tenantId, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="active">{t('billing.status_active')}</option>
                      <option value="suspended">{t('billing.status_suspended')}</option>
                      <option value="cancelled">{t('billing.status_cancelled')}</option>
                      <option value="expired">{t('billing.status_expired')}</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}