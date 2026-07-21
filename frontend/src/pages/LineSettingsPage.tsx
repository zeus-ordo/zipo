import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { lineApi } from '../api/client';
import { MessageSquare, CheckCircle, XCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export function LineSettingsPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    channelId: '',
    channelSecret: '',
    channelAccessToken: '',
  });
  const [showSecret, setShowSecret] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const { data, isLoading } = useQuery({
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
      toast.success(t('store_settings.settings_saved'));
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || t('errors.unknown_error'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.channelId || !formData.channelSecret || !formData.channelAccessToken) {
      toast.error(t('errors.required'));
      return;
    }
    updateMutation.mutate(formData);
  };

  const testWebhook = async () => {
    if (!settings?.channelId) {
      toast.error(t('line_settings.test_failed'));
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch(`/api/line/webhook/test/${settings.channelId}`);
      if (res.ok) {
        toast.success(t('line_settings.test_success'));
      } else {
        toast.error(t('line_settings.test_failed'));
      }
    } catch {
      toast.error(t('line_settings.test_failed'));
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('line_settings.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('line_settings.line_official_account')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">{t('common.loading')}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('line_settings.channel_id')} *</label>
                  <input
                    type="text"
                    value={formData.channelId}
                    onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('line_settings.channel_secret')} *</label>
                  <div className="relative">
                    <input
                      type={showSecret ? 'text' : 'password'}
                      value={formData.channelSecret}
                      onChange={(e) => setFormData({ ...formData, channelSecret: e.target.value })}
                      className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder={t('line_settings.channel_secret')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{t('line_settings.if_not_change_leave_blank')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('line_settings.channel_token')} *</label>
                  <textarea
                    value={formData.channelAccessToken}
                    onChange={(e) => setFormData({ ...formData, channelAccessToken: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder={t('line_settings.channel_token')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {updateMutation.isPending ? t('line_settings.saving') : t('line_settings.save_settings')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('common.status')}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t('line_settings.channel_id')}</span>
                {settings?.channelId ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle size={16} />
                    {t('products.active')}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <XCircle size={16} />
                    {t('products.inactive')}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t('line_settings.test_webhook')}</span>
                <button
                  onClick={testWebhook}
                  disabled={verifying || !settings?.channelId}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                >
                  <RefreshCw size={14} className={verifying ? 'animate-spin' : ''} />
                  {verifying ? t('common.loading') : t('line_settings.test_webhook')}
                </button>
              </div>
            </div>

            {webhookUrl && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">{t('line_settings.webhook_url')}</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded break-all block">{webhookUrl}</code>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}