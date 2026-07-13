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
    { label: '今日新訂單', value: stats?.todayOrders ?? 0, icon: FileText, color: 'bg-blue-500' },
    { label: '待確認草稿', value: stats?.pendingDrafts ?? 0, icon: Package, color: 'bg-yellow-500' },
    { label: '待出貨', value: stats?.readyToShip ?? 0, icon: Truck, color: 'bg-orange-500' },
    { label: '本月訂單', value: stats?.monthOrders ?? 0, icon: FileText, color: 'bg-green-500' },
    { label: '總客戶數', value: stats?.totalCustomers ?? 0, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">儀表板</h1>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">載入中...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}