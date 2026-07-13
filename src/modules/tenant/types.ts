export interface CreateTenantRequest {
  name: string;
}

export interface TenantResponse {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
