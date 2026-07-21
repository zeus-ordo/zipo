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

  if (loading) return <Layout><div className="p-8 text-center">{t('common.loading')}</div></Layout>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="page-title mb-6">{t('admin.subscriptions.title')}</h1>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('admin.subscriptions.tenant')}</th>
                <th>{t('admin.subscriptions.plan')}</th>
                <th>{t('common.status')}</th>
                <th>{t('admin.subscriptions.expires')}</th>
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td style={{ color: 'var(--color-text-primary)' }}>
                  <div className="font-medium">{sub.tenant?.name || 'N/A'}</div>
                </td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{sub.plan?.name || t('billing.no_subscription')}</td>
                <td>
                  <span className="badge" style={{
                    backgroundColor: sub.status === 'active' ? 'rgba(52, 199, 89, 0.15)' :
                      sub.status === 'expired' ? 'rgba(255, 59, 48, 0.15)' : 'var(--color-bg)',
                    color: sub.status === 'active' ? 'var(--color-success)' :
                      sub.status === 'expired' ? 'var(--color-error)' : 'var(--color-text-secondary)'
                  }}>
                    {sub.status === 'active' ? t('billing.status_active') :
                     sub.status === 'expired' ? t('billing.status_expired') :
                     sub.status === 'suspended' ? t('billing.status_suspended') :
                     sub.status === 'cancelled' ? t('billing.status_cancelled') : sub.status}
                  </span>
                </td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{new Date(sub.expiresAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={sub.status}
                    onChange={(e) => updateStatus(sub.tenantId, e.target.value)}
                    className="input text-sm"
                    style={{ width: 'auto' }}
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
