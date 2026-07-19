export interface BalanceTransaction {
  id: string;
  tenantId: string;
  amount: number;
  type: 'topup' | 'deduction' | 'refund';
  description?: string;
  createdAt: string;
}

export interface BalanceInfo {
  balance: number;
  transactions: BalanceTransaction[];
}