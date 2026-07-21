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

  const statusConfig: Record<string, { labelKey: string; color: string; icon: typeof Clock }> = {
    draft_pending_info: { labelKey: 'orders.status_draft', color: 'text-yellow-600 bg-yellow-50', icon: Clock },
    draft_needs_review: { labelKey: 'orders.draft_needs_review', color: 'text-orange-600 bg-orange-50', icon: AlertCircle },
    draft_ready_to_confirm: { labelKey: 'orders.draft_ready', color: 'text-green-600 bg-green-50', icon: CheckCircle },
    draft_cancelled: { labelKey: 'orders.status_cancelled', color: 'text-gray-600 bg-gray-50', icon: FileText },
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('orderDrafts.title')}</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">{t('common.loading')}</div>
      ) : drafts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t('orderDrafts.no_drafts')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('conversations.customer')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.actions')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.date')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drafts.map((draft) => {
                const config = statusConfig[draft.status];
                const StatusIcon = config?.icon || FileText;
                return (
                  <tr key={draft.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">
                        {draft.customer?.lineDisplayName || '-'}
                      </p>
                      <p className="text-sm text-gray-500">{draft.customer?.lineUserId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 line-clamp-2">{draft.summaryForStaff || '-'}</p>
                      {draft.missingFields?.length > 0 && (
                        <p className="text-sm text-yellow-600 mt-1">
                          {t('errors.required')}: {draft.missingFields.join(', ')}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color || ''}`}>
                        <StatusIcon size={14} />
                        {config ? t(config.labelKey) : draft.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(draft.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/order-drafts/${draft.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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