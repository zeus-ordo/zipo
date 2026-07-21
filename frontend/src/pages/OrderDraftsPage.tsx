import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { orderDraftApi } from '../api/client';
import { formatDistanceToNow } from '../utils/date';
import { FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function OrderDraftsPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['order-drafts'],
    queryFn: () => orderDraftApi.list({ limit: 50 }),
  });

  const drafts = data?.data?.data ?? [];

  const statusConfig: Record<string, { labelKey: string; bgColor: string; textColor: string; icon: typeof Clock }> = {
    draft_pending_info: { labelKey: 'orders.status_draft', bgColor: 'rgba(255, 149, 0, 0.15)', textColor: 'var(--color-warning)', icon: Clock },
    draft_needs_review: { labelKey: 'orders.draft_needs_review', bgColor: 'rgba(255, 149, 0, 0.2)', textColor: 'var(--color-warning)', icon: AlertCircle },
    draft_ready_to_confirm: { labelKey: 'orders.draft_ready', bgColor: 'rgba(52, 199, 89, 0.15)', textColor: 'var(--color-success)', icon: CheckCircle },
    draft_cancelled: { labelKey: 'orders.status_cancelled', bgColor: 'var(--color-bg)', textColor: 'var(--color-text-secondary)', icon: FileText },
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t('orderDrafts.title')}</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
      ) : drafts.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
          <p style={{ color: 'var(--color-text-secondary)' }}>{t('orderDrafts.no_drafts')}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('conversations.customer')}</th>
                <th>{t('common.actions')}</th>
                <th>{t('common.status')}</th>
                <th>{t('common.date')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((draft) => {
                const config = statusConfig[draft.status];
                const StatusIcon = config?.icon || FileText;
                return (
                  <tr key={draft.id}>
                    <td>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {draft.customer?.lineDisplayName || '-'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{draft.customer?.lineUserId}</p>
                    </td>
                    <td>
                      <p style={{ color: 'var(--color-text-primary)' }} className="line-clamp-2">{draft.summaryForStaff || '-'}</p>
                      {draft.missingFields?.length > 0 && (
                        <p className="text-sm mt-1" style={{ color: 'var(--color-warning)' }}>
                          {t('errors.required')}: {draft.missingFields.join(', ')}
                        </p>
                      )}
                    </td>
                    <td>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: config?.bgColor, color: config?.textColor }}
                      >
                        <StatusIcon size={14} />
                        {config ? t(config.labelKey) : draft.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-text-tertiary)' }}>
                      {formatDistanceToNow(draft.createdAt)}
                    </td>
                    <td>
                      <Link
                        to={`/order-drafts/${draft.id}`}
                        className="btn-ghost text-sm"
                      >
                        {t('common.view')}
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
