import React, { useState, useEffect } from 'react';
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
          // Tenant might not have subscription
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

  if (loading) return <div className="p-8">載入中...</div>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">店家訂閱管理</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">店家</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">方案</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">到期日</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td className="px-6 py-4">
                  <div className="font-medium">{sub.tenant?.name || 'N/A'}</div>
                </td>
                  <td className="px-6 py-4">{sub.plan?.name || '無方案'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      sub.status === 'active' ? 'bg-green-100 text-green-800' :
                      sub.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sub.status === 'active' ? '有效' :
                       sub.status === 'expired' ? '已過期' :
                       sub.status === 'suspended' ? '已停權' :
                       sub.status === 'cancelled' ? '已取消' : sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(sub.expiresAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <select
                      value={sub.status}
                      onChange={(e) => updateStatus(sub.tenantId, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="active">有效</option>
                      <option value="suspended">停權</option>
                      <option value="cancelled">取消</option>
                      <option value="expired">過期</option>
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