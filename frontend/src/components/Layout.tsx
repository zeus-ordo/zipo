import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Package, MessageSquare, Bell, Settings, LogOut, Menu, X, Store, CreditCard, ChevronRight, Users, CreditCardIcon, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

const storeNavItems = [
  { icon: LayoutDashboard, label: '儀表板', path: '/dashboard' },
  { icon: FileText, label: '訂單草稿', path: '/order-drafts' },
  { icon: FileText, label: '正式訂單', path: '/orders' },
  { icon: Package, label: '商品管理', path: '/products' },
  { icon: MessageSquare, label: '對話紀錄', path: '/conversations' },
  { icon: Bell, label: '通知設定', path: '/notifications' },
  { icon: Settings, label: 'LINE 設定', path: '/line-settings' },
  { icon: Store, label: '商店設定', path: '/store-settings' },
  { icon: CreditCard, label: '帳務訂閱', path: '/store/billing' },
];

const adminNavItems = [
  { icon: Shield, label: '平台儀表板', path: '/dashboard' },
  { icon: Users, label: '店家管理', path: '/admin/tenants' },
  { icon: CreditCardIcon, label: '方案管理', path: '/admin/billing/plans' },
  { icon: CreditCard, label: '訂閱管理', path: '/admin/billing/subscriptions' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserName(user.name);
      setUserRole(user.role);
    }
  }, []);

  const navItems = userRole === 'platform_admin' ? adminNavItems : storeNavItems;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl"
        style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-elevated)' }}
      >
        <MenuIcon isOpen={sidebarOpen} />
      </button>

      <aside
        className={clsx(
          'fixed top-0 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sidebar)', borderRight: '1px solid var(--color-border-subtle)' }}
      >
        <div className="p-6" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-text-primary)' }}>
              <span className="text-white text-sm font-semibold">Z</span>
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>ZIPO</h1>
              <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>服飾接單系統</p>
            </div>
          </div>
        </div>

        <nav className="p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-white'
                    : 'hover:text-md'
                )}
                style={{
                  backgroundColor: isActive ? 'var(--color-text-primary)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }
                }}
              >
                <item.icon size={18} strokeWidth={1.75} />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight size={14} className="ml-auto opacity-60" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4" style={{ borderTop: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-surface)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{userName || '使用者'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ color: 'var(--color-error)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <LogOut size={16} strokeWidth={1.75} />
            登出
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ backgroundColor: 'var(--color-text-primary)' }} />
      <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--color-text-primary)' }} />
      <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ backgroundColor: 'var(--color-text-primary)' }} />
    </div>
  );
}
