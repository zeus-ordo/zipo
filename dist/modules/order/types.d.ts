export interface CreateOrderRequest {
    tenantId: string;
    customerId: string;
    orderDraftId?: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    deliveryMethod: string;
    paymentMethod: string;
}
export interface OrderResponse {
    id: string;
    tenantId: string;
    orderDraftId: string | null;
    customerId: string;
    status: string;
    recipientName: string | null;
    recipientPhone: string | null;
    recipientAddress: string | null;
    deliveryMethod: string | null;
    paymentMethod: string | null;
    paymentStatus: string | null;
    confirmedByUserId: string | null;
    confirmedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=types.d.ts.map