import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, FileText, Package, MessageSquare, Bell, Settings, LogOut, Menu, Store, CreditCard, ChevronRight, Users, CreditCardIcon, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DarkModeToggle } from './DarkModeToggle';

const storeNavItems = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/dashboard' },
  { icon: FileText, labelKey: 'nav.order_drafts', path: '/order-drafts' },
  { icon: FileText, labelKey: 'nav.orders', path: '/orders' },
  { icon: Package, labelKey: 'nav.products', path: '/products' },
  { icon: MessageSquare, labelKey: 'nav.conversations', path: '/conversations' },
  { icon: Bell, labelKey: 'nav.notifications', path: '/notifications' },
  { icon: Settings, labelKey: 'nav.line_settings', path: '/line-settings' },
  { icon: Store, labelKey: 'nav.store_settings', path: '/store-settings' },
  { icon: CreditCard, labelKey: 'nav.billing', path: '/store/billing' },
];

const adminNavItems = [
  { icon: Shield, labelKey: 'nav.platform_dashboard', path: '/dashboard' },
  { icon: Users, labelKey: 'nav.tenant_management', path: '/admin/tenants' },
  { icon: CreditCardIcon, labelKey: 'nav.plan_management', path: '/admin/billing/plans' },
  { icon: CreditCard, labelKey: 'nav.subscription_management', path: '/admin/billing/subscriptions' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
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
              <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{t('system.app_description')}</p>
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
                <span>{t(item.labelKey)}</span>
                {isActive && (
                  <ChevronRight size={14} className="ml-auto opacity-60" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0" style={{ borderTop: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-surface)' }}>
          <div className="p-4">
            <DarkModeToggle />
          </div>
          <div className="p-4 pt-0">
            <LanguageSwitcher />
          </div>
          <div className="p-4 pt-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                {userName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{userName || t('common.user')}</p>
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
              {t('auth.logout')}
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
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
