export interface User {
  id: string;
  email: string;
  name: string;
  role: 'platform_admin' | 'store_admin' | 'staff';
  tenantId: string | null;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
  };
}

export interface Tenant {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  tenantId: string;
  lineUserId: string;
  lineDisplayName: string | null;
  linePictureUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderType: 'customer' | 'system' | 'llm';
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  tenantId: string;
  customerId: string;
  customer?: Customer;
  messages?: Message[];
  lastMessage?: {
    content: string;
    senderType: string;
    createdAt: string;
  } | null;
  messageCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDraftItem {
  id: string;
  tenantId: string;
  orderDraftId: string;
  matchedProductId: string | null;
  matchedVariantId: string | null;
  rawText: string | null;
  name: string | null;
  color: string | null;
  size: string | null;
  quantity: number | null;
  unitPrice: number | null;
  isFuzzy: boolean;
  fuzzyReason: string | null;
}

export interface OrderDraft {
  id: string;
  tenantId: string;
  customerId: string;
  conversationId: string;
  status: 'draft_pending_info' | 'draft_needs_review' | 'draft_ready_to_confirm' | 'draft_cancelled';
  source: string;
  llmConfidence: number | null;
  needsHumanReview: boolean;
  missingFields: string[];
  summaryForStaff: string | null;
  replySuggestion: string | null;
  customer?: Customer;
  items?: OrderDraftItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  tenantId: string;
  orderId: string;
  productId: string | null;
  variantId: string | null;
  rawText: string | null;
  name: string | null;
  color: string | null;
  size: string | null;
  quantity: number | null;
  unitPrice: number | null;
  lineTotal: number | null;
  isFuzzy: boolean;
}

export interface Order {
  id: string;
  tenantId: string;
  orderDraftId: string | null;
  customerId: string;
  status: 'confirmed' | 'ready_to_ship' | 'shipped' | 'cancelled';
  recipientName: string | null;
  recipientPhone: string | null;
  recipientAddress: string | null;
  deliveryMethod: string | null;
  deliveryNote: string | null;
  paymentMethod: string | null;
  paymentStatus: string | null;
  paymentLastFiveDigits: string | null;
  paymentNote: string | null;
  staffNote: string | null;
  confirmedByUserId: string | null;
  confirmedAt: string | null;
  customer?: Customer;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  tenantId: string;
  productId: string;
  variantSku: string | null;
  color: string | null;
  size: string | null;
  price: number | null;
  isActive: boolean;
}

export interface Product {
  id: string;
  tenantId: string;
  sku: string | null;
  name: string;
  category: string | null;
  description: string | null;
  basePrice: number | null;
  isActive: boolean;
  sourceType: 'manual' | 'excel' | 'google_sheet';
  sourceRef: string | null;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationTarget {
  id: string;
  tenantId: string;
  name: string;
  lineUserId: string | null;
  email: string | null;
  isActive: boolean;
}

export interface DashboardStats {
  todayOrders: number;
  pendingDrafts: number;
  readyToShip: number;
  monthOrders: number;
  totalCustomers: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}