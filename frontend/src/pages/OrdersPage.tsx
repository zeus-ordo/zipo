import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { orderApi } from '../api/client';
import { formatDistanceToNow } from '../utils/date';
import { FileText, CheckCircle, Truck, Package, XCircle, ArrowRight } from 'lucide-react';

const statusConfig: Record<string, { label: string; badgeClass: string; icon: typeof CheckCircle }> = {
  confirmed: { label: '已確認', badgeClass: 'badge-info', icon: CheckCircle },
  ready_to_ship: { label: '待出貨', badgeClass: 'badge-warning', icon: Truck },
  shipped: { label: '已出貨', badgeClass: 'badge-success', icon: Package },
  cancelled: { label: '已取消', badgeClass: 'badge-error', icon: XCircle },
};

export function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.list({ limit: 50 }),
  });

  const orders = data?.data?.data ?? [];

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">正式訂單</h1>
        <p className="page-subtitle">管理所有客戶訂單</p>
      </div>

      {isLoading ? (
        <div className="table-container p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-8">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-20" />
                <div className="skeleton h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <FileText className="empty-state-icon" strokeWidth={1} />
          <p className="empty-state-title">目前沒有正式訂單</p>
          <p className="empty-state-description">當客戶透過 LINE 下單後，訂單會顯示在這裡</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>客戶</th>
                <th>金額</th>
                <th>狀態</th>
                <th>時間</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const config = statusConfig[order.status] || { label: order.status, badgeClass: 'badge-info', icon: FileText };
                const StatusIcon = config.icon;
                const total = order.items?.reduce((sum, item) => sum + (item.lineTotal || 0), 0);
                return (
                  <tr key={order.id}>
                    <td>
                      <p className="font-mono text-sm" style={{ color: 'var(--color-text-primary)' }}>{order.id.slice(0, 8)}...</p>
                    </td>
                    <td>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {order.recipientName || order.customer?.lineDisplayName || '未知'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{order.recipientPhone || '-'}</p>
                    </td>
                    <td>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>${total?.toLocaleString() || 0}</p>
                    </td>
                    <td>
                      <span className={`badge ${config.badgeClass}`}>
                        <StatusIcon size={12} />
                        {config.label}
                      </span>
                    </td>
                    <td className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {formatDistanceToNow(order.createdAt)}
                    </td>
                    <td>
                      <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        查看 <ArrowRight size={14} />
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
