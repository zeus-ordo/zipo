import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { conversationApi } from '../api/client';
import { formatDistanceToNow } from '../utils/date';
import { MessageSquare } from 'lucide-react';

export function ConversationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => conversationApi.list({ limit: 50 }),
  });

  const conversations = data?.data?.data ?? [];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">對話紀錄</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">載入中...</div>
      ) : conversations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">目前沒有對話紀錄</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">客戶</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">最後訊息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">訊息數</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">時間</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {conversations.map((conv) => (
                <tr key={conv.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-800">
                      {conv.customer?.lineDisplayName || '未知'}
                    </p>
                    <p className="text-sm text-gray-500">{conv.customer?.lineUserId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 line-clamp-1">
                      {conv.lastMessage?.content || '無訊息'}
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
                      查看
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