import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function DarkModeToggle() {
  const { t } = useTranslation();
  const isDark = document.documentElement.classList.contains('dark');

  const toggle = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    } else {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm rounded-lg transition-colors"
      style={{ color: 'var(--color-text-secondary)', backgroundColor: 'transparent' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span>{isDark ? t('common.light_mode') : t('common.dark_mode')}</span>
    </button>
  );
}
