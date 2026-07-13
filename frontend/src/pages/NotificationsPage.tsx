import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { notificationApi } from '../api/client';
import { Bell, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function NotificationsPage() {
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
      toast.error(_err.response?.data?.error || '建立失敗');
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
      toast.error(_err.response?.data?.error || '刪除失敗');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (!formData.lineUserId && !formData.email)) {
      toast.error('請填寫名稱及至少一種聯絡方式');
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
        <h1 className="text-2xl font-bold text-gray-800">通知設定</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          新增通知對象
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">載入中...</div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Bell size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">目前沒有設定通知對象</p>
          <p className="text-sm text-gray-400 mt-2">新訂單將通知這裡設定的人員</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">名稱</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">LINE ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notifications.map((notif) => (
                <tr key={notif.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {notif.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {notif.lineUserId || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {notif.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${notif.isActive ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50'}`}>
                      {notif.isActive ? '啟用' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteMutation.mutate(notif.id)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">新增通知對象</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">名稱 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="例如：店家老闆"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LINE User ID</label>
                <input
                  type="text"
                  value={formData.lineUserId}
                  onChange={(e) => setFormData({ ...formData, lineUserId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="用於接收 LINE 通知"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="用於接收 Email 通知"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50">
                  取消
                </button>
                <button type="submit" disabled={createMutation.isPending} className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {createMutation.isPending ? '建立中...' : '建立'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}