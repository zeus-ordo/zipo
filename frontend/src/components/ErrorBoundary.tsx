import { Component, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryContent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    const { t } = useTranslation();

    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="card rounded-xl p-8 max-w-md text-center">
            <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--color-error)' }}>{t('errors.error_occurred')}</h1>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {this.state.error?.message || t('errors.unexpected_error')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              {t('errors.refresh_page')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--color-text-primary)',
              color: 'var(--color-surface)',
            },
            success: {
              iconTheme: {
                primary: 'var(--color-success)',
                secondary: 'var(--color-surface)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--color-error)',
                secondary: 'var(--color-surface)',
              },
            },
          }}
        />
        {this.props.children}
      </>
    );
  }
}

export const ErrorBoundary = ErrorBoundaryContent;
