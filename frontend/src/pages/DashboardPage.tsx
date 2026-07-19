import { useQuery } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { dashboardApi } from '../api/client';
import { FileText, Package, Truck, Users } from 'lucide-react';

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.stats(),
  });

  const stats = data?.data;

  const statCards = [
    { label: '今日新訂單', value: stats?.todayOrders ?? 0, icon: FileText, accentColor: 'var(--color-accent)' },
    { label: '待確認草稿', value: stats?.pendingDrafts ?? 0, icon: Package, accentColor: 'var(--color-warning)' },
    { label: '待出貨', value: stats?.readyToShip ?? 0, icon: Truck, accentColor: 'var(--color-error)' },
    { label: '本月訂單', value: stats?.monthOrders ?? 0, icon: FileText, accentColor: 'var(--color-success)' },
    { label: '總客戶數', value: stats?.totalCustomers ?? 0, icon: Users, accentColor: '#8e44ad' },
  ];

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">儀表板</h1>
        <p className="page-subtitle">歡迎回來！以下是今日概況。</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="stat-card">
              <div className="skeleton h-4 w-20 mb-3" />
              <div className="skeleton h-8 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {statCards.map((card) => (
            <div key={card.label} className="stat-card card-hover">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.accentColor}15` }}>
                  <card.icon size={22} style={{ color: card.accentColor }} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>{card.label}</p>
                  <p className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
