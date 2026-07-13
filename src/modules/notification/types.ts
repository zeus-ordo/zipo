export interface SendNotificationRequest {
  tenantId: string;
  targetUserId?: string;
  targetLineUserId?: string;
  message: string;
}

export interface NotificationResponse {
  success: boolean;
  messageId?: string;
}
