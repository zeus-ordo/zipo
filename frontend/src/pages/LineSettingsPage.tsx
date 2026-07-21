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
        <h1 className="page-title">{t('line_settings.title')}</h1>
        <p className="page-subtitle">{t('line_settings.line_official_account')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            {isLoading ? (
              <div className="text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>{t('common.loading')}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">{t('line_settings.channel_id')} *</label>
                  <input
                    type="text"
                    value={formData.channelId}
                    onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                    className="input"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label className="label">{t('line_settings.channel_secret')} *</label>
                  <div className="relative">
                    <input
                      type={showSecret ? 'text' : 'password'}
                      value={formData.channelSecret}
                      onChange={(e) => setFormData({ ...formData, channelSecret: e.target.value })}
                      className="input pr-10"
                      placeholder={t('line_settings.channel_secret')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{t('line_settings.if_not_change_leave_blank')}</p>
                </div>
                <div>
                  <label className="label">{t('line_settings.channel_token')} *</label>
                  <textarea
                    value={formData.channelAccessToken}
                    onChange={(e) => setFormData({ ...formData, channelAccessToken: e.target.value })}
                    className="input"
                    rows={3}
                    placeholder={t('line_settings.channel_token')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="btn btn-primary w-full"
                >
                  {updateMutation.isPending ? t('line_settings.saving') : t('line_settings.save_settings')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t('common.status')}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t('line_settings.channel_id')}</span>
                {settings?.channelId ? (
                  <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-success)' }}>
                    <CheckCircle size={16} />
                    {t('products.active')}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                    <XCircle size={16} />
                    {t('products.inactive')}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t('line_settings.test_webhook')}</span>
                <button
                  onClick={testWebhook}
                  disabled={verifying || !settings?.channelId}
                  className="btn-ghost text-sm"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <RefreshCw size={14} className={verifying ? 'animate-spin' : ''} />
                  {verifying ? t('common.loading') : t('line_settings.test_webhook')}
                </button>
              </div>
            </div>

            {webhookUrl && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>{t('line_settings.webhook_url')}</p>
                <code className="text-xs px-2 py-1 rounded break-all block" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>{webhookUrl}</code>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
