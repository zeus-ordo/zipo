import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { OrderDraftsPage } from './pages/OrderDraftsPage';
import { OrderDraftDetailPage } from './pages/OrderDraftDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ConversationsPage } from './pages/ConversationsPage';
import { ConversationDetailPage } from './pages/ConversationDetailPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { LineSettingsPage } from './pages/LineSettingsPage';
import { StoreSettingsPage } from './pages/StoreSettingsPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/order-drafts"
            element={<ProtectedRoute><OrderDraftsPage /></ProtectedRoute>}
          />
          <Route
            path="/order-drafts/:id"
            element={<ProtectedRoute><OrderDraftDetailPage /></ProtectedRoute>}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute><OrdersPage /></ProtectedRoute>}
          />
          <Route
            path="/orders/:id"
            element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>}
          />
          <Route
            path="/products"
            element={<ProtectedRoute><ProductsPage /></ProtectedRoute>}
          />
          <Route
            path="/conversations"
            element={<ProtectedRoute><ConversationsPage /></ProtectedRoute>}
          />
          <Route
            path="/conversations/:id"
            element={<ProtectedRoute><ConversationDetailPage /></ProtectedRoute>}
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>}
          />
          <Route
            path="/line-settings"
            element={<ProtectedRoute><LineSettingsPage /></ProtectedRoute>}
          />
          <Route
            path="/store-settings"
            element={<ProtectedRoute><StoreSettingsPage /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;