export interface CreateConversationRequest {
  tenantId: string;
  customerId: string;
}

export interface SendMessageRequest {
  conversationId: string;
  senderType: 'customer' | 'system' | 'llm';
  content: string;
}
