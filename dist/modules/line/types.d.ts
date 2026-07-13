export interface LineWebhookEvent {
    type: string;
    replyToken?: string;
    source: {
        userId: string;
        type: string;
    };
    timestamp: number;
    mode: string;
    webhookEventId?: string;
    deliveryContext?: {
        isRedelivery: boolean;
    };
    text?: string;
    message?: {
        id: string;
        type: string;
        text?: string;
    };
}
export interface LineWebhookRequest {
    destination: string;
    events: LineWebhookEvent[];
}
export interface LineChannelSetupInput {
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
}
export interface LineChannelResponse {
    id: string;
    channelId: string;
    webhookUrl: string | null;
    webhookEnabled: boolean;
    webhookVerifiedAt: string | null;
}
export interface LineTextMessage {
    type: 'text';
    id: string;
    text: string;
    quoteToken?: string;
}
export interface LineSource {
    type: 'user' | 'group' | 'room';
    userId?: string;
    groupId?: string;
    roomId?: string;
}
//# sourceMappingURL=types.d.ts.map