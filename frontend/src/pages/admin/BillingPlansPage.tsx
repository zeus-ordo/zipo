import React, { useState, useEffect } from 'react';
import api from '../lib/api';

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
      const res = await api.get('/plans');
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
        await api.patch(`/plans/${plan.id}`, plan);
      } else {
        await api.post('/plans', plan);
      }
      setEditingPlan(null);
      loadPlans();
    } catch (err) {
      console.error('Failed to save plan', err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <button
          onClick={() => setEditingPlan({} as Plan)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Plan
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Limit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channels</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-6 py-4">
                  {plan.name}
                  {plan.isDefault && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Default</span>}
                </td>
                <td className="px-6 py-4">${plan.price}/mo</td>
                <td className="px-6 py-4">{plan.orderLimit || 'Unlimited'}</td>
                <td className="px-6 py-4">{plan.channelLimit}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
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
        <h2 className="text-xl font-bold mb-4">{plan?.id ? 'Edit Plan' : 'New Plan'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
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
              <label className="block text-sm font-medium text-gray-700">Price ($/mo)</label>
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
              <label className="block text-sm font-medium text-gray-700">Order Limit</label>
              <input
                type="number"
                value={form.orderLimit}
                onChange={(e) => setForm({ ...form, orderLimit: parseInt(e.target.value) })}
                className="mt-1 block w-full border rounded-md px-3 py-2"
                placeholder="0 = unlimited"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Channel Limit</label>
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
            <label htmlFor="isDefault" className="text-sm text-gray-700">Default plan for new tenants</label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}