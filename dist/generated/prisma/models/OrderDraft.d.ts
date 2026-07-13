import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OrderDraft
 *
 */
export type OrderDraftModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderDraftPayload>;
export type AggregateOrderDraft = {
    _count: OrderDraftCountAggregateOutputType | null;
    _avg: OrderDraftAvgAggregateOutputType | null;
    _sum: OrderDraftSumAggregateOutputType | null;
    _min: OrderDraftMinAggregateOutputType | null;
    _max: OrderDraftMaxAggregateOutputType | null;
};
export type OrderDraftAvgAggregateOutputType = {
    llmConfidence: number | null;
};
export type OrderDraftSumAggregateOutputType = {
    llmConfidence: number | null;
};
export type OrderDraftMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    customerId: string | null;
    conversationId: string | null;
    status: string | null;
    source: string | null;
    llmConfidence: number | null;
    needsHumanReview: boolean | null;
    missingFields: string | null;
    summaryForStaff: string | null;
    replySuggestion: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderDraftMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    customerId: string | null;
    conversationId: string | null;
    status: string | null;
    source: string | null;
    llmConfidence: number | null;
    needsHumanReview: boolean | null;
    missingFields: string | null;
    summaryForStaff: string | null;
    replySuggestion: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderDraftCountAggregateOutputType = {
    id: number;
    tenantId: number;
    customerId: number;
    conversationId: number;
    status: number;
    source: number;
    llmConfidence: number;
    needsHumanReview: number;
    missingFields: number;
    summaryForStaff: number;
    replySuggestion: number;
    rawLlMOutput: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OrderDraftAvgAggregateInputType = {
    llmConfidence?: true;
};
export type OrderDraftSumAggregateInputType = {
    llmConfidence?: true;
};
export type OrderDraftMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    customerId?: true;
    conversationId?: true;
    status?: true;
    source?: true;
    llmConfidence?: true;
    needsHumanReview?: true;
    missingFields?: true;
    summaryForStaff?: true;
    replySuggestion?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderDraftMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    customerId?: true;
    conversationId?: true;
    status?: true;
    source?: true;
    llmConfidence?: true;
    needsHumanReview?: true;
    missingFields?: true;
    summaryForStaff?: true;
    replySuggestion?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderDraftCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    customerId?: true;
    conversationId?: true;
    status?: true;
    source?: true;
    llmConfidence?: true;
    needsHumanReview?: true;
    missingFields?: true;
    summaryForStaff?: true;
    replySuggestion?: true;
    rawLlMOutput?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OrderDraftAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OrderDraft to aggregate.
     */
    where?: Prisma.OrderDraftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDrafts to fetch.
     */
    orderBy?: Prisma.OrderDraftOrderByWithRelationInput | Prisma.OrderDraftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OrderDraftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDrafts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDrafts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderDrafts
    **/
    _count?: true | OrderDraftCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: OrderDraftAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: OrderDraftSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OrderDraftMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OrderDraftMaxAggregateInputType;
};
export type GetOrderDraftAggregateType<T extends OrderDraftAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderDraft]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderDraft[P]> : Prisma.GetScalarType<T[P], AggregateOrderDraft[P]>;
};
export type OrderDraftGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderDraftWhereInput;
    orderBy?: Prisma.OrderDraftOrderByWithAggregationInput | Prisma.OrderDraftOrderByWithAggregationInput[];
    by: Prisma.OrderDraftScalarFieldEnum[] | Prisma.OrderDraftScalarFieldEnum;
    having?: Prisma.OrderDraftScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderDraftCountAggregateInputType | true;
    _avg?: OrderDraftAvgAggregateInputType;
    _sum?: OrderDraftSumAggregateInputType;
    _min?: OrderDraftMinAggregateInputType;
    _max?: OrderDraftMaxAggregateInputType;
};
export type OrderDraftGroupByOutputType = {
    id: string;
    tenantId: string;
    customerId: string;
    conversationId: string;
    status: string;
    source: string;
    llmConfidence: number | null;
    needsHumanReview: boolean;
    missingFields: string;
    summaryForStaff: string | null;
    replySuggestion: string | null;
    rawLlMOutput: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OrderDraftCountAggregateOutputType | null;
    _avg: OrderDraftAvgAggregateOutputType | null;
    _sum: OrderDraftSumAggregateOutputType | null;
    _min: OrderDraftMinAggregateOutputType | null;
    _max: OrderDraftMaxAggregateOutputType | null;
};
export type GetOrderDraftGroupByPayload<T extends OrderDraftGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderDraftGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderDraftGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderDraftGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderDraftGroupByOutputType[P]>;
}>>;
export type OrderDraftWhereInput = {
    AND?: Prisma.OrderDraftWhereInput | Prisma.OrderDraftWhereInput[];
    OR?: Prisma.OrderDraftWhereInput[];
    NOT?: Prisma.OrderDraftWhereInput | Prisma.OrderDraftWhereInput[];
    id?: Prisma.StringFilter<"OrderDraft"> | string;
    tenantId?: Prisma.StringFilter<"OrderDraft"> | string;
    customerId?: Prisma.StringFilter<"OrderDraft"> | string;
    conversationId?: Prisma.StringFilter<"OrderDraft"> | string;
    status?: Prisma.StringFilter<"OrderDraft"> | string;
    source?: Prisma.StringFilter<"OrderDraft"> | string;
    llmConfidence?: Prisma.FloatNullableFilter<"OrderDraft"> | number | null;
    needsHumanReview?: Prisma.BoolFilter<"OrderDraft"> | boolean;
    missingFields?: Prisma.StringFilter<"OrderDraft"> | string;
    summaryForStaff?: Prisma.StringNullableFilter<"OrderDraft"> | string | null;
    replySuggestion?: Prisma.StringNullableFilter<"OrderDraft"> | string | null;
    rawLlMOutput?: Prisma.JsonNullableFilter<"OrderDraft">;
    createdAt?: Prisma.DateTimeFilter<"OrderDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderDraft"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    items?: Prisma.OrderDraftItemListRelationFilter;
    order?: Prisma.XOR<Prisma.OrderNullableScalarRelationFilter, Prisma.OrderWhereInput> | null;
};
export type OrderDraftOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    llmConfidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    needsHumanReview?: Prisma.SortOrder;
    missingFields?: Prisma.SortOrder;
    summaryForStaff?: Prisma.SortOrderInput | Prisma.SortOrder;
    replySuggestion?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawLlMOutput?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    conversation?: Prisma.ConversationOrderByWithRelationInput;
    items?: Prisma.OrderDraftItemOrderByRelationAggregateInput;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type OrderDraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OrderDraftWhereInput | Prisma.OrderDraftWhereInput[];
    OR?: Prisma.OrderDraftWhereInput[];
    NOT?: Prisma.OrderDraftWhereInput | Prisma.OrderDraftWhereInput[];
    tenantId?: Prisma.StringFilter<"OrderDraft"> | string;
    customerId?: Prisma.StringFilter<"OrderDraft"> | string;
    conversationId?: Prisma.StringFilter<"OrderDraft"> | string;
    status?: Prisma.StringFilter<"OrderDraft"> | string;
    source?: Prisma.StringFilter<"OrderDraft"> | string;
    llmConfidence?: Prisma.FloatNullableFilter<"OrderDraft"> | number | null;
    needsHumanReview?: Prisma.BoolFilter<"OrderDraft"> | boolean;
    missingFields?: Prisma.StringFilter<"OrderDraft"> | string;
    summaryForStaff?: Prisma.StringNullableFilter<"OrderDraft"> | string | null;
    replySuggestion?: Prisma.StringNullableFilter<"OrderDraft"> | string | null;
    rawLlMOutput?: Prisma.JsonNullableFilter<"OrderDraft">;
    createdAt?: Prisma.DateTimeFilter<"OrderDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderDraft"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    items?: Prisma.OrderDraftItemListRelationFilter;
    order?: Prisma.XOR<Prisma.OrderNullableScalarRelationFilter, Prisma.OrderWhereInput> | null;
}, "id">;
export type OrderDraftOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    llmConfidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    needsHumanReview?: Prisma.SortOrder;
    missingFields?: Prisma.SortOrder;
    summaryForStaff?: Prisma.SortOrderInput | Prisma.SortOrder;
    replySuggestion?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawLlMOutput?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OrderDraftCountOrderByAggregateInput;
    _avg?: Prisma.OrderDraftAvgOrderByAggregateInput;
    _max?: Prisma.OrderDraftMaxOrderByAggregateInput;
    _min?: Prisma.OrderDraftMinOrderByAggregateInput;
    _sum?: Prisma.OrderDraftSumOrderByAggregateInput;
};
export type OrderDraftScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderDraftScalarWhereWithAggregatesInput | Prisma.OrderDraftScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderDraftScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderDraftScalarWhereWithAggregatesInput | Prisma.OrderDraftScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OrderDraft"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"OrderDraft"> | string;
    customerId?: Prisma.StringWithAggregatesFilter<"OrderDraft"> | string;
    conversationId?: Prisma.StringWithAggregatesFilter<"OrderDraft"> | string;
    status?: Prisma.StringWithAggregatesFilter<"OrderDraft"> | string;
    source?: Prisma.StringWithAggregatesFilter<"OrderDraft"> | string;
    llmConfidence?: Prisma.FloatNullableWithAggregatesFilter<"OrderDraft"> | number | null;
    needsHumanReview?: Prisma.BoolWithAggregatesFilter<"OrderDraft"> | boolean;
    missingFields?: Prisma.StringWithAggregatesFilter<"OrderDraft"> | string;
    summaryForStaff?: Prisma.StringNullableWithAggregatesFilter<"OrderDraft"> | string | null;
    replySuggestion?: Prisma.StringNullableWithAggregatesFilter<"OrderDraft"> | string | null;
    rawLlMOutput?: Prisma.JsonNullableWithAggregatesFilter<"OrderDraft">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OrderDraft"> | Date | string;
};
export type OrderDraftCreateInput = {
    id?: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftsInput;
    customer: Prisma.CustomerCreateNestedOneWithoutOrderDraftsInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutOrderDraftsInput;
    items?: Prisma.OrderDraftItemCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    customerId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderUncheckedCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftsNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutOrderDraftsNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutOrderDraftsNestedInput;
    items?: Prisma.OrderDraftItemUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUncheckedUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftCreateManyInput = {
    id?: string;
    tenantId: string;
    customerId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftListRelationFilter = {
    every?: Prisma.OrderDraftWhereInput;
    some?: Prisma.OrderDraftWhereInput;
    none?: Prisma.OrderDraftWhereInput;
};
export type OrderDraftOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderDraftCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    llmConfidence?: Prisma.SortOrder;
    needsHumanReview?: Prisma.SortOrder;
    missingFields?: Prisma.SortOrder;
    summaryForStaff?: Prisma.SortOrder;
    replySuggestion?: Prisma.SortOrder;
    rawLlMOutput?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderDraftAvgOrderByAggregateInput = {
    llmConfidence?: Prisma.SortOrder;
};
export type OrderDraftMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    llmConfidence?: Prisma.SortOrder;
    needsHumanReview?: Prisma.SortOrder;
    missingFields?: Prisma.SortOrder;
    summaryForStaff?: Prisma.SortOrder;
    replySuggestion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderDraftMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    llmConfidence?: Prisma.SortOrder;
    needsHumanReview?: Prisma.SortOrder;
    missingFields?: Prisma.SortOrder;
    summaryForStaff?: Prisma.SortOrder;
    replySuggestion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderDraftSumOrderByAggregateInput = {
    llmConfidence?: Prisma.SortOrder;
};
export type OrderDraftScalarRelationFilter = {
    is?: Prisma.OrderDraftWhereInput;
    isNot?: Prisma.OrderDraftWhereInput;
};
export type OrderDraftNullableScalarRelationFilter = {
    is?: Prisma.OrderDraftWhereInput | null;
    isNot?: Prisma.OrderDraftWhereInput | null;
};
export type OrderDraftCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutTenantInput, Prisma.OrderDraftUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftCreateWithoutTenantInput[] | Prisma.OrderDraftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutTenantInput | Prisma.OrderDraftCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.OrderDraftCreateManyTenantInputEnvelope;
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
};
export type OrderDraftUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutTenantInput, Prisma.OrderDraftUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftCreateWithoutTenantInput[] | Prisma.OrderDraftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutTenantInput | Prisma.OrderDraftCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.OrderDraftCreateManyTenantInputEnvelope;
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
};
export type OrderDraftUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutTenantInput, Prisma.OrderDraftUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftCreateWithoutTenantInput[] | Prisma.OrderDraftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutTenantInput | Prisma.OrderDraftCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.OrderDraftUpsertWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.OrderDraftCreateManyTenantInputEnvelope;
    set?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    delete?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    update?: Prisma.OrderDraftUpdateWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.OrderDraftUpdateManyWithWhereWithoutTenantInput | Prisma.OrderDraftUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
};
export type OrderDraftUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutTenantInput, Prisma.OrderDraftUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftCreateWithoutTenantInput[] | Prisma.OrderDraftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutTenantInput | Prisma.OrderDraftCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.OrderDraftUpsertWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.OrderDraftCreateManyTenantInputEnvelope;
    set?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    delete?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    update?: Prisma.OrderDraftUpdateWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.OrderDraftUpdateManyWithWhereWithoutTenantInput | Prisma.OrderDraftUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
};
export type OrderDraftCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutCustomerInput, Prisma.OrderDraftUncheckedCreateWithoutCustomerInput> | Prisma.OrderDraftCreateWithoutCustomerInput[] | Prisma.OrderDraftUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutCustomerInput | Prisma.OrderDraftCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.OrderDraftCreateManyCustomerInputEnvelope;
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
};
export type OrderDraftUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutCustomerInput, Prisma.OrderDraftUncheckedCreateWithoutCustomerInput> | Prisma.OrderDraftCreateWithoutCustomerInput[] | Prisma.OrderDraftUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutCustomerInput | Prisma.OrderDraftCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.OrderDraftCreateManyCustomerInputEnvelope;
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
};
export type OrderDraftUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutCustomerInput, Prisma.OrderDraftUncheckedCreateWithoutCustomerInput> | Prisma.OrderDraftCreateWithoutCustomerInput[] | Prisma.OrderDraftUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutCustomerInput | Prisma.OrderDraftCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.OrderDraftUpsertWithWhereUniqueWithoutCustomerInput | Prisma.OrderDraftUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.OrderDraftCreateManyCustomerInputEnvelope;
    set?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    delete?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    update?: Prisma.OrderDraftUpdateWithWhereUniqueWithoutCustomerInput | Prisma.OrderDraftUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.OrderDraftUpdateManyWithWhereWithoutCustomerInput | Prisma.OrderDraftUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
};
export type OrderDraftUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutCustomerInput, Prisma.OrderDraftUncheckedCreateWithoutCustomerInput> | Prisma.OrderDraftCreateWithoutCustomerInput[] | Prisma.OrderDraftUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutCustomerInput | Prisma.OrderDraftCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.OrderDraftUpsertWithWhereUniqueWithoutCustomerInput | Prisma.OrderDraftUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.OrderDraftCreateManyCustomerInputEnvelope;
    set?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    delete?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    update?: Prisma.OrderDraftUpdateWithWhereUniqueWithoutCustomerInput | Prisma.OrderDraftUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.OrderDraftUpdateManyWithWhereWithoutCustomerInput | Prisma.OrderDraftUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
};
export type OrderDraftCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutConversationInput, Prisma.OrderDraftUncheckedCreateWithoutConversationInput> | Prisma.OrderDraftCreateWithoutConversationInput[] | Prisma.OrderDraftUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutConversationInput | Prisma.OrderDraftCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.OrderDraftCreateManyConversationInputEnvelope;
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
};
export type OrderDraftUncheckedCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutConversationInput, Prisma.OrderDraftUncheckedCreateWithoutConversationInput> | Prisma.OrderDraftCreateWithoutConversationInput[] | Prisma.OrderDraftUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutConversationInput | Prisma.OrderDraftCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.OrderDraftCreateManyConversationInputEnvelope;
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
};
export type OrderDraftUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutConversationInput, Prisma.OrderDraftUncheckedCreateWithoutConversationInput> | Prisma.OrderDraftCreateWithoutConversationInput[] | Prisma.OrderDraftUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutConversationInput | Prisma.OrderDraftCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.OrderDraftUpsertWithWhereUniqueWithoutConversationInput | Prisma.OrderDraftUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.OrderDraftCreateManyConversationInputEnvelope;
    set?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    delete?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    update?: Prisma.OrderDraftUpdateWithWhereUniqueWithoutConversationInput | Prisma.OrderDraftUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.OrderDraftUpdateManyWithWhereWithoutConversationInput | Prisma.OrderDraftUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
};
export type OrderDraftUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutConversationInput, Prisma.OrderDraftUncheckedCreateWithoutConversationInput> | Prisma.OrderDraftCreateWithoutConversationInput[] | Prisma.OrderDraftUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutConversationInput | Prisma.OrderDraftCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.OrderDraftUpsertWithWhereUniqueWithoutConversationInput | Prisma.OrderDraftUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.OrderDraftCreateManyConversationInputEnvelope;
    set?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    delete?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    connect?: Prisma.OrderDraftWhereUniqueInput | Prisma.OrderDraftWhereUniqueInput[];
    update?: Prisma.OrderDraftUpdateWithWhereUniqueWithoutConversationInput | Prisma.OrderDraftUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.OrderDraftUpdateManyWithWhereWithoutConversationInput | Prisma.OrderDraftUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
};
export type OrderDraftCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutItemsInput, Prisma.OrderDraftUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutItemsInput;
    connect?: Prisma.OrderDraftWhereUniqueInput;
};
export type OrderDraftUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutItemsInput, Prisma.OrderDraftUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.OrderDraftUpsertWithoutItemsInput;
    connect?: Prisma.OrderDraftWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrderDraftUpdateToOneWithWhereWithoutItemsInput, Prisma.OrderDraftUpdateWithoutItemsInput>, Prisma.OrderDraftUncheckedUpdateWithoutItemsInput>;
};
export type OrderDraftCreateNestedOneWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutOrderInput, Prisma.OrderDraftUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutOrderInput;
    connect?: Prisma.OrderDraftWhereUniqueInput;
};
export type OrderDraftUpdateOneWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftCreateWithoutOrderInput, Prisma.OrderDraftUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.OrderDraftCreateOrConnectWithoutOrderInput;
    upsert?: Prisma.OrderDraftUpsertWithoutOrderInput;
    disconnect?: Prisma.OrderDraftWhereInput | boolean;
    delete?: Prisma.OrderDraftWhereInput | boolean;
    connect?: Prisma.OrderDraftWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrderDraftUpdateToOneWithWhereWithoutOrderInput, Prisma.OrderDraftUpdateWithoutOrderInput>, Prisma.OrderDraftUncheckedUpdateWithoutOrderInput>;
};
export type OrderDraftCreateWithoutTenantInput = {
    id?: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutOrderDraftsInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutOrderDraftsInput;
    items?: Prisma.OrderDraftItemCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftUncheckedCreateWithoutTenantInput = {
    id?: string;
    customerId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderUncheckedCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftCreateOrConnectWithoutTenantInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutTenantInput, Prisma.OrderDraftUncheckedCreateWithoutTenantInput>;
};
export type OrderDraftCreateManyTenantInputEnvelope = {
    data: Prisma.OrderDraftCreateManyTenantInput | Prisma.OrderDraftCreateManyTenantInput[];
};
export type OrderDraftUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderDraftUpdateWithoutTenantInput, Prisma.OrderDraftUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutTenantInput, Prisma.OrderDraftUncheckedCreateWithoutTenantInput>;
};
export type OrderDraftUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateWithoutTenantInput, Prisma.OrderDraftUncheckedUpdateWithoutTenantInput>;
};
export type OrderDraftUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.OrderDraftScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateManyMutationInput, Prisma.OrderDraftUncheckedUpdateManyWithoutTenantInput>;
};
export type OrderDraftScalarWhereInput = {
    AND?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
    OR?: Prisma.OrderDraftScalarWhereInput[];
    NOT?: Prisma.OrderDraftScalarWhereInput | Prisma.OrderDraftScalarWhereInput[];
    id?: Prisma.StringFilter<"OrderDraft"> | string;
    tenantId?: Prisma.StringFilter<"OrderDraft"> | string;
    customerId?: Prisma.StringFilter<"OrderDraft"> | string;
    conversationId?: Prisma.StringFilter<"OrderDraft"> | string;
    status?: Prisma.StringFilter<"OrderDraft"> | string;
    source?: Prisma.StringFilter<"OrderDraft"> | string;
    llmConfidence?: Prisma.FloatNullableFilter<"OrderDraft"> | number | null;
    needsHumanReview?: Prisma.BoolFilter<"OrderDraft"> | boolean;
    missingFields?: Prisma.StringFilter<"OrderDraft"> | string;
    summaryForStaff?: Prisma.StringNullableFilter<"OrderDraft"> | string | null;
    replySuggestion?: Prisma.StringNullableFilter<"OrderDraft"> | string | null;
    rawLlMOutput?: Prisma.JsonNullableFilter<"OrderDraft">;
    createdAt?: Prisma.DateTimeFilter<"OrderDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderDraft"> | Date | string;
};
export type OrderDraftCreateWithoutCustomerInput = {
    id?: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftsInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutOrderDraftsInput;
    items?: Prisma.OrderDraftItemCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftUncheckedCreateWithoutCustomerInput = {
    id?: string;
    tenantId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderUncheckedCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftCreateOrConnectWithoutCustomerInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutCustomerInput, Prisma.OrderDraftUncheckedCreateWithoutCustomerInput>;
};
export type OrderDraftCreateManyCustomerInputEnvelope = {
    data: Prisma.OrderDraftCreateManyCustomerInput | Prisma.OrderDraftCreateManyCustomerInput[];
};
export type OrderDraftUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderDraftUpdateWithoutCustomerInput, Prisma.OrderDraftUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutCustomerInput, Prisma.OrderDraftUncheckedCreateWithoutCustomerInput>;
};
export type OrderDraftUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateWithoutCustomerInput, Prisma.OrderDraftUncheckedUpdateWithoutCustomerInput>;
};
export type OrderDraftUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.OrderDraftScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateManyMutationInput, Prisma.OrderDraftUncheckedUpdateManyWithoutCustomerInput>;
};
export type OrderDraftCreateWithoutConversationInput = {
    id?: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftsInput;
    customer: Prisma.CustomerCreateNestedOneWithoutOrderDraftsInput;
    items?: Prisma.OrderDraftItemCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftUncheckedCreateWithoutConversationInput = {
    id?: string;
    tenantId: string;
    customerId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutOrderDraftInput;
    order?: Prisma.OrderUncheckedCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftCreateOrConnectWithoutConversationInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutConversationInput, Prisma.OrderDraftUncheckedCreateWithoutConversationInput>;
};
export type OrderDraftCreateManyConversationInputEnvelope = {
    data: Prisma.OrderDraftCreateManyConversationInput | Prisma.OrderDraftCreateManyConversationInput[];
};
export type OrderDraftUpsertWithWhereUniqueWithoutConversationInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderDraftUpdateWithoutConversationInput, Prisma.OrderDraftUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutConversationInput, Prisma.OrderDraftUncheckedCreateWithoutConversationInput>;
};
export type OrderDraftUpdateWithWhereUniqueWithoutConversationInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateWithoutConversationInput, Prisma.OrderDraftUncheckedUpdateWithoutConversationInput>;
};
export type OrderDraftUpdateManyWithWhereWithoutConversationInput = {
    where: Prisma.OrderDraftScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateManyMutationInput, Prisma.OrderDraftUncheckedUpdateManyWithoutConversationInput>;
};
export type OrderDraftCreateWithoutItemsInput = {
    id?: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftsInput;
    customer: Prisma.CustomerCreateNestedOneWithoutOrderDraftsInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutOrderDraftsInput;
    order?: Prisma.OrderCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftUncheckedCreateWithoutItemsInput = {
    id?: string;
    tenantId: string;
    customerId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order?: Prisma.OrderUncheckedCreateNestedOneWithoutOrderDraftInput;
};
export type OrderDraftCreateOrConnectWithoutItemsInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutItemsInput, Prisma.OrderDraftUncheckedCreateWithoutItemsInput>;
};
export type OrderDraftUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.OrderDraftUpdateWithoutItemsInput, Prisma.OrderDraftUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutItemsInput, Prisma.OrderDraftUncheckedCreateWithoutItemsInput>;
    where?: Prisma.OrderDraftWhereInput;
};
export type OrderDraftUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.OrderDraftWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateWithoutItemsInput, Prisma.OrderDraftUncheckedUpdateWithoutItemsInput>;
};
export type OrderDraftUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftsNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutOrderDraftsNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutOrderDraftsNestedInput;
    order?: Prisma.OrderUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUncheckedUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftCreateWithoutOrderInput = {
    id?: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftsInput;
    customer: Prisma.CustomerCreateNestedOneWithoutOrderDraftsInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutOrderDraftsInput;
    items?: Prisma.OrderDraftItemCreateNestedManyWithoutOrderDraftInput;
};
export type OrderDraftUncheckedCreateWithoutOrderInput = {
    id?: string;
    tenantId: string;
    customerId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.OrderDraftItemUncheckedCreateNestedManyWithoutOrderDraftInput;
};
export type OrderDraftCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutOrderInput, Prisma.OrderDraftUncheckedCreateWithoutOrderInput>;
};
export type OrderDraftUpsertWithoutOrderInput = {
    update: Prisma.XOR<Prisma.OrderDraftUpdateWithoutOrderInput, Prisma.OrderDraftUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderDraftCreateWithoutOrderInput, Prisma.OrderDraftUncheckedCreateWithoutOrderInput>;
    where?: Prisma.OrderDraftWhereInput;
};
export type OrderDraftUpdateToOneWithWhereWithoutOrderInput = {
    where?: Prisma.OrderDraftWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftUpdateWithoutOrderInput, Prisma.OrderDraftUncheckedUpdateWithoutOrderInput>;
};
export type OrderDraftUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftsNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutOrderDraftsNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutOrderDraftsNestedInput;
    items?: Prisma.OrderDraftItemUpdateManyWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutOrderDraftNestedInput;
};
export type OrderDraftCreateManyTenantInput = {
    id?: string;
    customerId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutOrderDraftsNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutOrderDraftsNestedInput;
    items?: Prisma.OrderDraftItemUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUncheckedUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftCreateManyCustomerInput = {
    id?: string;
    tenantId: string;
    conversationId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftsNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutOrderDraftsNestedInput;
    items?: Prisma.OrderDraftItemUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUncheckedUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftCreateManyConversationInput = {
    id?: string;
    tenantId: string;
    customerId: string;
    status: string;
    source?: string;
    llmConfidence?: number | null;
    needsHumanReview?: boolean;
    missingFields: string;
    summaryForStaff?: string | null;
    replySuggestion?: string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftUpdateWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftsNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutOrderDraftsNestedInput;
    items?: Prisma.OrderDraftItemUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.OrderDraftItemUncheckedUpdateManyWithoutOrderDraftNestedInput;
    order?: Prisma.OrderUncheckedUpdateOneWithoutOrderDraftNestedInput;
};
export type OrderDraftUncheckedUpdateManyWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    llmConfidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    needsHumanReview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    missingFields?: Prisma.StringFieldUpdateOperationsInput | string;
    summaryForStaff?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replySuggestion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawLlMOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type OrderDraftCountOutputType
 */
export type OrderDraftCountOutputType = {
    items: number;
};
export type OrderDraftCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | OrderDraftCountOutputTypeCountItemsArgs;
};
/**
 * OrderDraftCountOutputType without action
 */
export type OrderDraftCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDraftCountOutputType
     */
    select?: Prisma.OrderDraftCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * OrderDraftCountOutputType without action
 */
export type OrderDraftCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderDraftItemWhereInput;
};
export type OrderDraftSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    customerId?: boolean;
    conversationId?: boolean;
    status?: boolean;
    source?: boolean;
    llmConfidence?: boolean;
    needsHumanReview?: boolean;
    missingFields?: boolean;
    summaryForStaff?: boolean;
    replySuggestion?: boolean;
    rawLlMOutput?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.OrderDraft$itemsArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDraft$orderArgs<ExtArgs>;
    _count?: boolean | Prisma.OrderDraftCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderDraft"]>;
export type OrderDraftSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    customerId?: boolean;
    conversationId?: boolean;
    status?: boolean;
    source?: boolean;
    llmConfidence?: boolean;
    needsHumanReview?: boolean;
    missingFields?: boolean;
    summaryForStaff?: boolean;
    replySuggestion?: boolean;
    rawLlMOutput?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderDraft"]>;
export type OrderDraftSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    customerId?: boolean;
    conversationId?: boolean;
    status?: boolean;
    source?: boolean;
    llmConfidence?: boolean;
    needsHumanReview?: boolean;
    missingFields?: boolean;
    summaryForStaff?: boolean;
    replySuggestion?: boolean;
    rawLlMOutput?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderDraft"]>;
export type OrderDraftSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    customerId?: boolean;
    conversationId?: boolean;
    status?: boolean;
    source?: boolean;
    llmConfidence?: boolean;
    needsHumanReview?: boolean;
    missingFields?: boolean;
    summaryForStaff?: boolean;
    replySuggestion?: boolean;
    rawLlMOutput?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OrderDraftOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "customerId" | "conversationId" | "status" | "source" | "llmConfidence" | "needsHumanReview" | "missingFields" | "summaryForStaff" | "replySuggestion" | "rawLlMOutput" | "createdAt" | "updatedAt", ExtArgs["result"]["orderDraft"]>;
export type OrderDraftInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.OrderDraft$itemsArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDraft$orderArgs<ExtArgs>;
    _count?: boolean | Prisma.OrderDraftCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OrderDraftIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
};
export type OrderDraftIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
};
export type $OrderDraftPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderDraft";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        customer: Prisma.$CustomerPayload<ExtArgs>;
        conversation: Prisma.$ConversationPayload<ExtArgs>;
        items: Prisma.$OrderDraftItemPayload<ExtArgs>[];
        order: Prisma.$OrderPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        customerId: string;
        conversationId: string;
        status: string;
        source: string;
        llmConfidence: number | null;
        needsHumanReview: boolean;
        missingFields: string;
        summaryForStaff: string | null;
        replySuggestion: string | null;
        rawLlMOutput: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["orderDraft"]>;
    composites: {};
};
export type OrderDraftGetPayload<S extends boolean | null | undefined | OrderDraftDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload, S>;
export type OrderDraftCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderDraftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderDraftCountAggregateInputType | true;
};
export interface OrderDraftDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderDraft'];
        meta: {
            name: 'OrderDraft';
        };
    };
    /**
     * Find zero or one OrderDraft that matches the filter.
     * @param {OrderDraftFindUniqueArgs} args - Arguments to find a OrderDraft
     * @example
     * // Get one OrderDraft
     * const orderDraft = await prisma.orderDraft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderDraftFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderDraftFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OrderDraft that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderDraftFindUniqueOrThrowArgs} args - Arguments to find a OrderDraft
     * @example
     * // Get one OrderDraft
     * const orderDraft = await prisma.orderDraft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderDraftFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderDraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OrderDraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftFindFirstArgs} args - Arguments to find a OrderDraft
     * @example
     * // Get one OrderDraft
     * const orderDraft = await prisma.orderDraft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderDraftFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderDraftFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OrderDraft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftFindFirstOrThrowArgs} args - Arguments to find a OrderDraft
     * @example
     * // Get one OrderDraft
     * const orderDraft = await prisma.orderDraft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderDraftFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderDraftFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OrderDrafts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderDrafts
     * const orderDrafts = await prisma.orderDraft.findMany()
     *
     * // Get first 10 OrderDrafts
     * const orderDrafts = await prisma.orderDraft.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderDraftWithIdOnly = await prisma.orderDraft.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderDraftFindManyArgs>(args?: Prisma.SelectSubset<T, OrderDraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OrderDraft.
     * @param {OrderDraftCreateArgs} args - Arguments to create a OrderDraft.
     * @example
     * // Create one OrderDraft
     * const OrderDraft = await prisma.orderDraft.create({
     *   data: {
     *     // ... data to create a OrderDraft
     *   }
     * })
     *
     */
    create<T extends OrderDraftCreateArgs>(args: Prisma.SelectSubset<T, OrderDraftCreateArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OrderDrafts.
     * @param {OrderDraftCreateManyArgs} args - Arguments to create many OrderDrafts.
     * @example
     * // Create many OrderDrafts
     * const orderDraft = await prisma.orderDraft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderDraftCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderDraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OrderDrafts and returns the data saved in the database.
     * @param {OrderDraftCreateManyAndReturnArgs} args - Arguments to create many OrderDrafts.
     * @example
     * // Create many OrderDrafts
     * const orderDraft = await prisma.orderDraft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderDrafts and only return the `id`
     * const orderDraftWithIdOnly = await prisma.orderDraft.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderDraftCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderDraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OrderDraft.
     * @param {OrderDraftDeleteArgs} args - Arguments to delete one OrderDraft.
     * @example
     * // Delete one OrderDraft
     * const OrderDraft = await prisma.orderDraft.delete({
     *   where: {
     *     // ... filter to delete one OrderDraft
     *   }
     * })
     *
     */
    delete<T extends OrderDraftDeleteArgs>(args: Prisma.SelectSubset<T, OrderDraftDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OrderDraft.
     * @param {OrderDraftUpdateArgs} args - Arguments to update one OrderDraft.
     * @example
     * // Update one OrderDraft
     * const orderDraft = await prisma.orderDraft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderDraftUpdateArgs>(args: Prisma.SelectSubset<T, OrderDraftUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OrderDrafts.
     * @param {OrderDraftDeleteManyArgs} args - Arguments to filter OrderDrafts to delete.
     * @example
     * // Delete a few OrderDrafts
     * const { count } = await prisma.orderDraft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDraftDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderDraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OrderDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderDrafts
     * const orderDraft = await prisma.orderDraft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderDraftUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderDraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OrderDrafts and returns the data updated in the database.
     * @param {OrderDraftUpdateManyAndReturnArgs} args - Arguments to update many OrderDrafts.
     * @example
     * // Update many OrderDrafts
     * const orderDraft = await prisma.orderDraft.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OrderDrafts and only return the `id`
     * const orderDraftWithIdOnly = await prisma.orderDraft.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderDraftUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderDraftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OrderDraft.
     * @param {OrderDraftUpsertArgs} args - Arguments to update or create a OrderDraft.
     * @example
     * // Update or create a OrderDraft
     * const orderDraft = await prisma.orderDraft.upsert({
     *   create: {
     *     // ... data to create a OrderDraft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderDraft we want to update
     *   }
     * })
     */
    upsert<T extends OrderDraftUpsertArgs>(args: Prisma.SelectSubset<T, OrderDraftUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OrderDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftCountArgs} args - Arguments to filter OrderDrafts to count.
     * @example
     * // Count the number of OrderDrafts
     * const count = await prisma.orderDraft.count({
     *   where: {
     *     // ... the filter for the OrderDrafts we want to count
     *   }
     * })
    **/
    count<T extends OrderDraftCountArgs>(args?: Prisma.Subset<T, OrderDraftCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderDraftCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OrderDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderDraftAggregateArgs>(args: Prisma.Subset<T, OrderDraftAggregateArgs>): Prisma.PrismaPromise<GetOrderDraftAggregateType<T>>;
    /**
     * Group by OrderDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OrderDraftGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderDraftGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderDraftGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderDraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderDraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderDraft model
     */
    readonly fields: OrderDraftFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OrderDraft.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OrderDraftClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    customer<T extends Prisma.CustomerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CustomerDefaultArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    conversation<T extends Prisma.ConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.OrderDraft$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDraft$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    order<T extends Prisma.OrderDraft$orderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDraft$orderArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OrderDraft model
 */
export interface OrderDraftFieldRefs {
    readonly id: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly tenantId: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly customerId: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly conversationId: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly status: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly source: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly llmConfidence: Prisma.FieldRef<"OrderDraft", 'Float'>;
    readonly needsHumanReview: Prisma.FieldRef<"OrderDraft", 'Boolean'>;
    readonly missingFields: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly summaryForStaff: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly replySuggestion: Prisma.FieldRef<"OrderDraft", 'String'>;
    readonly rawLlMOutput: Prisma.FieldRef<"OrderDraft", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"OrderDraft", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OrderDraft", 'DateTime'>;
}
/**
 * OrderDraft findUnique
 */
export type OrderDraftFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraft to fetch.
     */
    where: Prisma.OrderDraftWhereUniqueInput;
};
/**
 * OrderDraft findUniqueOrThrow
 */
export type OrderDraftFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraft to fetch.
     */
    where: Prisma.OrderDraftWhereUniqueInput;
};
/**
 * OrderDraft findFirst
 */
export type OrderDraftFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraft to fetch.
     */
    where?: Prisma.OrderDraftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDrafts to fetch.
     */
    orderBy?: Prisma.OrderDraftOrderByWithRelationInput | Prisma.OrderDraftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderDrafts.
     */
    cursor?: Prisma.OrderDraftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDrafts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDrafts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderDrafts.
     */
    distinct?: Prisma.OrderDraftScalarFieldEnum | Prisma.OrderDraftScalarFieldEnum[];
};
/**
 * OrderDraft findFirstOrThrow
 */
export type OrderDraftFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraft to fetch.
     */
    where?: Prisma.OrderDraftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDrafts to fetch.
     */
    orderBy?: Prisma.OrderDraftOrderByWithRelationInput | Prisma.OrderDraftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderDrafts.
     */
    cursor?: Prisma.OrderDraftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDrafts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDrafts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderDrafts.
     */
    distinct?: Prisma.OrderDraftScalarFieldEnum | Prisma.OrderDraftScalarFieldEnum[];
};
/**
 * OrderDraft findMany
 */
export type OrderDraftFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDrafts to fetch.
     */
    where?: Prisma.OrderDraftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDrafts to fetch.
     */
    orderBy?: Prisma.OrderDraftOrderByWithRelationInput | Prisma.OrderDraftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderDrafts.
     */
    cursor?: Prisma.OrderDraftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDrafts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDrafts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderDrafts.
     */
    distinct?: Prisma.OrderDraftScalarFieldEnum | Prisma.OrderDraftScalarFieldEnum[];
};
/**
 * OrderDraft create
 */
export type OrderDraftCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OrderDraft.
     */
    data: Prisma.XOR<Prisma.OrderDraftCreateInput, Prisma.OrderDraftUncheckedCreateInput>;
};
/**
 * OrderDraft createMany
 */
export type OrderDraftCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderDrafts.
     */
    data: Prisma.OrderDraftCreateManyInput | Prisma.OrderDraftCreateManyInput[];
};
/**
 * OrderDraft createManyAndReturn
 */
export type OrderDraftCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDraft
     */
    select?: Prisma.OrderDraftSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderDraft
     */
    omit?: Prisma.OrderDraftOmit<ExtArgs> | null;
    /**
     * The data used to create many OrderDrafts.
     */
    data: Prisma.OrderDraftCreateManyInput | Prisma.OrderDraftCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderDraftIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OrderDraft update
 */
export type OrderDraftUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OrderDraft.
     */
    data: Prisma.XOR<Prisma.OrderDraftUpdateInput, Prisma.OrderDraftUncheckedUpdateInput>;
    /**
     * Choose, which OrderDraft to update.
     */
    where: Prisma.OrderDraftWhereUniqueInput;
};
/**
 * OrderDraft updateMany
 */
export type OrderDraftUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderDrafts.
     */
    data: Prisma.XOR<Prisma.OrderDraftUpdateManyMutationInput, Prisma.OrderDraftUncheckedUpdateManyInput>;
    /**
     * Filter which OrderDrafts to update
     */
    where?: Prisma.OrderDraftWhereInput;
    /**
     * Limit how many OrderDrafts to update.
     */
    limit?: number;
};
/**
 * OrderDraft updateManyAndReturn
 */
export type OrderDraftUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDraft
     */
    select?: Prisma.OrderDraftSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderDraft
     */
    omit?: Prisma.OrderDraftOmit<ExtArgs> | null;
    /**
     * The data used to update OrderDrafts.
     */
    data: Prisma.XOR<Prisma.OrderDraftUpdateManyMutationInput, Prisma.OrderDraftUncheckedUpdateManyInput>;
    /**
     * Filter which OrderDrafts to update
     */
    where?: Prisma.OrderDraftWhereInput;
    /**
     * Limit how many OrderDrafts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderDraftIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OrderDraft upsert
 */
export type OrderDraftUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OrderDraft to update in case it exists.
     */
    where: Prisma.OrderDraftWhereUniqueInput;
    /**
     * In case the OrderDraft found by the `where` argument doesn't exist, create a new OrderDraft with this data.
     */
    create: Prisma.XOR<Prisma.OrderDraftCreateInput, Prisma.OrderDraftUncheckedCreateInput>;
    /**
     * In case the OrderDraft was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OrderDraftUpdateInput, Prisma.OrderDraftUncheckedUpdateInput>;
};
/**
 * OrderDraft delete
 */
export type OrderDraftDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OrderDraft to delete.
     */
    where: Prisma.OrderDraftWhereUniqueInput;
};
/**
 * OrderDraft deleteMany
 */
export type OrderDraftDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OrderDrafts to delete
     */
    where?: Prisma.OrderDraftWhereInput;
    /**
     * Limit how many OrderDrafts to delete.
     */
    limit?: number;
};
/**
 * OrderDraft.items
 */
export type OrderDraft$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * OrderDraft.order
 */
export type OrderDraft$orderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * OrderDraft without action
 */
export type OrderDraftDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=OrderDraft.d.ts.map