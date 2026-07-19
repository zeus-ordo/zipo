export interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'suspended';
  expiresAt: string;
  plan?: Plan;
}

export interface TenantSubscription extends Subscription {
  plan: Plan;
  currentUsage: {
    orderCount: number;
    channelCount: number;
  };
}

interface Plan {
  id: string;
  name: string;
  price: number;
  orderLimit: number;
  channelLimit: number;
  features: unknown;
  isDefault: boolean;
  isActive: boolean;
}
