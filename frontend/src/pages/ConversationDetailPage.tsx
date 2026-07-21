import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { conversationApi } from '../api/client';
import { formatDate } from '../utils/date';
import { User, Bot, Settings } from 'lucide-react';

export function ConversationDetailPage() {
  const { t } = useTranslation();
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
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('conversations.loading')}</div>
      </Layout>
    );
  }

  if (!conversation) {
    return (
      <Layout>
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('conversations.conversation_not_found')}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{t('conversations.conversation_detail')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          {conversation.customer?.lineDisplayName} · {formatDate(conversation.createdAt)}
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}>
            {t('conversations.line_id')}: {conversation.customer?.lineUserId}
          </span>
        </div>

        <div className="space-y-4">
          {conversation.messages?.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.senderType === 'customer' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex gap-2 max-w-[70%] ${msg.senderType === 'customer' ? '' : 'flex-row-reverse'}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{
                  backgroundColor: msg.senderType === 'customer' ? 'rgba(10, 132, 255, 0.15)' :
                    msg.senderType === 'llm' ? 'rgba(159, 74, 255, 0.15)' : 'var(--color-bg)',
                  color: msg.senderType === 'customer' ? 'var(--color-accent)' :
                    msg.senderType === 'llm' ? '#9f4aff' : 'var(--color-text-secondary)'
                }}>
                  {msg.senderType === 'customer' ? <User size={16} /> :
                   msg.senderType === 'llm' ? <Bot size={16} /> :
                   <Settings size={16} />}
                </div>
                <div>
                  <div className="rounded-lg px-4 py-2" style={{
                    backgroundColor: msg.senderType === 'customer' ? 'rgba(10, 132, 255, 0.08)' :
                      msg.senderType === 'llm' ? 'rgba(159, 74, 255, 0.08)' : 'var(--color-bg)',
                    color: 'var(--color-text-primary)'
                  }}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{formatDate(msg.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}