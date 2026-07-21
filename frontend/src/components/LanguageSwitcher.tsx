import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { code: 'zh', label: '中文', flag: '🇹🇼' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm rounded-lg transition-colors"
        style={{ color: 'var(--color-text-secondary)', backgroundColor: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Globe size={18} />
        <span>{currentLang.label}</span>
        <ChevronDown size={14} className="ml-auto" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full left-0 mb-1 w-full rounded-lg z-50" style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-elevated)', border: '1px solid var(--color-border-subtle)' }}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleChange(lang.code)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm first:rounded-t-lg last:rounded-b-lg"
                style={{
                  backgroundColor: lang.code === i18n.language ? 'var(--color-accent-light)' : 'transparent',
                  color: lang.code === i18n.language ? 'var(--color-accent)' : 'var(--color-text-primary)',
                }}
                onMouseEnter={(e) => {
                  if (lang.code !== i18n.language) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (lang.code !== i18n.language) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}