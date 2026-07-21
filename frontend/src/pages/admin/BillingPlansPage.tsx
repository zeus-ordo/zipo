import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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

  if (loading) return <div className="p-8">{t('common.loading')}</div>;

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('admin.plans.title')}</h1>
          <button
            onClick={() => setEditingPlan({} as Plan)}
            className="btn btn-primary"
          >
            {t('admin.plans.add_plan')}
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('common.name')}</th>
                <th>{t('admin.plans.price')}</th>
                <th>{t('admin.plans.order_limit')}</th>
                <th>{t('admin.plans.channel_limit')}</th>
                <th>{t('common.status')}</th>
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td>
                    {plan.name}
                    {plan.isDefault && <span className="badge badge-success ml-2">{t('admin.plans.default')}</span>}
                  </td>
                  <td>${plan.price}{t('billing.per_month')}</td>
                  <td>{plan.orderLimit || t('billing.unlimited')}</td>
                  <td>{plan.channelLimit}</td>
                  <td>
                    <span className={plan.isActive ? 'badge badge-success' : 'badge badge-error'}>
                      {plan.isActive ? t('admin.plans.active') : t('admin.plans.inactive')}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="btn-ghost text-sm mr-4"
                    >
                      {t('common.edit')}
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
  const { t } = useTranslation();
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
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="card rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{plan?.id ? t('admin.plans.edit_plan') : t('admin.plans.new_plan')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">{t('common.name')}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">{t('admin.plans.price')}</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">{t('admin.plans.order_limit')}</label>
              <input
                type="number"
                value={form.orderLimit}
                onChange={(e) => setForm({ ...form, orderLimit: parseInt(e.target.value) })}
                className="input"
                placeholder={t('admin.plans.unlimited_placeholder')}
              />
            </div>
          </div>
          <div>
            <label className="label">{t('admin.plans.channel_limit')}</label>
            <input
              type="number"
              value={form.channelLimit}
              onChange={(e) => setForm({ ...form, channelLimit: parseInt(e.target.value) })}
              className="input"
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
              style={{ accentColor: 'var(--color-accent)' }}
            />
            <label htmlFor="isDefault" className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{t('admin.plans.default_plan')}</label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn btn-secondary">{t('common.cancel')}</button>
            <button type="submit" className="btn btn-primary">{t('common.save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}