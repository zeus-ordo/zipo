import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { orderApi } from '../api/client';
import { formatDistanceToNow } from '../utils/date';
import { FileText, CheckCircle, Truck, Package, XCircle, ArrowRight } from 'lucide-react';

export function OrdersPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.list({ limit: 50 }),
  });

  const orders = data?.data?.data ?? [];

  const statusConfig: Record<string, { labelKey: string; badgeClass: string; icon: typeof CheckCircle }> = {
    confirmed: { labelKey: 'orders.status_confirmed', badgeClass: 'badge-info', icon: CheckCircle },
    ready_to_ship: { labelKey: 'orders.status_ready_to_ship', badgeClass: 'badge-warning', icon: Truck },
    shipped: { labelKey: 'orders.status_shipped', badgeClass: 'badge-success', icon: Package },
    cancelled: { labelKey: 'orders.status_cancelled', badgeClass: 'badge-error', icon: XCircle },
  };

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">{t('orders.title')}</h1>
        <p className="page-subtitle">{t('orders.drafts')}</p>
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
          <p className="empty-state-title">{t('orders.no_orders')}</p>
          <p className="empty-state-description">{t('orders.drafts')}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('orders.title')}</th>
                <th>{t('conversations.customer')}</th>
                <th>{t('common.total')}</th>
                <th>{t('common.status')}</th>
                <th>{t('common.date')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const config = statusConfig[order.status] || { labelKey: order.status, badgeClass: 'badge-info', icon: FileText };
                const StatusIcon = config.icon;
                const total = order.items?.reduce((sum, item) => sum + (item.lineTotal || 0), 0);
                return (
                  <tr key={order.id}>
                    <td>
                      <p className="font-mono text-sm" style={{ color: 'var(--color-text-primary)' }}>{order.id.slice(0, 8)}...</p>
                    </td>
                    <td>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {order.recipientName || order.customer?.lineDisplayName || '-'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{order.recipientPhone || '-'}</p>
                    </td>
                    <td>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>${total?.toLocaleString() || 0}</p>
                    </td>
                    <td>
                      <span className={`badge ${config.badgeClass}`}>
                        <StatusIcon size={12} />
                        {t(config.labelKey)}
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
                        {t('common.view')} <ArrowRight size={14} />
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
