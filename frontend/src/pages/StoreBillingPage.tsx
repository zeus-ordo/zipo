import React, { useState, useEffect } from 'react';
import { subscriptionsApi, balanceApi, plansApi, ecpayApi } from '../api/client';

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

  if (loading) return <div className="p-8">Loading...</div>;

  const orderPercent = subscription && subscription.plan.orderLimit > 0
    ? (subscription.currentUsage.orderCount / subscription.plan.orderLimit) * 100
    : 0;

  const channelPercent = (subscription!.currentUsage.channelCount / subscription!.plan.channelLimit) * 100;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Billing & Subscription</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-2xl font-bold">{subscription?.plan.name}</div>
            <div className="text-gray-500">${subscription?.plan.price}/month</div>
            <div className="text-sm text-gray-400 mt-1">
              Expires: {new Date(subscription!.expiresAt).toLocaleDateString()}
            </div>
          </div>
          <span className={`px-3 py-1 rounded ${
            subscription?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {subscription?.status}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Orders this month</span>
              <span>{subscription?.currentUsage.orderCount} / {subscription?.plan.orderLimit || '∞'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${orderPercent > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(orderPercent, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>LINE Channels</span>
              <span>{subscription?.currentUsage.channelCount} / {subscription?.plan.channelLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${channelPercent > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(channelPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Balance</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-3xl font-bold">${balance?.balance.toFixed(2) || '0.00'}</div>
            <div className="text-sm text-gray-500">Available balance</div>
          </div>
          <button
            onClick={() => setShowTopupModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Top Up
          </button>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Transactions</h3>
          <div className="space-y-2">
            {balance?.transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{tx.description || tx.type}</span>
                <span className={tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Change Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.filter(p => p.isActive).map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 ${plan.id === subscription?.plan.id ? 'border-blue-500 bg-blue-50' : ''}`}
            >
              <div className="font-bold">{plan.name}</div>
              <div className="text-2xl font-bold my-2">${plan.price}<span className="text-sm font-normal">/mo</span></div>
              <div className="text-sm text-gray-500 mb-4">
                {plan.orderLimit} orders, {plan.channelLimit} channels
              </div>
              {plan.id !== subscription?.plan.id && (
                <button
                  onClick={() => changePlan(plan.id)}
                  className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200"
                >
                  Switch
                </button>
              )}
              {plan.id === subscription?.plan.id && (
                <div className="text-center text-blue-600 py-2">Current</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showTopupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Top Up Balance</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter amount"
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">
              ≈ ${topupAmount ? (parseFloat(topupAmount) * 30).toFixed(0) : '0'} TWD
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowTopupModal(false)} className="px-4 py-2 border rounded-md">Cancel</button>
              <button onClick={handleTopup} className="px-4 py-2 bg-blue-600 text-white rounded-md">Pay with ECPay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}