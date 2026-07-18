import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { lineApi } from '../api/client';
import { MessageSquare, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function LineSettingsPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    channelId: '',
    channelSecret: '',
    channelAccessToken: '',
  });
  const [verifying, setVerifying] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['line-settings'],
    queryFn: () => lineApi.getSettings(),
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        channelId: data.data.channelId || '',
        channelSecret: '',
        channelAccessToken: '',
      });
    }
  }, [data]);

  const settings = data?.data;

  const webhookUrl = settings?.channelId
    ? `${window.location.origin}/api/webhooks/line/${settings.channelId}`
    : null;

  const updateMutation = useMutation({
    mutationFn: (data: { channelId: string; channelSecret: string; channelAccessToken: string }) =>
      lineApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['line-settings'] });
      toast.success('設定已更新');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || '更新失敗');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.channelId || !formData.channelSecret || !formData.channelAccessToken) {
      toast.error('請填寫所有欄位');
      return;
    }
    updateMutation.mutate(formData);
  };

  const testWebhook = async () => {
    if (!settings?.channelId) {
      toast.error('請先儲存 LINE 設定');
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch(`/api/line/webhook/test/${settings.channelId}`);
      if (res.ok) {
        toast.success('Webhook 端點正常！請在 LINE App 發訊息測試');
      } else {
        toast.error('Webhook 端點異常');
      }
    } catch {
      toast.error('Webhook 測試失敗');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">LINE 設定</h1>
        <p className="text-sm text-gray-500 mt-1">設定您的 LINE 官方帳號 Channel 資訊</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">載入中...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel ID *</label>
                  <input
                    type="text"
                    value={formData.channelId}
                    onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel Secret *</label>
                  <input
                    type="password"
                    value={formData.channelSecret}
                    onChange={(e) => setFormData({ ...formData, channelSecret: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="您的 Channel Secret"
                  />
                  <p className="text-xs text-gray-400 mt-1">若不修改請留空</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel Access Token *</label>
                  <textarea
                    value={formData.channelAccessToken}
                    onChange={(e) => setFormData({ ...formData, channelAccessToken: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder="您的 Long-lived Channel Access Token"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {updateMutation.isPending ? '儲存中...' : '儲存設定'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">連線狀態</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">LINE Channel</span>
                {settings?.channelId ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle size={16} />
                    已設定
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <XCircle size={16} />
                    未設定
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Webhook 測試</span>
                <button
                  onClick={testWebhook}
                  disabled={verifying || !settings?.channelId}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                >
                  <RefreshCw size={14} className={verifying ? 'animate-spin' : ''} />
                  {verifying ? '測試中...' : '測試'}
                </button>
              </div>
            </div>

            {webhookUrl && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Webhook URL</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded break-all block">{webhookUrl}</code>
                <p className="text-xs text-gray-500 mt-2">
                  請到 LINE Developers Console 填入以上 URL 並點擊 Verify
                </p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mt-4">
            <h3 className="font-semibold text-blue-800 mb-2">設定說明</h3>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>至 LINE Developers Console 建立 Messaging API Channel</li>
              <li>複製 Channel ID、Channel Secret、Access Token</li>
              <li>在 LINE Developers Console 設定 Webhook URL（見上）</li>
              <li>關閉自動回應功能（Auto-reply、Greeting）</li>
              <li>在本頁填入資料並儲存</li>
              <li>點上方「測試」確認 webhook 可用</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
}