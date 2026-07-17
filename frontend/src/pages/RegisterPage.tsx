import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, tenantApi } from '../api/client';
import type { Tenant } from '../types';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">註冊 ZIPO</h1>
        <p className="text-center text-gray-500 mb-8">服飾業 LINE 接單客服系統</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="王小明"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">信箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'staff')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="admin">管理員</option>
              <option value="staff">員工</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="newTenant"
              checked={isNewTenant}
              onChange={(e) => handleTenantToggle(e.target.checked)}
            />
            <label htmlFor="newTenant" className="text-sm text-gray-700">建立新店家</label>
          </div>

          {isNewTenant ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">店家名稱</label>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="我的服飾店"
                required={isNewTenant}
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">選擇店家</label>
              <select
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {loading ? '註冊中...' : '註冊'}
          </button>

          <p className="text-center text-sm text-gray-500">
            已有帳號？<a href="/login" className="text-blue-600 hover:underline">登入</a>
          </p>
        </form>
      </div>
    </div>
  );
}