export interface CreateProductRequest {
  tenantId: string;
  name: string;
  sku?: string;
  category?: string;
  description?: string;
  basePrice?: number;
  sourceType: 'manual' | 'excel' | 'google_sheet';
  sourceRef?: string;
}

export interface ProductResponse {
  id: string;
  tenantId: string;
  sku: string | null;
  name: string;
  category: string | null;
  description: string | null;
  basePrice: number | null;
  isActive: boolean;
  sourceType: string;
  sourceRef: string | null;
  createdAt: Date;
  updatedAt: Date;
}
