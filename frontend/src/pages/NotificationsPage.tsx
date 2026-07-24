import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { notificationApi } from '../api/client';
import { Bell, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function NotificationsPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', lineUserId: '', email: '' });

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.list(),
  });

  const notifications = data?.data ?? [];

  const createMutation = useMutation({
    mutationFn: (data: { name: string; lineUserId?: string; email?: string }) =>
      notificationApi.create(data),
    onMutate: async (newNotif) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previousNotifications = queryClient.getQueryData(['notifications']);

      const tempId = `temp-${Date.now()}`;
      const optimisticNotif = {
        id: tempId,
        tenantId: '',
        name: newNotif.name,
        lineUserId: newNotif.lineUserId || null,
        email: newNotif.email || null,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: [optimisticNotif, ...old.data],
        };
      });

      setShowModal(false);
      setFormData({ name: '', lineUserId: '', email: '' });

      return { previousNotifications };
    },
    onError: (_err: any, _vars: any, context: any) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      toast.error(_err.response?.data?.error || t('errors.unknown_error'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => notificationApi.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previousNotifications = queryClient.getQueryData(['notifications']);

      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((n: any) => n.id !== id),
        };
      });

      return { previousNotifications };
    },
    onError: (_err: any, _id: any, context: any) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      toast.error(_err.response?.data?.error || t('errors.unknown_error'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (!formData.lineUserId && !formData.email)) {
      toast.error(t('errors.required'));
      return;
    }
    createMutation.mutate({
      name: formData.name,
      lineUserId: formData.lineUserId || undefined,
      email: formData.email || undefined,
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t('notifications.title')}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
        >
          <Plus size={18} />
          {t('notifications.add_target')}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
      ) : notifications.length === 0 ? (
        <div className="card p-12 text-center">
          <Bell size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
          <p style={{ color: 'var(--color-text-secondary)' }}>{t('notifications.no_targets')}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('notifications.target_name')}</th>
                <th>{t('notifications.line_user')}</th>
                <th>{t('common.email')}</th>
                <th>{t('common.status')}</th>
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif) => (
                <tr key={notif.id}>
                  <td style={{ color: 'var(--color-text-primary)' }}>
                    {notif.name}
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>
                    {notif.lineUserId || '-'}
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>
                    {notif.email || '-'}
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: notif.isActive ? 'rgba(52, 199, 89, 0.15)' : 'var(--color-bg)',
                        color: notif.isActive ? 'var(--color-success)' : 'var(--color-text-secondary)'
                      }}
                    >
                      {notif.isActive ? t('products.active') : t('products.inactive')}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteMutation.mutate(notif.id)}
                      className="btn-ghost text-sm flex items-center gap-1"
                      style={{ color: 'var(--color-error)' }}
                    >
                      <Trash2 size={16} />
                      {t('notifications.delete_target')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="card rounded-t-2xl sm:rounded-xl p-6 w-full sm:max-w-md modal-mobile">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('notifications.add_target')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">{t('notifications.target_name')} *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder={t('notifications.target_name')}
                  required
                />
              </div>
              <div>
                <label className="label">{t('notifications.line_user')}</label>
                <input
                  type="text"
                  value={formData.lineUserId}
                  onChange={(e) => setFormData({ ...formData, lineUserId: e.target.value })}
                  className="input"
                  placeholder={t('notifications.line_user')}
                />
              </div>
              <div>
                <label className="label">{t('notifications.email_notification')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  placeholder={t('notifications.email_notification')}
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn btn-secondary">
                  {t('common.cancel')}
                </button>
                <button type="submit" disabled={createMutation.isPending} className="flex-1 btn btn-primary">
                  {createMutation.isPending ? t('common.loading') : t('common.add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
