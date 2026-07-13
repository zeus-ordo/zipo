import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: any;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: any;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: any;
export declare const ModelName: {
    readonly Tenant: "Tenant";
    readonly User: "User";
    readonly LineChannel: "LineChannel";
    readonly Customer: "Customer";
    readonly Conversation: "Conversation";
    readonly Message: "Message";
    readonly Product: "Product";
    readonly ProductVariant: "ProductVariant";
    readonly OrderDraft: "OrderDraft";
    readonly OrderDraftItem: "OrderDraftItem";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly NotificationTarget: "NotificationTarget";
    readonly StoreSetting: "StoreSetting";
    readonly AuditLog: "AuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const TenantScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly name: "name";
    readonly role: "role";
    readonly tenantId: "tenantId";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const LineChannelScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly channelId: "channelId";
    readonly channelSecret: "channelSecret";
    readonly channelAccessToken: "channelAccessToken";
    readonly webhookUrl: "webhookUrl";
    readonly webhookEnabled: "webhookEnabled";
    readonly webhookVerifiedAt: "webhookVerifiedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LineChannelScalarFieldEnum = (typeof LineChannelScalarFieldEnum)[keyof typeof LineChannelScalarFieldEnum];
export declare const CustomerScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly lineUserId: "lineUserId";
    readonly lineDisplayName: "lineDisplayName";
    readonly linePictureUrl: "linePictureUrl";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly customerId: "customerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly senderType: "senderType";
    readonly content: "content";
    readonly rawPayload: "rawPayload";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly sku: "sku";
    readonly name: "name";
    readonly category: "category";
    readonly description: "description";
    readonly basePrice: "basePrice";
    readonly isActive: "isActive";
    readonly sourceType: "sourceType";
    readonly sourceRef: "sourceRef";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductVariantScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly productId: "productId";
    readonly variantSku: "variantSku";
    readonly color: "color";
    readonly size: "size";
    readonly price: "price";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];
export declare const OrderDraftScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly customerId: "customerId";
    readonly conversationId: "conversationId";
    readonly status: "status";
    readonly source: "source";
    readonly llmConfidence: "llmConfidence";
    readonly needsHumanReview: "needsHumanReview";
    readonly missingFields: "missingFields";
    readonly summaryForStaff: "summaryForStaff";
    readonly replySuggestion: "replySuggestion";
    readonly rawLlMOutput: "rawLlMOutput";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderDraftScalarFieldEnum = (typeof OrderDraftScalarFieldEnum)[keyof typeof OrderDraftScalarFieldEnum];
export declare const OrderDraftItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly orderDraftId: "orderDraftId";
    readonly matchedProductId: "matchedProductId";
    readonly matchedVariantId: "matchedVariantId";
    readonly rawText: "rawText";
    readonly name: "name";
    readonly color: "color";
    readonly size: "size";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly isFuzzy: "isFuzzy";
    readonly fuzzyReason: "fuzzyReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderDraftItemScalarFieldEnum = (typeof OrderDraftItemScalarFieldEnum)[keyof typeof OrderDraftItemScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly orderDraftId: "orderDraftId";
    readonly customerId: "customerId";
    readonly status: "status";
    readonly recipientName: "recipientName";
    readonly recipientPhone: "recipientPhone";
    readonly recipientAddress: "recipientAddress";
    readonly deliveryMethod: "deliveryMethod";
    readonly deliveryNote: "deliveryNote";
    readonly paymentMethod: "paymentMethod";
    readonly paymentStatus: "paymentStatus";
    readonly paymentLastFiveDigits: "paymentLastFiveDigits";
    readonly paymentNote: "paymentNote";
    readonly staffNote: "staffNote";
    readonly confirmedByUserId: "confirmedByUserId";
    readonly confirmedAt: "confirmedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly variantId: "variantId";
    readonly rawText: "rawText";
    readonly name: "name";
    readonly color: "color";
    readonly size: "size";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly lineTotal: "lineTotal";
    readonly isFuzzy: "isFuzzy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const NotificationTargetScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly lineUserId: "lineUserId";
    readonly email: "email";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationTargetScalarFieldEnum = (typeof NotificationTargetScalarFieldEnum)[keyof typeof NotificationTargetScalarFieldEnum];
export declare const StoreSettingScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly storeName: "storeName";
    readonly paymentMethods: "paymentMethods";
    readonly deliveryMethods: "deliveryMethods";
    readonly customerGreeting: "customerGreeting";
    readonly orderConfirmTemplate: "orderConfirmTemplate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type StoreSettingScalarFieldEnum = (typeof StoreSettingScalarFieldEnum)[keyof typeof StoreSettingScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly userId: "userId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: any;
    readonly JsonNull: any;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: any;
    readonly JsonNull: any;
    readonly AnyNull: any;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map