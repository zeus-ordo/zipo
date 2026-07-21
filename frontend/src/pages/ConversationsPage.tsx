import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { conversationApi } from '../api/client';
import { formatDistanceToNow } from '../utils/date';
import { MessageSquare } from 'lucide-react';

export function ConversationsPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => conversationApi.list({ limit: 50 }),
  });

  const conversations = data?.data?.data ?? [];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t('conversations.title')}</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
      ) : conversations.length === 0 ? (
        <div className="card p-12 text-center">
          <MessageSquare size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
          <p style={{ color: 'var(--color-text-secondary)' }}>{t('conversations.no_conversations')}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('conversations.customer')}</th>
                <th>{t('conversations.last_message')}</th>
                <th>{t('dashboard.message_count')}</th>
                <th>{t('common.date')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conv) => (
                <tr key={conv.id}>
                  <td>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {conv.customer?.lineDisplayName || '-'}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{conv.customer?.lineUserId}</p>
                  </td>
                  <td>
                    <p className="line-clamp-1" style={{ color: 'var(--color-text-secondary)' }}>
                      {conv.lastMessage?.content || '-'}
                    </p>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>
                    {conv.messageCount || 0}
                  </td>
                  <td style={{ color: 'var(--color-text-tertiary)' }}>
                    {formatDistanceToNow(conv.updatedAt)}
                  </td>
                  <td>
                    <Link
                      to={`/conversations/${conv.id}`}
                      className="btn-ghost text-sm"
                    >
                      {t('common.view')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
