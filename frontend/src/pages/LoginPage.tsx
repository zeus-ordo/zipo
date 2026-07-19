import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setError(err.response?.data?.error || '登入失敗');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-[400px] p-10" style={{ backgroundColor: 'var(--color-surface)', borderRadius: '20px', boxShadow: 'var(--shadow-elevated)' }}>
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: 'var(--color-text-primary)' }}>
            <span className="text-white text-xl font-semibold">Z</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>ZIPO</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>服飾業 LINE 接單客服系統</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 text-sm rounded-xl" style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', color: 'var(--color-error)' }}>{error}</div>
          )}

          <div>
            <label className="label">信箱</label>
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
            <label className="label">密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6"
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </form>

        <p className="text-center text-sm mt-8" style={{ color: 'var(--color-text-secondary)' }}>
          還沒有帳號？<a href="/register" className="font-medium" style={{ color: 'var(--color-accent)' }}>註冊</a>
        </p>
      </div>
    </div>
  );
}
