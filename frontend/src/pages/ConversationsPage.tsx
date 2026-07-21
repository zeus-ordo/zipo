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
        <h1 className="text-2xl font-bold text-gray-800">{t('conversations.title')}</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">{t('common.loading')}</div>
      ) : conversations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t('conversations.no_conversations')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('conversations.customer')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('conversations.last_message')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('dashboard.message_count')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.date')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {conversations.map((conv) => (
                <tr key={conv.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-800">
                      {conv.customer?.lineDisplayName || '-'}
                    </p>
                    <p className="text-sm text-gray-500">{conv.customer?.lineUserId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 line-clamp-1">
                      {conv.lastMessage?.content || '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {conv.messageCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(conv.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/conversations/${conv.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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