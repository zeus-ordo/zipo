import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, tenantApi } from '../api/client';
import type { Tenant } from '../types';
import { Eye, EyeOff } from 'lucide-react';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'staff'>('admin');
  const [tenantName, setTenantName] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [isNewTenant, setIsNewTenant] = useState(true);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTenantToggle = async (checked: boolean) => {
    setIsNewTenant(checked);
    if (!checked) {
      const res = await tenantApi.list();
      setTenants(res.data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let finalTenantId = tenantId;

      if (isNewTenant) {
        if (!tenantName.trim()) {
          setError('請輸入店家名稱');
          setLoading(false);
          return;
        }
      }

      const res = await authApi.register({
        email,
        password,
        name,
        role: role === 'admin' ? 'store_admin' : role,
        tenantId: finalTenantId || undefined,
        tenantName: isNewTenant ? tenantName : undefined,
      });

      localStorage.setItem('token', res.data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || '註冊失敗');
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
          <h1 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>註冊 ZIPO</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>服飾業 LINE 接單客服系統</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 text-sm rounded-xl" style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', color: 'var(--color-error)' }}>{error}</div>
          )}

          <div>
            <label className="label">姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="王小明"
              required
            />
          </div>

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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="label">角色</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'staff')}
              className="input"
            >
              <option value="admin">管理員</option>
              <option value="staff">員工</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="newTenant"
              checked={isNewTenant}
              onChange={(e) => handleTenantToggle(e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: 'var(--color-accent)' }}
            />
            <label htmlFor="newTenant" className="text-sm" style={{ color: 'var(--color-text-primary)' }}>建立新店家</label>
          </div>

          {isNewTenant ? (
            <div>
              <label className="label">店家名稱</label>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="input"
                placeholder="我的服飾店"
                required={isNewTenant}
              />
            </div>
          ) : (
            <div>
              <label className="label">選擇店家</label>
              <select
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="input"
                required={!isNewTenant}
              >
                <option value="">請選擇店家</option>
                {tenants.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6"
            style={{ backgroundColor: 'var(--color-success)' }}
          >
            {loading ? '註冊中...' : '註冊'}
          </button>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            已有帳號？<a href="/login" className="font-medium" style={{ color: 'var(--color-accent)' }}>登入</a>
          </p>
        </form>
      </div>
    </div>
  );
}
