import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { subscriptionsApi, balanceApi, plansApi, ecpayApi } from '../api/client';
import { Layout } from '../components/Layout';

interface Subscription {
  id: string;
  status: string;
  expiresAt: string;
  plan: {
    id: string;
    name: string;
    price: number;
    orderLimit: number;
    channelLimit: number;
    features: Record<string, boolean>;
  };
  currentUsage: {
    orderCount: number;
    channelCount: number;
  };
}

interface BalanceInfo {
  balance: number;
  transactions: Array<{
    id: string;
    amount: number;
    type: string;
    description: string;
    createdAt: string;
  }>;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  orderLimit: number;
  channelLimit: number;
}

export default function StoreBillingPage() {
  const { t } = useTranslation();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [balance, setBalance] = useState<BalanceInfo | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [topupAmount, setTopupAmount] = useState('');
  const [showTopupModal, setShowTopupModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [subRes, balRes, plansRes] = await Promise.all([
        subscriptionsApi.current(),
        balanceApi.current(),
        plansApi.list(),
      ]);
      setSubscription(subRes.data);
      setBalance(balRes.data);
      setPlans(plansRes.data);
    } catch (err) {
      console.error('Failed to load billing data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async () => {
    const amount = parseFloat(topupAmount);
    if (amount <= 0) return;

    try {
      const res = await ecpayApi.createTopup(amount, 'Balance topup');
      const { paymentURL, params } = res.data;

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentURL;
      for (const [key, value] of Object.entries(params)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Failed to initiate topup', err);
    }
  };

  const changePlan = async (planId: string) => {
    if (!subscription) return;
    try {
      await subscriptionsApi.update(subscription.tenantId, { planId });
      loadData();
    } catch (err) {
      console.error('Failed to change plan', err);
    }
  };

  if (loading) return <Layout><div className="p-8 text-center">{t('common.loading')}</div></Layout>;

  if (!subscription) return <Layout><div className="p-8 text-center" style={{ color: 'var(--color-text-secondary)' }}>{t('billing.no_subscription')}</div></Layout>;

  const orderPercent = subscription.plan.orderLimit > 0
    ? (subscription.currentUsage.orderCount / subscription.plan.orderLimit) * 100
    : 0;

  const channelPercent = (subscription.currentUsage.channelCount / subscription.plan.channelLimit) * 100;

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('billing.title')}</h1>

        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">{t('billing.current_plan')}</h2>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-2xl font-bold">{subscription?.plan.name}</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>${subscription?.plan.price}/{t('billing.price_per_month')}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                {t('billing.expires')}: {new Date(subscription!.expiresAt).toLocaleDateString()}
              </div>
            </div>
            <span className={`px-3 py-1 rounded ${
              subscription?.status === 'active' ? 'badge-success' : 'badge-info'
            }`}>
              {subscription?.status === 'active' ? t('billing.status_active') : subscription?.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{t('billing.orders_this_month')}</span>
                <span>{subscription?.currentUsage.orderCount} / {subscription?.plan.orderLimit || t('billing.unlimited')}</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--color-border)' }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${Math.min(orderPercent, 100)}%`, backgroundColor: orderPercent > 90 ? 'var(--color-error)' : 'var(--color-accent)' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{t('billing.line_channels')}</span>
                <span>{subscription?.currentUsage.channelCount} / {subscription?.plan.channelLimit}</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--color-border)' }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${Math.min(channelPercent, 100)}%`, backgroundColor: channelPercent > 90 ? 'var(--color-error)' : 'var(--color-accent)' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">{t('billing.balance')}</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-3xl font-bold">${balance?.balance.toFixed(2) || '0.00'}</div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t('billing.available_balance')}</div>
            </div>
            <button
              onClick={() => setShowTopupModal(true)}
              className="btn btn-primary"
            >
              {t('billing.top_up')}
            </button>
          </div>

          <div className="border-t pt-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>{t('billing.recent_transactions')}</h3>
            <div className="space-y-2">
              {balance?.transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>{tx.description || (tx.type === 'topup' ? t('billing.balance_topup') : tx.type === 'deduction' ? t('billing.deduction') : tx.type)}</span>
                  <span style={{ color: tx.amount >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                    {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">{t('billing.change_plan')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.filter(p => p.isActive).map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-4 ${plan.id === subscription?.plan.id ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)]' : ''}`}
                style={{ borderColor: plan.id === subscription?.plan.id ? 'var(--color-accent)' : 'var(--color-border)', borderWidth: '1px', borderStyle: 'solid' }}
              >
                <div className="font-bold">{plan.name}</div>
                <div className="text-2xl font-bold my-2">${plan.price}<span className="text-sm font-normal">{t('billing.per_month')}</span></div>
                <div className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {plan.orderLimit || t('billing.unlimited')} {t('billing.order_limit')}, {plan.channelLimit} {t('billing.channel_limit')}
                </div>
                {plan.id !== subscription?.plan.id && (
                  <button
                    onClick={() => changePlan(plan.id)}
                    className="w-full btn btn-secondary"
                  >
                    {t('billing.switch')}
                  </button>
                )}
                {plan.id === subscription?.plan.id && (
                  <div className="text-center py-2" style={{ color: 'var(--color-accent)' }}>{t('common.current')}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {showTopupModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="card rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold mb-4">{t('billing.top_up_title')}</h3>
              <div className="mb-4">
                <label className="label">{t('billing.amount_usd')}</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  className="input"
                  placeholder={t('billing.amount_usd')}
                />
              </div>
              <div className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                {t('billing.approx_twd')} ${topupAmount ? (parseFloat(topupAmount) * 30).toFixed(0) : '0'} TWD
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowTopupModal(false)} className="btn btn-secondary">{t('common.cancel')}</button>
                <button onClick={handleTopup} className="btn btn-primary">{t('billing.pay_with_ecpay')}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}