import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { orderApi } from '../api/client';
import { formatDistanceToNow } from '../utils/date';
import { FileText, CheckCircle, Truck, Package, XCircle } from 'lucide-react';

const statusConfig = {
  confirmed: { label: '已確認', color: 'text-blue-600 bg-blue-50', icon: CheckCircle },
  ready_to_ship: { label: '待出貨', color: 'text-orange-600 bg-orange-50', icon: Truck },
  shipped: { label: '已出貨', color: 'text-green-600 bg-green-50', icon: Package },
  cancelled: { label: '已取消', color: 'text-gray-600 bg-gray-50', icon: XCircle },
};

export function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.list({ limit: 50 }),
  });

  const orders = data?.data?.data ?? [];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">正式訂單</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">載入中...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">目前沒有正式訂單</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">訂單編號</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">客戶</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">金額</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">時間</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => {
                const config = statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = config?.icon || FileText;
                const total = order.items?.reduce((sum, item) => sum + (item.lineTotal || 0), 0);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-mono text-sm text-gray-800">{order.id.slice(0, 8)}...</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">
                        {order.recipientName || order.customer?.lineDisplayName || '未知'}
                      </p>
                      <p className="text-sm text-gray-500">{order.recipientPhone || '-'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">${total?.toLocaleString() || 0}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color || ''}`}>
                        <StatusIcon size={14} />
                        {config?.label || order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        查看
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}