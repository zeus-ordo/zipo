export interface LlmItem {
    matched_product_id: string | null;
    matched_variant_id: string | null;
    raw_text: string;
    name: string | null;
    color: string | null;
    size: string | null;
    quantity: number | null;
    unit_price: number | null;
    is_fuzzy: boolean;
    fuzzy_reason: string | null;
}
export interface LlmCustomerInfo {
    name: string | null;
    phone: string | null;
    address: string | null;
    line_display_name: string | null;
}
export interface LlmPayment {
    method: string | null;
    last_five_digits: string | null;
    status: string;
    note: string | null;
}
export interface LlmDelivery {
    method: string | null;
    address: string | null;
    store_pickup_info: string | null;
    note: string | null;
}
export interface LlmExtractionResult {
    intent: string;
    confidence: number;
    needs_human_review: boolean;
    draft_action: string;
    missing_fields: string[];
    items: LlmItem[];
    customer_info: LlmCustomerInfo;
    payment: LlmPayment;
    delivery: LlmDelivery;
    summary_for_staff: string | null;
    reply_suggestion: string | null;
    risk_flags: string[];
}
export declare function callLlmApi(messages: Array<{
    role: string;
    content: string;
}>): Promise<string>;
export declare function extractOrderInfo(tenantId: string, conversationId: string, customerId: string, recentMessages: Array<{
    senderType: string;
    content: string;
    createdAt: Date;
}>): Promise<LlmExtractionResult>;
export declare function sendLineReply(channelAccessToken: string, userId: string, replyText: string): Promise<void>;
//# sourceMappingURL=extraction.d.ts.map