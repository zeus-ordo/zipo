import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authApi.login(email, password);
      localStorage.setItem('token', res.data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || t('auth.login_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-[400px] p-10" style={{ backgroundColor: 'var(--color-surface)', borderRadius: '20px', boxShadow: 'var(--shadow-elevated)' }}>
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: 'var(--color-text-primary)' }}>
            <span className="text-white text-xl font-semibold">Z</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>ZIPO</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t('auth.system_description')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 text-sm rounded-xl" style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', color: 'var(--color-error)' }}>{error}</div>
          )}

          <div>
            <label className="label">{t('auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="label">{t('auth.password')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6"
          >
            {loading ? t('auth.login') + '...' : t('auth.login')}
          </button>
        </form>

        <p className="text-center text-sm mt-8" style={{ color: 'var(--color-text-secondary)' }}>
          {t('auth.no_account')}<a href="/register" className="font-medium" style={{ color: 'var(--color-accent)' }}>{t('auth.register')}</a>
        </p>
      </div>
    </div>
  );
}
