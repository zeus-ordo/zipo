import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Tenant
 *
 */
export type TenantModel = runtime.Types.Result.DefaultSelection<Prisma.$TenantPayload>;
export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null;
    _min: TenantMinAggregateOutputType | null;
    _max: TenantMaxAggregateOutputType | null;
};
export type TenantMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TenantMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TenantCountAggregateOutputType = {
    id: number;
    name: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TenantMinAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TenantMaxAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TenantCountAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TenantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: Prisma.TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType;
};
export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
    [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTenant[P]> : Prisma.GetScalarType<T[P], AggregateTenant[P]>;
};
export type TenantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithAggregationInput | Prisma.TenantOrderByWithAggregationInput[];
    by: Prisma.TenantScalarFieldEnum[] | Prisma.TenantScalarFieldEnum;
    having?: Prisma.TenantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TenantCountAggregateInputType | true;
    _min?: TenantMinAggregateInputType;
    _max?: TenantMaxAggregateInputType;
};
export type TenantGroupByOutputType = {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: TenantCountAggregateOutputType | null;
    _min: TenantMinAggregateOutputType | null;
    _max: TenantMaxAggregateOutputType | null;
};
export type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TenantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TenantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TenantGroupByOutputType[P]>;
}>>;
export type TenantWhereInput = {
    AND?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    OR?: Prisma.TenantWhereInput[];
    NOT?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    id?: Prisma.StringFilter<"Tenant"> | string;
    name?: Prisma.StringFilter<"Tenant"> | string;
    isActive?: Prisma.BoolFilter<"Tenant"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    users?: Prisma.UserListRelationFilter;
    lineChannels?: Prisma.LineChannelListRelationFilter;
    customers?: Prisma.CustomerListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    products?: Prisma.ProductListRelationFilter;
    productVariants?: Prisma.ProductVariantListRelationFilter;
    orderDrafts?: Prisma.OrderDraftListRelationFilter;
    orderDraftItems?: Prisma.OrderDraftItemListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    orderItems?: Prisma.OrderItemListRelationFilter;
    notificationTargets?: Prisma.NotificationTargetListRelationFilter;
    storeSettings?: Prisma.StoreSettingListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
};
export type TenantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    users?: Prisma.UserOrderByRelationAggregateInput;
    lineChannels?: Prisma.LineChannelOrderByRelationAggregateInput;
    customers?: Prisma.CustomerOrderByRelationAggregateInput;
    conversations?: Prisma.ConversationOrderByRelationAggregateInput;
    products?: Prisma.ProductOrderByRelationAggregateInput;
    productVariants?: Prisma.ProductVariantOrderByRelationAggregateInput;
    orderDrafts?: Prisma.OrderDraftOrderByRelationAggregateInput;
    orderDraftItems?: Prisma.OrderDraftItemOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    orderItems?: Prisma.OrderItemOrderByRelationAggregateInput;
    notificationTargets?: Prisma.NotificationTargetOrderByRelationAggregateInput;
    storeSettings?: Prisma.StoreSettingOrderByRelationAggregateInput;
    auditLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
};
export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    OR?: Prisma.TenantWhereInput[];
    NOT?: Prisma.TenantWhereInput | Prisma.TenantWhereInput[];
    name?: Prisma.StringFilter<"Tenant"> | string;
    isActive?: Prisma.BoolFilter<"Tenant"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Tenant"> | Date | string;
    users?: Prisma.UserListRelationFilter;
    lineChannels?: Prisma.LineChannelListRelationFilter;
    customers?: Prisma.CustomerListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    products?: Prisma.ProductListRelationFilter;
    productVariants?: Prisma.ProductVariantListRelationFilter;
    orderDrafts?: Prisma.OrderDraftListRelationFilter;
    orderDraftItems?: Prisma.OrderDraftItemListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    orderItems?: Prisma.OrderItemListRelationFilter;
    notificationTargets?: Prisma.NotificationTargetListRelationFilter;
    storeSettings?: Prisma.StoreSettingListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
}, "id">;
export type TenantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TenantCountOrderByAggregateInput;
    _max?: Prisma.TenantMaxOrderByAggregateInput;
    _min?: Prisma.TenantMinOrderByAggregateInput;
};
export type TenantScalarWhereWithAggregatesInput = {
    AND?: Prisma.TenantScalarWhereWithAggregatesInput | Prisma.TenantScalarWhereWithAggregatesInput[];
    OR?: Prisma.TenantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TenantScalarWhereWithAggregatesInput | Prisma.TenantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Tenant"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Tenant"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Tenant"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Tenant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Tenant"> | Date | string;
};
export type TenantCreateInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateManyInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TenantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TenantNullableScalarRelationFilter = {
    is?: Prisma.TenantWhereInput | null;
    isNot?: Prisma.TenantWhereInput | null;
};
export type TenantScalarRelationFilter = {
    is?: Prisma.TenantWhereInput;
    isNot?: Prisma.TenantWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type TenantCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutUsersInput, Prisma.TenantUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutUsersInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutUsersInput, Prisma.TenantUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.TenantUpsertWithoutUsersInput;
    disconnect?: Prisma.TenantWhereInput | boolean;
    delete?: Prisma.TenantWhereInput | boolean;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutUsersInput, Prisma.TenantUpdateWithoutUsersInput>, Prisma.TenantUncheckedUpdateWithoutUsersInput>;
};
export type TenantCreateNestedOneWithoutLineChannelsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutLineChannelsInput, Prisma.TenantUncheckedCreateWithoutLineChannelsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutLineChannelsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutLineChannelsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutLineChannelsInput, Prisma.TenantUncheckedCreateWithoutLineChannelsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutLineChannelsInput;
    upsert?: Prisma.TenantUpsertWithoutLineChannelsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutLineChannelsInput, Prisma.TenantUpdateWithoutLineChannelsInput>, Prisma.TenantUncheckedUpdateWithoutLineChannelsInput>;
};
export type TenantCreateNestedOneWithoutCustomersInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutCustomersInput, Prisma.TenantUncheckedCreateWithoutCustomersInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutCustomersInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutCustomersNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutCustomersInput, Prisma.TenantUncheckedCreateWithoutCustomersInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutCustomersInput;
    upsert?: Prisma.TenantUpsertWithoutCustomersInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutCustomersInput, Prisma.TenantUpdateWithoutCustomersInput>, Prisma.TenantUncheckedUpdateWithoutCustomersInput>;
};
export type TenantCreateNestedOneWithoutConversationsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutConversationsInput, Prisma.TenantUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutConversationsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutConversationsInput, Prisma.TenantUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutConversationsInput;
    upsert?: Prisma.TenantUpsertWithoutConversationsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutConversationsInput, Prisma.TenantUpdateWithoutConversationsInput>, Prisma.TenantUncheckedUpdateWithoutConversationsInput>;
};
export type TenantCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutProductsInput, Prisma.TenantUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutProductsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutProductsInput, Prisma.TenantUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.TenantUpsertWithoutProductsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutProductsInput, Prisma.TenantUpdateWithoutProductsInput>, Prisma.TenantUncheckedUpdateWithoutProductsInput>;
};
export type TenantCreateNestedOneWithoutProductVariantsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutProductVariantsInput, Prisma.TenantUncheckedCreateWithoutProductVariantsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutProductVariantsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutProductVariantsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutProductVariantsInput, Prisma.TenantUncheckedCreateWithoutProductVariantsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutProductVariantsInput;
    upsert?: Prisma.TenantUpsertWithoutProductVariantsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutProductVariantsInput, Prisma.TenantUpdateWithoutProductVariantsInput>, Prisma.TenantUncheckedUpdateWithoutProductVariantsInput>;
};
export type TenantCreateNestedOneWithoutOrderDraftsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrderDraftsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutOrderDraftsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrderDraftsInput;
    upsert?: Prisma.TenantUpsertWithoutOrderDraftsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutOrderDraftsInput, Prisma.TenantUpdateWithoutOrderDraftsInput>, Prisma.TenantUncheckedUpdateWithoutOrderDraftsInput>;
};
export type TenantCreateNestedOneWithoutOrderDraftItemsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftItemsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftItemsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrderDraftItemsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutOrderDraftItemsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftItemsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftItemsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrderDraftItemsInput;
    upsert?: Prisma.TenantUpsertWithoutOrderDraftItemsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutOrderDraftItemsInput, Prisma.TenantUpdateWithoutOrderDraftItemsInput>, Prisma.TenantUncheckedUpdateWithoutOrderDraftItemsInput>;
};
export type TenantCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrdersInput, Prisma.TenantUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrdersInput, Prisma.TenantUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.TenantUpsertWithoutOrdersInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutOrdersInput, Prisma.TenantUpdateWithoutOrdersInput>, Prisma.TenantUncheckedUpdateWithoutOrdersInput>;
};
export type TenantCreateNestedOneWithoutOrderItemsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrderItemsInput, Prisma.TenantUncheckedCreateWithoutOrderItemsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrderItemsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutOrderItemsInput, Prisma.TenantUncheckedCreateWithoutOrderItemsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutOrderItemsInput;
    upsert?: Prisma.TenantUpsertWithoutOrderItemsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutOrderItemsInput, Prisma.TenantUpdateWithoutOrderItemsInput>, Prisma.TenantUncheckedUpdateWithoutOrderItemsInput>;
};
export type TenantCreateNestedOneWithoutNotificationTargetsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutNotificationTargetsInput, Prisma.TenantUncheckedCreateWithoutNotificationTargetsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutNotificationTargetsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutNotificationTargetsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutNotificationTargetsInput, Prisma.TenantUncheckedCreateWithoutNotificationTargetsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutNotificationTargetsInput;
    upsert?: Prisma.TenantUpsertWithoutNotificationTargetsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutNotificationTargetsInput, Prisma.TenantUpdateWithoutNotificationTargetsInput>, Prisma.TenantUncheckedUpdateWithoutNotificationTargetsInput>;
};
export type TenantCreateNestedOneWithoutStoreSettingsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutStoreSettingsInput, Prisma.TenantUncheckedCreateWithoutStoreSettingsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutStoreSettingsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneRequiredWithoutStoreSettingsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutStoreSettingsInput, Prisma.TenantUncheckedCreateWithoutStoreSettingsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutStoreSettingsInput;
    upsert?: Prisma.TenantUpsertWithoutStoreSettingsInput;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutStoreSettingsInput, Prisma.TenantUpdateWithoutStoreSettingsInput>, Prisma.TenantUncheckedUpdateWithoutStoreSettingsInput>;
};
export type TenantCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.TenantWhereUniqueInput;
};
export type TenantUpdateOneWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TenantCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.TenantUpsertWithoutAuditLogsInput;
    disconnect?: Prisma.TenantWhereInput | boolean;
    delete?: Prisma.TenantWhereInput | boolean;
    connect?: Prisma.TenantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TenantUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.TenantUpdateWithoutAuditLogsInput>, Prisma.TenantUncheckedUpdateWithoutAuditLogsInput>;
};
export type TenantCreateWithoutUsersInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutUsersInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutUsersInput, Prisma.TenantUncheckedCreateWithoutUsersInput>;
};
export type TenantUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutUsersInput, Prisma.TenantUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutUsersInput, Prisma.TenantUncheckedCreateWithoutUsersInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutUsersInput, Prisma.TenantUncheckedUpdateWithoutUsersInput>;
};
export type TenantUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutLineChannelsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutLineChannelsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutLineChannelsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutLineChannelsInput, Prisma.TenantUncheckedCreateWithoutLineChannelsInput>;
};
export type TenantUpsertWithoutLineChannelsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutLineChannelsInput, Prisma.TenantUncheckedUpdateWithoutLineChannelsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutLineChannelsInput, Prisma.TenantUncheckedCreateWithoutLineChannelsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutLineChannelsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutLineChannelsInput, Prisma.TenantUncheckedUpdateWithoutLineChannelsInput>;
};
export type TenantUpdateWithoutLineChannelsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutLineChannelsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutCustomersInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutCustomersInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutCustomersInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutCustomersInput, Prisma.TenantUncheckedCreateWithoutCustomersInput>;
};
export type TenantUpsertWithoutCustomersInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutCustomersInput, Prisma.TenantUncheckedUpdateWithoutCustomersInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutCustomersInput, Prisma.TenantUncheckedCreateWithoutCustomersInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutCustomersInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutCustomersInput, Prisma.TenantUncheckedUpdateWithoutCustomersInput>;
};
export type TenantUpdateWithoutCustomersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutCustomersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutConversationsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutConversationsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutConversationsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutConversationsInput, Prisma.TenantUncheckedCreateWithoutConversationsInput>;
};
export type TenantUpsertWithoutConversationsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutConversationsInput, Prisma.TenantUncheckedUpdateWithoutConversationsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutConversationsInput, Prisma.TenantUncheckedCreateWithoutConversationsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutConversationsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutConversationsInput, Prisma.TenantUncheckedUpdateWithoutConversationsInput>;
};
export type TenantUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutProductsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutProductsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutProductsInput, Prisma.TenantUncheckedCreateWithoutProductsInput>;
};
export type TenantUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutProductsInput, Prisma.TenantUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutProductsInput, Prisma.TenantUncheckedCreateWithoutProductsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutProductsInput, Prisma.TenantUncheckedUpdateWithoutProductsInput>;
};
export type TenantUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutProductVariantsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutProductVariantsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutProductVariantsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutProductVariantsInput, Prisma.TenantUncheckedCreateWithoutProductVariantsInput>;
};
export type TenantUpsertWithoutProductVariantsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutProductVariantsInput, Prisma.TenantUncheckedUpdateWithoutProductVariantsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutProductVariantsInput, Prisma.TenantUncheckedCreateWithoutProductVariantsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutProductVariantsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutProductVariantsInput, Prisma.TenantUncheckedUpdateWithoutProductVariantsInput>;
};
export type TenantUpdateWithoutProductVariantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutProductVariantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutOrderDraftsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutOrderDraftsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutOrderDraftsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftsInput>;
};
export type TenantUpsertWithoutOrderDraftsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutOrderDraftsInput, Prisma.TenantUncheckedUpdateWithoutOrderDraftsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutOrderDraftsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutOrderDraftsInput, Prisma.TenantUncheckedUpdateWithoutOrderDraftsInput>;
};
export type TenantUpdateWithoutOrderDraftsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutOrderDraftsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutOrderDraftItemsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutOrderDraftItemsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutOrderDraftItemsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftItemsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftItemsInput>;
};
export type TenantUpsertWithoutOrderDraftItemsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutOrderDraftItemsInput, Prisma.TenantUncheckedUpdateWithoutOrderDraftItemsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrderDraftItemsInput, Prisma.TenantUncheckedCreateWithoutOrderDraftItemsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutOrderDraftItemsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutOrderDraftItemsInput, Prisma.TenantUncheckedUpdateWithoutOrderDraftItemsInput>;
};
export type TenantUpdateWithoutOrderDraftItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutOrderDraftItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutOrdersInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrdersInput, Prisma.TenantUncheckedCreateWithoutOrdersInput>;
};
export type TenantUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutOrdersInput, Prisma.TenantUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrdersInput, Prisma.TenantUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutOrdersInput, Prisma.TenantUncheckedUpdateWithoutOrdersInput>;
};
export type TenantUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutOrderItemsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrderItemsInput, Prisma.TenantUncheckedCreateWithoutOrderItemsInput>;
};
export type TenantUpsertWithoutOrderItemsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutOrderItemsInput, Prisma.TenantUncheckedUpdateWithoutOrderItemsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutOrderItemsInput, Prisma.TenantUncheckedCreateWithoutOrderItemsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutOrderItemsInput, Prisma.TenantUncheckedUpdateWithoutOrderItemsInput>;
};
export type TenantUpdateWithoutOrderItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutOrderItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutNotificationTargetsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutNotificationTargetsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutNotificationTargetsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutNotificationTargetsInput, Prisma.TenantUncheckedCreateWithoutNotificationTargetsInput>;
};
export type TenantUpsertWithoutNotificationTargetsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutNotificationTargetsInput, Prisma.TenantUncheckedUpdateWithoutNotificationTargetsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutNotificationTargetsInput, Prisma.TenantUncheckedCreateWithoutNotificationTargetsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutNotificationTargetsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutNotificationTargetsInput, Prisma.TenantUncheckedUpdateWithoutNotificationTargetsInput>;
};
export type TenantUpdateWithoutNotificationTargetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutNotificationTargetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutStoreSettingsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutStoreSettingsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutStoreSettingsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutStoreSettingsInput, Prisma.TenantUncheckedCreateWithoutStoreSettingsInput>;
};
export type TenantUpsertWithoutStoreSettingsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutStoreSettingsInput, Prisma.TenantUncheckedUpdateWithoutStoreSettingsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutStoreSettingsInput, Prisma.TenantUncheckedCreateWithoutStoreSettingsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutStoreSettingsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutStoreSettingsInput, Prisma.TenantUncheckedUpdateWithoutStoreSettingsInput>;
};
export type TenantUpdateWithoutStoreSettingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutStoreSettingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutTenantNestedInput;
};
export type TenantCreateWithoutAuditLogsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingCreateNestedManyWithoutTenantInput;
};
export type TenantUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutTenantInput;
    lineChannels?: Prisma.LineChannelUncheckedCreateNestedManyWithoutTenantInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutTenantInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutTenantInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutTenantInput;
    productVariants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutTenantInput;
    orderDrafts?: Prisma.OrderDraftUncheckedCreateNestedManyWithoutTenantInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTenantInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutTenantInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedCreateNestedManyWithoutTenantInput;
    storeSettings?: Prisma.StoreSettingUncheckedCreateNestedManyWithoutTenantInput;
};
export type TenantCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.TenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
};
export type TenantUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.TenantUpdateWithoutAuditLogsInput, Prisma.TenantUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.TenantCreateWithoutAuditLogsInput, Prisma.TenantUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.TenantWhereInput;
};
export type TenantUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.TenantWhereInput;
    data: Prisma.XOR<Prisma.TenantUpdateWithoutAuditLogsInput, Prisma.TenantUncheckedUpdateWithoutAuditLogsInput>;
};
export type TenantUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUpdateManyWithoutTenantNestedInput;
};
export type TenantUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput;
    lineChannels?: Prisma.LineChannelUncheckedUpdateManyWithoutTenantNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutTenantNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutTenantNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutTenantNestedInput;
    productVariants?: Prisma.ProductVariantUncheckedUpdateManyWithoutTenantNestedInput;
    orderDrafts?: Prisma.OrderDraftUncheckedUpdateManyWithoutTenantNestedInput;
    orderDraftItems?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTenantNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutTenantNestedInput;
    notificationTargets?: Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput;
    storeSettings?: Prisma.StoreSettingUncheckedUpdateManyWithoutTenantNestedInput;
};
/**
 * Count Type TenantCountOutputType
 */
export type TenantCountOutputType = {
    users: number;
    lineChannels: number;
    customers: number;
    conversations: number;
    products: number;
    productVariants: number;
    orderDrafts: number;
    orderDraftItems: number;
    orders: number;
    orderItems: number;
    notificationTargets: number;
    storeSettings: number;
    auditLogs: number;
};
export type TenantCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | TenantCountOutputTypeCountUsersArgs;
    lineChannels?: boolean | TenantCountOutputTypeCountLineChannelsArgs;
    customers?: boolean | TenantCountOutputTypeCountCustomersArgs;
    conversations?: boolean | TenantCountOutputTypeCountConversationsArgs;
    products?: boolean | TenantCountOutputTypeCountProductsArgs;
    productVariants?: boolean | TenantCountOutputTypeCountProductVariantsArgs;
    orderDrafts?: boolean | TenantCountOutputTypeCountOrderDraftsArgs;
    orderDraftItems?: boolean | TenantCountOutputTypeCountOrderDraftItemsArgs;
    orders?: boolean | TenantCountOutputTypeCountOrdersArgs;
    orderItems?: boolean | TenantCountOutputTypeCountOrderItemsArgs;
    notificationTargets?: boolean | TenantCountOutputTypeCountNotificationTargetsArgs;
    storeSettings?: boolean | TenantCountOutputTypeCountStoreSettingsArgs;
    auditLogs?: boolean | TenantCountOutputTypeCountAuditLogsArgs;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: Prisma.TenantCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountLineChannelsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LineChannelWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountCustomersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountProductVariantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductVariantWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountOrderDraftsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderDraftWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountOrderDraftItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderDraftItemWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountOrderItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderItemWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountNotificationTargetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationTargetWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountStoreSettingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreSettingWhereInput;
};
/**
 * TenantCountOutputType without action
 */
export type TenantCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
export type TenantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    users?: boolean | Prisma.Tenant$usersArgs<ExtArgs>;
    lineChannels?: boolean | Prisma.Tenant$lineChannelsArgs<ExtArgs>;
    customers?: boolean | Prisma.Tenant$customersArgs<ExtArgs>;
    conversations?: boolean | Prisma.Tenant$conversationsArgs<ExtArgs>;
    products?: boolean | Prisma.Tenant$productsArgs<ExtArgs>;
    productVariants?: boolean | Prisma.Tenant$productVariantsArgs<ExtArgs>;
    orderDrafts?: boolean | Prisma.Tenant$orderDraftsArgs<ExtArgs>;
    orderDraftItems?: boolean | Prisma.Tenant$orderDraftItemsArgs<ExtArgs>;
    orders?: boolean | Prisma.Tenant$ordersArgs<ExtArgs>;
    orderItems?: boolean | Prisma.Tenant$orderItemsArgs<ExtArgs>;
    notificationTargets?: boolean | Prisma.Tenant$notificationTargetsArgs<ExtArgs>;
    storeSettings?: boolean | Prisma.Tenant$storeSettingsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Tenant$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.TenantCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tenant"]>;
export type TenantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["tenant"]>;
export type TenantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["tenant"]>;
export type TenantSelectScalar = {
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TenantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["tenant"]>;
export type TenantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.Tenant$usersArgs<ExtArgs>;
    lineChannels?: boolean | Prisma.Tenant$lineChannelsArgs<ExtArgs>;
    customers?: boolean | Prisma.Tenant$customersArgs<ExtArgs>;
    conversations?: boolean | Prisma.Tenant$conversationsArgs<ExtArgs>;
    products?: boolean | Prisma.Tenant$productsArgs<ExtArgs>;
    productVariants?: boolean | Prisma.Tenant$productVariantsArgs<ExtArgs>;
    orderDrafts?: boolean | Prisma.Tenant$orderDraftsArgs<ExtArgs>;
    orderDraftItems?: boolean | Prisma.Tenant$orderDraftItemsArgs<ExtArgs>;
    orders?: boolean | Prisma.Tenant$ordersArgs<ExtArgs>;
    orderItems?: boolean | Prisma.Tenant$orderItemsArgs<ExtArgs>;
    notificationTargets?: boolean | Prisma.Tenant$notificationTargetsArgs<ExtArgs>;
    storeSettings?: boolean | Prisma.Tenant$storeSettingsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Tenant$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.TenantCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TenantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TenantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TenantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Tenant";
    objects: {
        users: Prisma.$UserPayload<ExtArgs>[];
        lineChannels: Prisma.$LineChannelPayload<ExtArgs>[];
        customers: Prisma.$CustomerPayload<ExtArgs>[];
        conversations: Prisma.$ConversationPayload<ExtArgs>[];
        products: Prisma.$ProductPayload<ExtArgs>[];
        productVariants: Prisma.$ProductVariantPayload<ExtArgs>[];
        orderDrafts: Prisma.$OrderDraftPayload<ExtArgs>[];
        orderDraftItems: Prisma.$OrderDraftItemPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
        notificationTargets: Prisma.$NotificationTargetPayload<ExtArgs>[];
        storeSettings: Prisma.$StoreSettingPayload<ExtArgs>[];
        auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["tenant"]>;
    composites: {};
};
export type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TenantPayload, S>;
export type TenantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TenantCountAggregateInputType | true;
};
export interface TenantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Tenant'];
        meta: {
            name: 'Tenant';
        };
    };
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: Prisma.SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: Prisma.SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     *
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TenantFindManyArgs>(args?: Prisma.SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     *
     */
    create<T extends TenantCreateArgs>(args: Prisma.SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TenantCreateManyArgs>(args?: Prisma.SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     *
     */
    delete<T extends TenantDeleteArgs>(args: Prisma.SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TenantUpdateArgs>(args: Prisma.SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: Prisma.SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TenantUpdateManyArgs>(args: Prisma.SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: Prisma.SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(args?: Prisma.Subset<T, TenantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TenantCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Prisma.Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>;
    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends TenantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TenantGroupByArgs['orderBy'];
    } : {
        orderBy?: TenantGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Tenant model
     */
    readonly fields: TenantFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Tenant.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__TenantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.Tenant$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    lineChannels<T extends Prisma.Tenant$lineChannelsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$lineChannelsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    customers<T extends Prisma.Tenant$customersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$customersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    conversations<T extends Prisma.Tenant$conversationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    products<T extends Prisma.Tenant$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    productVariants<T extends Prisma.Tenant$productVariantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$productVariantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orderDrafts<T extends Prisma.Tenant$orderDraftsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$orderDraftsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orderDraftItems<T extends Prisma.Tenant$orderDraftItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$orderDraftItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.Tenant$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orderItems<T extends Prisma.Tenant$orderItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notificationTargets<T extends Prisma.Tenant$notificationTargetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$notificationTargetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    storeSettings<T extends Prisma.Tenant$storeSettingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$storeSettingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StoreSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditLogs<T extends Prisma.Tenant$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tenant$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Tenant model
 */
export interface TenantFieldRefs {
    readonly id: Prisma.FieldRef<"Tenant", 'String'>;
    readonly name: Prisma.FieldRef<"Tenant", 'String'>;
    readonly isActive: Prisma.FieldRef<"Tenant", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Tenant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Tenant", 'DateTime'>;
}
/**
 * Tenant findUnique
 */
export type TenantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where: Prisma.TenantWhereUniqueInput;
};
/**
 * Tenant findUniqueOrThrow
 */
export type TenantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where: Prisma.TenantWhereUniqueInput;
};
/**
 * Tenant findFirst
 */
export type TenantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where?: Prisma.TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tenants.
     */
    cursor?: Prisma.TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tenants.
     */
    distinct?: Prisma.TenantScalarFieldEnum | Prisma.TenantScalarFieldEnum[];
};
/**
 * Tenant findFirstOrThrow
 */
export type TenantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenant to fetch.
     */
    where?: Prisma.TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tenants.
     */
    cursor?: Prisma.TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tenants.
     */
    distinct?: Prisma.TenantScalarFieldEnum | Prisma.TenantScalarFieldEnum[];
};
/**
 * Tenant findMany
 */
export type TenantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * Filter, which Tenants to fetch.
     */
    where?: Prisma.TenantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Prisma.TenantOrderByWithRelationInput | Prisma.TenantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Tenants.
     */
    cursor?: Prisma.TenantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tenants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tenants.
     */
    distinct?: Prisma.TenantScalarFieldEnum | Prisma.TenantScalarFieldEnum[];
};
/**
 * Tenant create
 */
export type TenantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * The data needed to create a Tenant.
     */
    data: Prisma.XOR<Prisma.TenantCreateInput, Prisma.TenantUncheckedCreateInput>;
};
/**
 * Tenant createMany
 */
export type TenantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: Prisma.TenantCreateManyInput | Prisma.TenantCreateManyInput[];
};
/**
 * Tenant createManyAndReturn
 */
export type TenantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * The data used to create many Tenants.
     */
    data: Prisma.TenantCreateManyInput | Prisma.TenantCreateManyInput[];
};
/**
 * Tenant update
 */
export type TenantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * The data needed to update a Tenant.
     */
    data: Prisma.XOR<Prisma.TenantUpdateInput, Prisma.TenantUncheckedUpdateInput>;
    /**
     * Choose, which Tenant to update.
     */
    where: Prisma.TenantWhereUniqueInput;
};
/**
 * Tenant updateMany
 */
export type TenantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: Prisma.XOR<Prisma.TenantUpdateManyMutationInput, Prisma.TenantUncheckedUpdateManyInput>;
    /**
     * Filter which Tenants to update
     */
    where?: Prisma.TenantWhereInput;
    /**
     * Limit how many Tenants to update.
     */
    limit?: number;
};
/**
 * Tenant updateManyAndReturn
 */
export type TenantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * The data used to update Tenants.
     */
    data: Prisma.XOR<Prisma.TenantUpdateManyMutationInput, Prisma.TenantUncheckedUpdateManyInput>;
    /**
     * Filter which Tenants to update
     */
    where?: Prisma.TenantWhereInput;
    /**
     * Limit how many Tenants to update.
     */
    limit?: number;
};
/**
 * Tenant upsert
 */
export type TenantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: Prisma.TenantWhereUniqueInput;
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: Prisma.XOR<Prisma.TenantCreateInput, Prisma.TenantUncheckedCreateInput>;
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.TenantUpdateInput, Prisma.TenantUncheckedUpdateInput>;
};
/**
 * Tenant delete
 */
export type TenantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
    /**
     * Filter which Tenant to delete.
     */
    where: Prisma.TenantWhereUniqueInput;
};
/**
 * Tenant deleteMany
 */
export type TenantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: Prisma.TenantWhereInput;
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number;
};
/**
 * Tenant.users
 */
export type Tenant$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * Tenant.lineChannels
 */
export type Tenant$lineChannelsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineChannel
     */
    select?: Prisma.LineChannelSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LineChannel
     */
    omit?: Prisma.LineChannelOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LineChannelInclude<ExtArgs> | null;
    where?: Prisma.LineChannelWhereInput;
    orderBy?: Prisma.LineChannelOrderByWithRelationInput | Prisma.LineChannelOrderByWithRelationInput[];
    cursor?: Prisma.LineChannelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LineChannelScalarFieldEnum | Prisma.LineChannelScalarFieldEnum[];
};
/**
 * Tenant.customers
 */
export type Tenant$customersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Customer
     */
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
/**
 * Tenant.conversations
 */
export type Tenant$conversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
/**
 * Tenant.products
 */
export type Tenant$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: Prisma.ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
/**
 * Tenant.productVariants
 */
export type Tenant$productVariantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where?: Prisma.ProductVariantWhereInput;
    orderBy?: Prisma.ProductVariantOrderByWithRelationInput | Prisma.ProductVariantOrderByWithRelationInput[];
    cursor?: Prisma.ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductVariantScalarFieldEnum | Prisma.ProductVariantScalarFieldEnum[];
};
/**
 * Tenant.orderDrafts
 */
export type Tenant$orderDraftsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDraft
     */
    select?: Prisma.OrderDraftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderDraft
     */
    omit?: Prisma.OrderDraftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderDraftInclude<ExtArgs> | null;
    where?: Prisma.OrderDraftWhereInput;
    orderBy?: Prisma.OrderDraftOrderByWithRelationInput | Prisma.OrderDraftOrderByWithRelationInput[];
    cursor?: Prisma.OrderDraftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderDraftScalarFieldEnum | Prisma.OrderDraftScalarFieldEnum[];
};
/**
 * Tenant.orderDraftItems
 */
export type Tenant$orderDraftItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDraftItem
     */
    select?: Prisma.OrderDraftItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderDraftItem
     */
    omit?: Prisma.OrderDraftItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderDraftItemInclude<ExtArgs> | null;
    where?: Prisma.OrderDraftItemWhereInput;
    orderBy?: Prisma.OrderDraftItemOrderByWithRelationInput | Prisma.OrderDraftItemOrderByWithRelationInput[];
    cursor?: Prisma.OrderDraftItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderDraftItemScalarFieldEnum | Prisma.OrderDraftItemScalarFieldEnum[];
};
/**
 * Tenant.orders
 */
export type Tenant$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: Prisma.OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Tenant.orderItems
 */
export type Tenant$orderItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: Prisma.OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: Prisma.OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderItemInclude<ExtArgs> | null;
    where?: Prisma.OrderItemWhereInput;
    orderBy?: Prisma.OrderItemOrderByWithRelationInput | Prisma.OrderItemOrderByWithRelationInput[];
    cursor?: Prisma.OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderItemScalarFieldEnum | Prisma.OrderItemScalarFieldEnum[];
};
/**
 * Tenant.notificationTargets
 */
export type Tenant$notificationTargetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: Prisma.NotificationTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: Prisma.NotificationTargetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationTargetInclude<ExtArgs> | null;
    where?: Prisma.NotificationTargetWhereInput;
    orderBy?: Prisma.NotificationTargetOrderByWithRelationInput | Prisma.NotificationTargetOrderByWithRelationInput[];
    cursor?: Prisma.NotificationTargetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationTargetScalarFieldEnum | Prisma.NotificationTargetScalarFieldEnum[];
};
/**
 * Tenant.storeSettings
 */
export type Tenant$storeSettingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreSetting
     */
    select?: Prisma.StoreSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StoreSetting
     */
    omit?: Prisma.StoreSettingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StoreSettingInclude<ExtArgs> | null;
    where?: Prisma.StoreSettingWhereInput;
    orderBy?: Prisma.StoreSettingOrderByWithRelationInput | Prisma.StoreSettingOrderByWithRelationInput[];
    cursor?: Prisma.StoreSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreSettingScalarFieldEnum | Prisma.StoreSettingScalarFieldEnum[];
};
/**
 * Tenant.auditLogs
 */
export type Tenant$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
/**
 * Tenant without action
 */
export type TenantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: Prisma.TenantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tenant
     */
    omit?: Prisma.TenantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TenantInclude<ExtArgs> | null;
};
//# sourceMappingURL=Tenant.d.ts.map