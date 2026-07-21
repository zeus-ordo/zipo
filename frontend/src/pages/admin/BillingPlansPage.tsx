import React, { useState, useEffect } from 'react';
import { plansApi } from '../../api/client';
import { Layout } from '../../components/Layout';

interface Plan {
  id: string;
  name: string;
  price: number;
  orderLimit: number;
  channelLimit: number;
  features: {
    productCatalog?: boolean;
    inventory?: boolean;
    advancedReports?: boolean;
    apiAccess?: boolean;
    prioritySupport?: boolean;
  };
  isDefault: boolean;
  isActive: boolean;
}

export default function BillingPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await plansApi.list();
      setPlans(res.data);
    } catch (err) {
      console.error('Failed to load plans', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (plan: Partial<Plan>) => {
    try {
      if (plan.id) {
        await plansApi.update(plan.id, plan);
      } else {
        await plansApi.create(plan);
      }
      setEditingPlan(null);
      loadPlans();
    } catch (err) {
      console.error('Failed to save plan', err);
    }
  };

  if (loading) return <div className="p-8">載入中...</div>;

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">訂閱方案管理</h1>
          <button
            onClick={() => setEditingPlan({} as Plan)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            新增方案
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">名稱</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">價格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">訂單上限</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">頻道數</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-6 py-4">
                    {plan.name}
                    {plan.isDefault && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">預設</span>}
                  </td>
                  <td className="px-6 py-4">${plan.price}/月</td>
                  <td className="px-6 py-4">{plan.orderLimit || '無上限'}</td>
                  <td className="px-6 py-4">{plan.channelLimit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {plan.isActive ? '啟用' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingPlan !== null && (
          <PlanModal
            plan={editingPlan}
            onSave={handleSave}
            onClose={() => setEditingPlan(null)}
          />
        )}
      </div>
    </Layout>
  );
}

function PlanModal({ plan, onSave, onClose }: { plan: Plan | null; onSave: (p: Partial<Plan>) => void; onClose: () => void }) {
  const [form, setForm] = useState<Partial<Plan>>(plan || {
    name: '',
    price: 0,
    orderLimit: 0,
    channelLimit: 1,
    features: {},
    isDefault: false,
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{plan?.id ? '編輯方案' : '新增方案'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">名稱</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">價格 ($/月)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">訂單上限</label>
              <input
                type="number"
                value={form.orderLimit}
                onChange={(e) => setForm({ ...form, orderLimit: parseInt(e.target.value) })}
                className="mt-1 block w-full border rounded-md px-3 py-2"
                placeholder="0 = 無上限"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">頻道數上限</label>
            <input
              type="number"
              value={form.channelLimit}
              onChange={(e) => setForm({ ...form, channelLimit: parseInt(e.target.value) })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">新店家預設方案</label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">取消</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">儲存</button>
          </div>
        </form>
      </div>
    </div>
  );
}