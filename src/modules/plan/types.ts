export interface PlanFeatures {
  productCatalog?: boolean;
  inventory?: boolean;
  advancedReports?: boolean;
  apiAccess?: boolean;
  prioritySupport?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  orderLimit: number;
  channelLimit: number;
  features: PlanFeatures;
  isDefault: boolean;
  isActive: boolean;
}

export interface CreatePlanInput {
  name: string;
  price: number;
  orderLimit: number;
  channelLimit: number;
  features: PlanFeatures;
  isDefault?: boolean;
}
