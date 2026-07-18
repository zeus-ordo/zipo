import axios from 'axios';
import type {
  AuthResponse,
  Tenant,
  Conversation,
  OrderDraft,
  Order,
  Product,
  NotificationTarget,
  DashboardStats,
  PaginatedResponse,
  Message,
  ProductVariant,
} from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
  register: (data: { email: string; password: string; name: string; role: string; tenantId?: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  me: () => api.get<{ id: string; email: string; name: string; role: string; tenantId: string | null }>('/auth/me'),
};

// Tenants
export const tenantApi = {
  list: () => api.get<Tenant[]>('/auth/tenants'),
  get: (id: string) => api.get<Tenant>(`/auth/tenants/${id}`),
  create: (name: string) => api.post<Tenant>('/auth/tenants', { name }),
  update: (id: string, data: Partial<Tenant>) => api.patch<Tenant>(`/auth/tenants/${id}`, data),
  delete: (id: string) => api.delete(`/auth/tenants/${id}`),
};

// Dashboard
export const dashboardApi = {
  stats: () => api.get<DashboardStats>('/dashboard/stats'),
};

// Conversations
export const conversationApi = {
  list: (params?: { customerId?: string; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Conversation>>('/conversations', { params }),
  get: (id: string) => api.get<Conversation>(`/conversations/${id}`),
  messages: (id: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Message>>(`/conversations/${id}/messages`, { params }),
};

// Order Drafts
export const orderDraftApi = {
  list: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<OrderDraft>>('/order-drafts', { params }),
  get: (id: string) => api.get<OrderDraft>(`/order-drafts/${id}`),
  update: (id: string, data: Partial<OrderDraft>) =>
    api.patch<OrderDraft>(`/order-drafts/${id}`, data),
  updateItem: (draftId: string, itemId: string, data: { matchedProductId?: string; unitPrice?: number }) =>
    api.patch(`/order-drafts/${draftId}/items/${itemId}`, data),
  confirm: (id: string, data: { recipientName: string; recipientPhone: string; recipientAddress: string; deliveryMethod: string; paymentMethod: string }) =>
    api.post<Order>(`/order-drafts/${id}/confirm`, data),
  delete: (id: string) => api.delete(`/order-drafts/${id}`),
};

// Orders
export const orderApi = {
  list: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Order>>('/orders', { params }),
  get: (id: string) => api.get<Order>(`/orders/${id}`),
  update: (id: string, data: Partial<Order>) =>
    api.patch<Order>(`/orders/${id}`, data),
  updateStatus: (id: string, status: string) =>
    api.patch<Order>(`/orders/${id}/status`, { status }),
  updateItem: (orderId: string, itemId: string, data: { unitPrice?: number; quantity?: number }) =>
    api.patch(`/orders/${orderId}/items/${itemId}`, data),
};

// Products
export const productApi = {
  list: (params?: { category?: string; isActive?: boolean; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Product>>('/products', { params }),
  get: (id: string) => api.get<Product>(`/products/${id}`),
  create: (data: Partial<Product>) => api.post<Product>('/products', data),
  update: (id: string, data: Partial<Product>) =>
    api.patch<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  import: (formData: FormData) =>
    api.post<{ success: number; failed: number; errors: string[] }>('/products/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  createVariant: (productId: string, data: { variantSku?: string; color?: string; size?: string; price?: number }) =>
    api.post<ProductVariant>(`/products/${productId}/variants`, data),
  updateVariant: (productId: string, variantId: string, data: { variantSku?: string; color?: string; size?: string; price?: number }) =>
    api.patch<ProductVariant>(`/products/${productId}/variants/${variantId}`, data),
  deleteVariant: (productId: string, variantId: string) =>
    api.delete(`/products/${productId}/variants/${variantId}`),
};

// Notifications
export const notificationApi = {
  list: () => api.get<NotificationTarget[]>('/notifications'),
  create: (data: { name: string; lineUserId?: string; email?: string }) =>
    api.post<NotificationTarget>('/notifications', data),
  update: (id: string, data: Partial<NotificationTarget>) =>
    api.patch<NotificationTarget>(`/notifications/${id}`, data),
  delete: (id: string) => api.delete(`/notifications/${id}`),
};

// LINE Settings
export const lineApi = {
  getSettings: () =>
    api.get<{ id: string; channelId: string; webhookUrl: string | null; webhookEnabled: boolean }>('/line/settings'),
  updateSettings: (data: { channelId: string; channelSecret: string; channelAccessToken: string }) =>
    api.patch('/line/settings', data),
};

// Store Settings
export const storeSettingsApi = {
  get: () => api.get<{
    id: string;
    storeName: string | null;
    paymentMethods: string[];
    deliveryMethods: string[];
    customerGreeting: string | null;
    orderConfirmTemplate: string | null;
  }>('/store-settings'),
  update: (data: {
    storeName?: string;
    paymentMethods?: string[];
    deliveryMethods?: string[];
    customerGreeting?: string;
    orderConfirmTemplate?: string;
  }) => api.patch('/store-settings', data),
};

export default api;