export interface JwtPayload {
    userId: string;
    tenantId: string | null;
    role: string;
}
export interface AuthTokens {
    accessToken: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export interface RegisterInput {
    email: string;
    password: string;
    name: string;
    role: 'platform_admin' | 'store_admin' | 'staff';
    tenantId?: string;
}
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
        tenantId: string | null;
    };
    tokens: AuthTokens;
}
export interface CreateTenantInput {
    name: string;
}
export interface UpdateTenantInput {
    name?: string;
    isActive?: boolean;
}
//# sourceMappingURL=types.d.ts.map