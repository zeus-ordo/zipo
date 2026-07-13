import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { conversationApi } from '../api/client';
import { formatDate } from '../utils/date';
import { User, Bot, Settings } from 'lucide-react';

export function ConversationDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['conversation', id],
    queryFn: () => conversationApi.get(id!),
    enabled: !!id,
  });

  const conversation = data?.data;

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12 text-gray-500">載入中...</div>
      </Layout>
    );
  }

  if (!conversation) {
    return (
      <Layout>
        <div className="text-center py-12 text-gray-500">對話不存在</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">對話詳情</h1>
        <p className="text-sm text-gray-500 mt-1">
          {conversation.customer?.lineDisplayName} · {formatDate(conversation.createdAt)}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
            LINE ID: {conversation.customer?.lineUserId}
          </span>
        </div>

        <div className="space-y-4">
          {conversation.messages?.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.senderType === 'customer' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex gap-2 max-w-[70%] ${msg.senderType === 'customer' ? '' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.senderType === 'customer' ? 'bg-blue-100 text-blue-600' :
                  msg.senderType === 'llm' ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {msg.senderType === 'customer' ? <User size={16} /> :
                   msg.senderType === 'llm' ? <Bot size={16} /> :
                   <Settings size={16} />}
                </div>
                <div>
                  <div className={`rounded-lg px-4 py-2 ${
                    msg.senderType === 'customer' ? 'bg-blue-50 text-gray-800' :
                    msg.senderType === 'llm' ? 'bg-purple-50 text-gray-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(msg.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}