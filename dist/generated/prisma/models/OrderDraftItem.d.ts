import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OrderDraftItem
 *
 */
export type OrderDraftItemModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderDraftItemPayload>;
export type AggregateOrderDraftItem = {
    _count: OrderDraftItemCountAggregateOutputType | null;
    _avg: OrderDraftItemAvgAggregateOutputType | null;
    _sum: OrderDraftItemSumAggregateOutputType | null;
    _min: OrderDraftItemMinAggregateOutputType | null;
    _max: OrderDraftItemMaxAggregateOutputType | null;
};
export type OrderDraftItemAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: number | null;
};
export type OrderDraftItemSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: number | null;
};
export type OrderDraftItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    orderDraftId: string | null;
    matchedProductId: string | null;
    matchedVariantId: string | null;
    rawText: string | null;
    name: string | null;
    color: string | null;
    size: string | null;
    quantity: number | null;
    unitPrice: number | null;
    isFuzzy: boolean | null;
    fuzzyReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderDraftItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    orderDraftId: string | null;
    matchedProductId: string | null;
    matchedVariantId: string | null;
    rawText: string | null;
    name: string | null;
    color: string | null;
    size: string | null;
    quantity: number | null;
    unitPrice: number | null;
    isFuzzy: boolean | null;
    fuzzyReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderDraftItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    orderDraftId: number;
    matchedProductId: number;
    matchedVariantId: number;
    rawText: number;
    name: number;
    color: number;
    size: number;
    quantity: number;
    unitPrice: number;
    isFuzzy: number;
    fuzzyReason: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OrderDraftItemAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type OrderDraftItemSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type OrderDraftItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    orderDraftId?: true;
    matchedProductId?: true;
    matchedVariantId?: true;
    rawText?: true;
    name?: true;
    color?: true;
    size?: true;
    quantity?: true;
    unitPrice?: true;
    isFuzzy?: true;
    fuzzyReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderDraftItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    orderDraftId?: true;
    matchedProductId?: true;
    matchedVariantId?: true;
    rawText?: true;
    name?: true;
    color?: true;
    size?: true;
    quantity?: true;
    unitPrice?: true;
    isFuzzy?: true;
    fuzzyReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderDraftItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    orderDraftId?: true;
    matchedProductId?: true;
    matchedVariantId?: true;
    rawText?: true;
    name?: true;
    color?: true;
    size?: true;
    quantity?: true;
    unitPrice?: true;
    isFuzzy?: true;
    fuzzyReason?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OrderDraftItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OrderDraftItem to aggregate.
     */
    where?: Prisma.OrderDraftItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDraftItems to fetch.
     */
    orderBy?: Prisma.OrderDraftItemOrderByWithRelationInput | Prisma.OrderDraftItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OrderDraftItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDraftItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDraftItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderDraftItems
    **/
    _count?: true | OrderDraftItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: OrderDraftItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: OrderDraftItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OrderDraftItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OrderDraftItemMaxAggregateInputType;
};
export type GetOrderDraftItemAggregateType<T extends OrderDraftItemAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderDraftItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderDraftItem[P]> : Prisma.GetScalarType<T[P], AggregateOrderDraftItem[P]>;
};
export type OrderDraftItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderDraftItemWhereInput;
    orderBy?: Prisma.OrderDraftItemOrderByWithAggregationInput | Prisma.OrderDraftItemOrderByWithAggregationInput[];
    by: Prisma.OrderDraftItemScalarFieldEnum[] | Prisma.OrderDraftItemScalarFieldEnum;
    having?: Prisma.OrderDraftItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderDraftItemCountAggregateInputType | true;
    _avg?: OrderDraftItemAvgAggregateInputType;
    _sum?: OrderDraftItemSumAggregateInputType;
    _min?: OrderDraftItemMinAggregateInputType;
    _max?: OrderDraftItemMaxAggregateInputType;
};
export type OrderDraftItemGroupByOutputType = {
    id: string;
    tenantId: string;
    orderDraftId: string;
    matchedProductId: string | null;
    matchedVariantId: string | null;
    rawText: string | null;
    name: string | null;
    color: string | null;
    size: string | null;
    quantity: number | null;
    unitPrice: number | null;
    isFuzzy: boolean;
    fuzzyReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OrderDraftItemCountAggregateOutputType | null;
    _avg: OrderDraftItemAvgAggregateOutputType | null;
    _sum: OrderDraftItemSumAggregateOutputType | null;
    _min: OrderDraftItemMinAggregateOutputType | null;
    _max: OrderDraftItemMaxAggregateOutputType | null;
};
export type GetOrderDraftItemGroupByPayload<T extends OrderDraftItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderDraftItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderDraftItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderDraftItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderDraftItemGroupByOutputType[P]>;
}>>;
export type OrderDraftItemWhereInput = {
    AND?: Prisma.OrderDraftItemWhereInput | Prisma.OrderDraftItemWhereInput[];
    OR?: Prisma.OrderDraftItemWhereInput[];
    NOT?: Prisma.OrderDraftItemWhereInput | Prisma.OrderDraftItemWhereInput[];
    id?: Prisma.StringFilter<"OrderDraftItem"> | string;
    tenantId?: Prisma.StringFilter<"OrderDraftItem"> | string;
    orderDraftId?: Prisma.StringFilter<"OrderDraftItem"> | string;
    matchedProductId?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    matchedVariantId?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    rawText?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    name?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    color?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    size?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    quantity?: Prisma.IntNullableFilter<"OrderDraftItem"> | number | null;
    unitPrice?: Prisma.FloatNullableFilter<"OrderDraftItem"> | number | null;
    isFuzzy?: Prisma.BoolFilter<"OrderDraftItem"> | boolean;
    fuzzyReason?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderDraftItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderDraftItem"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    orderDraft?: Prisma.XOR<Prisma.OrderDraftScalarRelationFilter, Prisma.OrderDraftWhereInput>;
    matchedProduct?: Prisma.XOR<Prisma.ProductNullableScalarRelationFilter, Prisma.ProductWhereInput> | null;
    matchedVariant?: Prisma.XOR<Prisma.ProductVariantNullableScalarRelationFilter, Prisma.ProductVariantWhereInput> | null;
};
export type OrderDraftItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderDraftId?: Prisma.SortOrder;
    matchedProductId?: Prisma.SortOrderInput | Prisma.SortOrder;
    matchedVariantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawText?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrderInput | Prisma.SortOrder;
    size?: Prisma.SortOrderInput | Prisma.SortOrder;
    quantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    isFuzzy?: Prisma.SortOrder;
    fuzzyReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    orderDraft?: Prisma.OrderDraftOrderByWithRelationInput;
    matchedProduct?: Prisma.ProductOrderByWithRelationInput;
    matchedVariant?: Prisma.ProductVariantOrderByWithRelationInput;
};
export type OrderDraftItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OrderDraftItemWhereInput | Prisma.OrderDraftItemWhereInput[];
    OR?: Prisma.OrderDraftItemWhereInput[];
    NOT?: Prisma.OrderDraftItemWhereInput | Prisma.OrderDraftItemWhereInput[];
    tenantId?: Prisma.StringFilter<"OrderDraftItem"> | string;
    orderDraftId?: Prisma.StringFilter<"OrderDraftItem"> | string;
    matchedProductId?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    matchedVariantId?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    rawText?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    name?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    color?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    size?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    quantity?: Prisma.IntNullableFilter<"OrderDraftItem"> | number | null;
    unitPrice?: Prisma.FloatNullableFilter<"OrderDraftItem"> | number | null;
    isFuzzy?: Prisma.BoolFilter<"OrderDraftItem"> | boolean;
    fuzzyReason?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderDraftItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderDraftItem"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    orderDraft?: Prisma.XOR<Prisma.OrderDraftScalarRelationFilter, Prisma.OrderDraftWhereInput>;
    matchedProduct?: Prisma.XOR<Prisma.ProductNullableScalarRelationFilter, Prisma.ProductWhereInput> | null;
    matchedVariant?: Prisma.XOR<Prisma.ProductVariantNullableScalarRelationFilter, Prisma.ProductVariantWhereInput> | null;
}, "id">;
export type OrderDraftItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderDraftId?: Prisma.SortOrder;
    matchedProductId?: Prisma.SortOrderInput | Prisma.SortOrder;
    matchedVariantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawText?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrderInput | Prisma.SortOrder;
    size?: Prisma.SortOrderInput | Prisma.SortOrder;
    quantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    isFuzzy?: Prisma.SortOrder;
    fuzzyReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OrderDraftItemCountOrderByAggregateInput;
    _avg?: Prisma.OrderDraftItemAvgOrderByAggregateInput;
    _max?: Prisma.OrderDraftItemMaxOrderByAggregateInput;
    _min?: Prisma.OrderDraftItemMinOrderByAggregateInput;
    _sum?: Prisma.OrderDraftItemSumOrderByAggregateInput;
};
export type OrderDraftItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderDraftItemScalarWhereWithAggregatesInput | Prisma.OrderDraftItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderDraftItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderDraftItemScalarWhereWithAggregatesInput | Prisma.OrderDraftItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OrderDraftItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"OrderDraftItem"> | string;
    orderDraftId?: Prisma.StringWithAggregatesFilter<"OrderDraftItem"> | string;
    matchedProductId?: Prisma.StringNullableWithAggregatesFilter<"OrderDraftItem"> | string | null;
    matchedVariantId?: Prisma.StringNullableWithAggregatesFilter<"OrderDraftItem"> | string | null;
    rawText?: Prisma.StringNullableWithAggregatesFilter<"OrderDraftItem"> | string | null;
    name?: Prisma.StringNullableWithAggregatesFilter<"OrderDraftItem"> | string | null;
    color?: Prisma.StringNullableWithAggregatesFilter<"OrderDraftItem"> | string | null;
    size?: Prisma.StringNullableWithAggregatesFilter<"OrderDraftItem"> | string | null;
    quantity?: Prisma.IntNullableWithAggregatesFilter<"OrderDraftItem"> | number | null;
    unitPrice?: Prisma.FloatNullableWithAggregatesFilter<"OrderDraftItem"> | number | null;
    isFuzzy?: Prisma.BoolWithAggregatesFilter<"OrderDraftItem"> | boolean;
    fuzzyReason?: Prisma.StringNullableWithAggregatesFilter<"OrderDraftItem"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderDraftItem"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OrderDraftItem"> | Date | string;
};
export type OrderDraftItemCreateInput = {
    id?: string;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftItemsInput;
    orderDraft: Prisma.OrderDraftCreateNestedOneWithoutItemsInput;
    matchedProduct?: Prisma.ProductCreateNestedOneWithoutOrderDraftItemsInput;
    matchedVariant?: Prisma.ProductVariantCreateNestedOneWithoutOrderDraftItemsInput;
};
export type OrderDraftItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    orderDraftId: string;
    matchedProductId?: string | null;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftItemsNestedInput;
    orderDraft?: Prisma.OrderDraftUpdateOneRequiredWithoutItemsNestedInput;
    matchedProduct?: Prisma.ProductUpdateOneWithoutOrderDraftItemsNestedInput;
    matchedVariant?: Prisma.ProductVariantUpdateOneWithoutOrderDraftItemsNestedInput;
};
export type OrderDraftItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemCreateManyInput = {
    id?: string;
    tenantId: string;
    orderDraftId: string;
    matchedProductId?: string | null;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemListRelationFilter = {
    every?: Prisma.OrderDraftItemWhereInput;
    some?: Prisma.OrderDraftItemWhereInput;
    none?: Prisma.OrderDraftItemWhereInput;
};
export type OrderDraftItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderDraftItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderDraftId?: Prisma.SortOrder;
    matchedProductId?: Prisma.SortOrder;
    matchedVariantId?: Prisma.SortOrder;
    rawText?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    isFuzzy?: Prisma.SortOrder;
    fuzzyReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderDraftItemAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type OrderDraftItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderDraftId?: Prisma.SortOrder;
    matchedProductId?: Prisma.SortOrder;
    matchedVariantId?: Prisma.SortOrder;
    rawText?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    isFuzzy?: Prisma.SortOrder;
    fuzzyReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderDraftItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderDraftId?: Prisma.SortOrder;
    matchedProductId?: Prisma.SortOrder;
    matchedVariantId?: Prisma.SortOrder;
    rawText?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    isFuzzy?: Prisma.SortOrder;
    fuzzyReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderDraftItemSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type OrderDraftItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutTenantInput, Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftItemCreateWithoutTenantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput | Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyTenantInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutTenantInput, Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftItemCreateWithoutTenantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput | Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyTenantInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutTenantInput, Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftItemCreateWithoutTenantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput | Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyTenantInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutTenantInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type OrderDraftItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutTenantInput, Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput> | Prisma.OrderDraftItemCreateWithoutTenantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput | Prisma.OrderDraftItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyTenantInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutTenantInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type OrderDraftItemCreateNestedManyWithoutMatchedProductInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput> | Prisma.OrderDraftItemCreateWithoutMatchedProductInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedProductInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUncheckedCreateNestedManyWithoutMatchedProductInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput> | Prisma.OrderDraftItemCreateWithoutMatchedProductInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedProductInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUpdateManyWithoutMatchedProductNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput> | Prisma.OrderDraftItemCreateWithoutMatchedProductInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedProductInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedProductInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedProductInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedProductInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedProductInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedProductInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedProductInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type OrderDraftItemUncheckedUpdateManyWithoutMatchedProductNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput> | Prisma.OrderDraftItemCreateWithoutMatchedProductInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedProductInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedProductInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedProductInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedProductInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedProductInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedProductInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedProductInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedProductInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type OrderDraftItemCreateNestedManyWithoutMatchedVariantInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput> | Prisma.OrderDraftItemCreateWithoutMatchedVariantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedVariantInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUncheckedCreateNestedManyWithoutMatchedVariantInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput> | Prisma.OrderDraftItemCreateWithoutMatchedVariantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedVariantInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUpdateManyWithoutMatchedVariantNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput> | Prisma.OrderDraftItemCreateWithoutMatchedVariantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedVariantInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedVariantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedVariantInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedVariantInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedVariantInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedVariantInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedVariantInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type OrderDraftItemUncheckedUpdateManyWithoutMatchedVariantNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput> | Prisma.OrderDraftItemCreateWithoutMatchedVariantInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput | Prisma.OrderDraftItemCreateOrConnectWithoutMatchedVariantInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedVariantInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutMatchedVariantInput[];
    createMany?: Prisma.OrderDraftItemCreateManyMatchedVariantInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedVariantInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutMatchedVariantInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedVariantInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutMatchedVariantInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type OrderDraftItemCreateNestedManyWithoutOrderDraftInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput> | Prisma.OrderDraftItemCreateWithoutOrderDraftInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput | Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput[];
    createMany?: Prisma.OrderDraftItemCreateManyOrderDraftInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUncheckedCreateNestedManyWithoutOrderDraftInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput> | Prisma.OrderDraftItemCreateWithoutOrderDraftInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput | Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput[];
    createMany?: Prisma.OrderDraftItemCreateManyOrderDraftInputEnvelope;
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
};
export type OrderDraftItemUpdateManyWithoutOrderDraftNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput> | Prisma.OrderDraftItemCreateWithoutOrderDraftInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput | Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutOrderDraftInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutOrderDraftInput[];
    createMany?: Prisma.OrderDraftItemCreateManyOrderDraftInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutOrderDraftInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutOrderDraftInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutOrderDraftInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutOrderDraftInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type OrderDraftItemUncheckedUpdateManyWithoutOrderDraftNestedInput = {
    create?: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput> | Prisma.OrderDraftItemCreateWithoutOrderDraftInput[] | Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput[];
    connectOrCreate?: Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput | Prisma.OrderDraftItemCreateOrConnectWithoutOrderDraftInput[];
    upsert?: Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutOrderDraftInput | Prisma.OrderDraftItemUpsertWithWhereUniqueWithoutOrderDraftInput[];
    createMany?: Prisma.OrderDraftItemCreateManyOrderDraftInputEnvelope;
    set?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    disconnect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    delete?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    connect?: Prisma.OrderDraftItemWhereUniqueInput | Prisma.OrderDraftItemWhereUniqueInput[];
    update?: Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutOrderDraftInput | Prisma.OrderDraftItemUpdateWithWhereUniqueWithoutOrderDraftInput[];
    updateMany?: Prisma.OrderDraftItemUpdateManyWithWhereWithoutOrderDraftInput | Prisma.OrderDraftItemUpdateManyWithWhereWithoutOrderDraftInput[];
    deleteMany?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type OrderDraftItemCreateWithoutTenantInput = {
    id?: string;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orderDraft: Prisma.OrderDraftCreateNestedOneWithoutItemsInput;
    matchedProduct?: Prisma.ProductCreateNestedOneWithoutOrderDraftItemsInput;
    matchedVariant?: Prisma.ProductVariantCreateNestedOneWithoutOrderDraftItemsInput;
};
export type OrderDraftItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    orderDraftId: string;
    matchedProductId?: string | null;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutTenantInput, Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput>;
};
export type OrderDraftItemCreateManyTenantInputEnvelope = {
    data: Prisma.OrderDraftItemCreateManyTenantInput | Prisma.OrderDraftItemCreateManyTenantInput[];
};
export type OrderDraftItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutTenantInput, Prisma.OrderDraftItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutTenantInput, Prisma.OrderDraftItemUncheckedCreateWithoutTenantInput>;
};
export type OrderDraftItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutTenantInput, Prisma.OrderDraftItemUncheckedUpdateWithoutTenantInput>;
};
export type OrderDraftItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.OrderDraftItemScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateManyMutationInput, Prisma.OrderDraftItemUncheckedUpdateManyWithoutTenantInput>;
};
export type OrderDraftItemScalarWhereInput = {
    AND?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
    OR?: Prisma.OrderDraftItemScalarWhereInput[];
    NOT?: Prisma.OrderDraftItemScalarWhereInput | Prisma.OrderDraftItemScalarWhereInput[];
    id?: Prisma.StringFilter<"OrderDraftItem"> | string;
    tenantId?: Prisma.StringFilter<"OrderDraftItem"> | string;
    orderDraftId?: Prisma.StringFilter<"OrderDraftItem"> | string;
    matchedProductId?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    matchedVariantId?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    rawText?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    name?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    color?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    size?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    quantity?: Prisma.IntNullableFilter<"OrderDraftItem"> | number | null;
    unitPrice?: Prisma.FloatNullableFilter<"OrderDraftItem"> | number | null;
    isFuzzy?: Prisma.BoolFilter<"OrderDraftItem"> | boolean;
    fuzzyReason?: Prisma.StringNullableFilter<"OrderDraftItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderDraftItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderDraftItem"> | Date | string;
};
export type OrderDraftItemCreateWithoutMatchedProductInput = {
    id?: string;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftItemsInput;
    orderDraft: Prisma.OrderDraftCreateNestedOneWithoutItemsInput;
    matchedVariant?: Prisma.ProductVariantCreateNestedOneWithoutOrderDraftItemsInput;
};
export type OrderDraftItemUncheckedCreateWithoutMatchedProductInput = {
    id?: string;
    tenantId: string;
    orderDraftId: string;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemCreateOrConnectWithoutMatchedProductInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput>;
};
export type OrderDraftItemCreateManyMatchedProductInputEnvelope = {
    data: Prisma.OrderDraftItemCreateManyMatchedProductInput | Prisma.OrderDraftItemCreateManyMatchedProductInput[];
};
export type OrderDraftItemUpsertWithWhereUniqueWithoutMatchedProductInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedUpdateWithoutMatchedProductInput>;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedProductInput>;
};
export type OrderDraftItemUpdateWithWhereUniqueWithoutMatchedProductInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutMatchedProductInput, Prisma.OrderDraftItemUncheckedUpdateWithoutMatchedProductInput>;
};
export type OrderDraftItemUpdateManyWithWhereWithoutMatchedProductInput = {
    where: Prisma.OrderDraftItemScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateManyMutationInput, Prisma.OrderDraftItemUncheckedUpdateManyWithoutMatchedProductInput>;
};
export type OrderDraftItemCreateWithoutMatchedVariantInput = {
    id?: string;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftItemsInput;
    orderDraft: Prisma.OrderDraftCreateNestedOneWithoutItemsInput;
    matchedProduct?: Prisma.ProductCreateNestedOneWithoutOrderDraftItemsInput;
};
export type OrderDraftItemUncheckedCreateWithoutMatchedVariantInput = {
    id?: string;
    tenantId: string;
    orderDraftId: string;
    matchedProductId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemCreateOrConnectWithoutMatchedVariantInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput>;
};
export type OrderDraftItemCreateManyMatchedVariantInputEnvelope = {
    data: Prisma.OrderDraftItemCreateManyMatchedVariantInput | Prisma.OrderDraftItemCreateManyMatchedVariantInput[];
};
export type OrderDraftItemUpsertWithWhereUniqueWithoutMatchedVariantInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedUpdateWithoutMatchedVariantInput>;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedCreateWithoutMatchedVariantInput>;
};
export type OrderDraftItemUpdateWithWhereUniqueWithoutMatchedVariantInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutMatchedVariantInput, Prisma.OrderDraftItemUncheckedUpdateWithoutMatchedVariantInput>;
};
export type OrderDraftItemUpdateManyWithWhereWithoutMatchedVariantInput = {
    where: Prisma.OrderDraftItemScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateManyMutationInput, Prisma.OrderDraftItemUncheckedUpdateManyWithoutMatchedVariantInput>;
};
export type OrderDraftItemCreateWithoutOrderDraftInput = {
    id?: string;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutOrderDraftItemsInput;
    matchedProduct?: Prisma.ProductCreateNestedOneWithoutOrderDraftItemsInput;
    matchedVariant?: Prisma.ProductVariantCreateNestedOneWithoutOrderDraftItemsInput;
};
export type OrderDraftItemUncheckedCreateWithoutOrderDraftInput = {
    id?: string;
    tenantId: string;
    matchedProductId?: string | null;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemCreateOrConnectWithoutOrderDraftInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput>;
};
export type OrderDraftItemCreateManyOrderDraftInputEnvelope = {
    data: Prisma.OrderDraftItemCreateManyOrderDraftInput | Prisma.OrderDraftItemCreateManyOrderDraftInput[];
};
export type OrderDraftItemUpsertWithWhereUniqueWithoutOrderDraftInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedUpdateWithoutOrderDraftInput>;
    create: Prisma.XOR<Prisma.OrderDraftItemCreateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedCreateWithoutOrderDraftInput>;
};
export type OrderDraftItemUpdateWithWhereUniqueWithoutOrderDraftInput = {
    where: Prisma.OrderDraftItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateWithoutOrderDraftInput, Prisma.OrderDraftItemUncheckedUpdateWithoutOrderDraftInput>;
};
export type OrderDraftItemUpdateManyWithWhereWithoutOrderDraftInput = {
    where: Prisma.OrderDraftItemScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateManyMutationInput, Prisma.OrderDraftItemUncheckedUpdateManyWithoutOrderDraftInput>;
};
export type OrderDraftItemCreateManyTenantInput = {
    id?: string;
    orderDraftId: string;
    matchedProductId?: string | null;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    orderDraft?: Prisma.OrderDraftUpdateOneRequiredWithoutItemsNestedInput;
    matchedProduct?: Prisma.ProductUpdateOneWithoutOrderDraftItemsNestedInput;
    matchedVariant?: Prisma.ProductVariantUpdateOneWithoutOrderDraftItemsNestedInput;
};
export type OrderDraftItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemCreateManyMatchedProductInput = {
    id?: string;
    tenantId: string;
    orderDraftId: string;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemUpdateWithoutMatchedProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftItemsNestedInput;
    orderDraft?: Prisma.OrderDraftUpdateOneRequiredWithoutItemsNestedInput;
    matchedVariant?: Prisma.ProductVariantUpdateOneWithoutOrderDraftItemsNestedInput;
};
export type OrderDraftItemUncheckedUpdateWithoutMatchedProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemUncheckedUpdateManyWithoutMatchedProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemCreateManyMatchedVariantInput = {
    id?: string;
    tenantId: string;
    orderDraftId: string;
    matchedProductId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemUpdateWithoutMatchedVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftItemsNestedInput;
    orderDraft?: Prisma.OrderDraftUpdateOneRequiredWithoutItemsNestedInput;
    matchedProduct?: Prisma.ProductUpdateOneWithoutOrderDraftItemsNestedInput;
};
export type OrderDraftItemUncheckedUpdateWithoutMatchedVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemUncheckedUpdateManyWithoutMatchedVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderDraftId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemCreateManyOrderDraftInput = {
    id?: string;
    tenantId: string;
    matchedProductId?: string | null;
    matchedVariantId?: string | null;
    rawText?: string | null;
    name?: string | null;
    color?: string | null;
    size?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    isFuzzy?: boolean;
    fuzzyReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderDraftItemUpdateWithoutOrderDraftInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutOrderDraftItemsNestedInput;
    matchedProduct?: Prisma.ProductUpdateOneWithoutOrderDraftItemsNestedInput;
    matchedVariant?: Prisma.ProductVariantUpdateOneWithoutOrderDraftItemsNestedInput;
};
export type OrderDraftItemUncheckedUpdateWithoutOrderDraftInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemUncheckedUpdateManyWithoutOrderDraftInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchedProductId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    matchedVariantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    size?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isFuzzy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fuzzyReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderDraftItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    orderDraftId?: boolean;
    matchedProductId?: boolean;
    matchedVariantId?: boolean;
    rawText?: boolean;
    name?: boolean;
    color?: boolean;
    size?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    isFuzzy?: boolean;
    fuzzyReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    orderDraft?: boolean | Prisma.OrderDraftDefaultArgs<ExtArgs>;
    matchedProduct?: boolean | Prisma.OrderDraftItem$matchedProductArgs<ExtArgs>;
    matchedVariant?: boolean | Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs>;
}, ExtArgs["result"]["orderDraftItem"]>;
export type OrderDraftItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    orderDraftId?: boolean;
    matchedProductId?: boolean;
    matchedVariantId?: boolean;
    rawText?: boolean;
    name?: boolean;
    color?: boolean;
    size?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    isFuzzy?: boolean;
    fuzzyReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    orderDraft?: boolean | Prisma.OrderDraftDefaultArgs<ExtArgs>;
    matchedProduct?: boolean | Prisma.OrderDraftItem$matchedProductArgs<ExtArgs>;
    matchedVariant?: boolean | Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs>;
}, ExtArgs["result"]["orderDraftItem"]>;
export type OrderDraftItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    orderDraftId?: boolean;
    matchedProductId?: boolean;
    matchedVariantId?: boolean;
    rawText?: boolean;
    name?: boolean;
    color?: boolean;
    size?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    isFuzzy?: boolean;
    fuzzyReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    orderDraft?: boolean | Prisma.OrderDraftDefaultArgs<ExtArgs>;
    matchedProduct?: boolean | Prisma.OrderDraftItem$matchedProductArgs<ExtArgs>;
    matchedVariant?: boolean | Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs>;
}, ExtArgs["result"]["orderDraftItem"]>;
export type OrderDraftItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    orderDraftId?: boolean;
    matchedProductId?: boolean;
    matchedVariantId?: boolean;
    rawText?: boolean;
    name?: boolean;
    color?: boolean;
    size?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    isFuzzy?: boolean;
    fuzzyReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OrderDraftItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "orderDraftId" | "matchedProductId" | "matchedVariantId" | "rawText" | "name" | "color" | "size" | "quantity" | "unitPrice" | "isFuzzy" | "fuzzyReason" | "createdAt" | "updatedAt", ExtArgs["result"]["orderDraftItem"]>;
export type OrderDraftItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    orderDraft?: boolean | Prisma.OrderDraftDefaultArgs<ExtArgs>;
    matchedProduct?: boolean | Prisma.OrderDraftItem$matchedProductArgs<ExtArgs>;
    matchedVariant?: boolean | Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs>;
};
export type OrderDraftItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    orderDraft?: boolean | Prisma.OrderDraftDefaultArgs<ExtArgs>;
    matchedProduct?: boolean | Prisma.OrderDraftItem$matchedProductArgs<ExtArgs>;
    matchedVariant?: boolean | Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs>;
};
export type OrderDraftItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    orderDraft?: boolean | Prisma.OrderDraftDefaultArgs<ExtArgs>;
    matchedProduct?: boolean | Prisma.OrderDraftItem$matchedProductArgs<ExtArgs>;
    matchedVariant?: boolean | Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs>;
};
export type $OrderDraftItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderDraftItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        orderDraft: Prisma.$OrderDraftPayload<ExtArgs>;
        matchedProduct: Prisma.$ProductPayload<ExtArgs> | null;
        matchedVariant: Prisma.$ProductVariantPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        orderDraftId: string;
        matchedProductId: string | null;
        matchedVariantId: string | null;
        rawText: string | null;
        name: string | null;
        color: string | null;
        size: string | null;
        quantity: number | null;
        unitPrice: number | null;
        isFuzzy: boolean;
        fuzzyReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["orderDraftItem"]>;
    composites: {};
};
export type OrderDraftItemGetPayload<S extends boolean | null | undefined | OrderDraftItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload, S>;
export type OrderDraftItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderDraftItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderDraftItemCountAggregateInputType | true;
};
export interface OrderDraftItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderDraftItem'];
        meta: {
            name: 'OrderDraftItem';
        };
    };
    /**
     * Find zero or one OrderDraftItem that matches the filter.
     * @param {OrderDraftItemFindUniqueArgs} args - Arguments to find a OrderDraftItem
     * @example
     * // Get one OrderDraftItem
     * const orderDraftItem = await prisma.orderDraftItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderDraftItemFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderDraftItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OrderDraftItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderDraftItemFindUniqueOrThrowArgs} args - Arguments to find a OrderDraftItem
     * @example
     * // Get one OrderDraftItem
     * const orderDraftItem = await prisma.orderDraftItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderDraftItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderDraftItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OrderDraftItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftItemFindFirstArgs} args - Arguments to find a OrderDraftItem
     * @example
     * // Get one OrderDraftItem
     * const orderDraftItem = await prisma.orderDraftItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderDraftItemFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderDraftItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OrderDraftItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftItemFindFirstOrThrowArgs} args - Arguments to find a OrderDraftItem
     * @example
     * // Get one OrderDraftItem
     * const orderDraftItem = await prisma.orderDraftItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderDraftItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderDraftItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OrderDraftItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderDraftItems
     * const orderDraftItems = await prisma.orderDraftItem.findMany()
     *
     * // Get first 10 OrderDraftItems
     * const orderDraftItems = await prisma.orderDraftItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderDraftItemWithIdOnly = await prisma.orderDraftItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderDraftItemFindManyArgs>(args?: Prisma.SelectSubset<T, OrderDraftItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OrderDraftItem.
     * @param {OrderDraftItemCreateArgs} args - Arguments to create a OrderDraftItem.
     * @example
     * // Create one OrderDraftItem
     * const OrderDraftItem = await prisma.orderDraftItem.create({
     *   data: {
     *     // ... data to create a OrderDraftItem
     *   }
     * })
     *
     */
    create<T extends OrderDraftItemCreateArgs>(args: Prisma.SelectSubset<T, OrderDraftItemCreateArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OrderDraftItems.
     * @param {OrderDraftItemCreateManyArgs} args - Arguments to create many OrderDraftItems.
     * @example
     * // Create many OrderDraftItems
     * const orderDraftItem = await prisma.orderDraftItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderDraftItemCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderDraftItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OrderDraftItems and returns the data saved in the database.
     * @param {OrderDraftItemCreateManyAndReturnArgs} args - Arguments to create many OrderDraftItems.
     * @example
     * // Create many OrderDraftItems
     * const orderDraftItem = await prisma.orderDraftItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderDraftItems and only return the `id`
     * const orderDraftItemWithIdOnly = await prisma.orderDraftItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderDraftItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderDraftItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OrderDraftItem.
     * @param {OrderDraftItemDeleteArgs} args - Arguments to delete one OrderDraftItem.
     * @example
     * // Delete one OrderDraftItem
     * const OrderDraftItem = await prisma.orderDraftItem.delete({
     *   where: {
     *     // ... filter to delete one OrderDraftItem
     *   }
     * })
     *
     */
    delete<T extends OrderDraftItemDeleteArgs>(args: Prisma.SelectSubset<T, OrderDraftItemDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OrderDraftItem.
     * @param {OrderDraftItemUpdateArgs} args - Arguments to update one OrderDraftItem.
     * @example
     * // Update one OrderDraftItem
     * const orderDraftItem = await prisma.orderDraftItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderDraftItemUpdateArgs>(args: Prisma.SelectSubset<T, OrderDraftItemUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OrderDraftItems.
     * @param {OrderDraftItemDeleteManyArgs} args - Arguments to filter OrderDraftItems to delete.
     * @example
     * // Delete a few OrderDraftItems
     * const { count } = await prisma.orderDraftItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDraftItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderDraftItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OrderDraftItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderDraftItems
     * const orderDraftItem = await prisma.orderDraftItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderDraftItemUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderDraftItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OrderDraftItems and returns the data updated in the database.
     * @param {OrderDraftItemUpdateManyAndReturnArgs} args - Arguments to update many OrderDraftItems.
     * @example
     * // Update many OrderDraftItems
     * const orderDraftItem = await prisma.orderDraftItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OrderDraftItems and only return the `id`
     * const orderDraftItemWithIdOnly = await prisma.orderDraftItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderDraftItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderDraftItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OrderDraftItem.
     * @param {OrderDraftItemUpsertArgs} args - Arguments to update or create a OrderDraftItem.
     * @example
     * // Update or create a OrderDraftItem
     * const orderDraftItem = await prisma.orderDraftItem.upsert({
     *   create: {
     *     // ... data to create a OrderDraftItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderDraftItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderDraftItemUpsertArgs>(args: Prisma.SelectSubset<T, OrderDraftItemUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderDraftItemClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OrderDraftItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftItemCountArgs} args - Arguments to filter OrderDraftItems to count.
     * @example
     * // Count the number of OrderDraftItems
     * const count = await prisma.orderDraftItem.count({
     *   where: {
     *     // ... the filter for the OrderDraftItems we want to count
     *   }
     * })
    **/
    count<T extends OrderDraftItemCountArgs>(args?: Prisma.Subset<T, OrderDraftItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderDraftItemCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OrderDraftItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderDraftItemAggregateArgs>(args: Prisma.Subset<T, OrderDraftItemAggregateArgs>): Prisma.PrismaPromise<GetOrderDraftItemAggregateType<T>>;
    /**
     * Group by OrderDraftItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderDraftItemGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OrderDraftItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderDraftItemGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderDraftItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderDraftItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderDraftItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderDraftItem model
     */
    readonly fields: OrderDraftItemFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OrderDraftItem.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OrderDraftItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    orderDraft<T extends Prisma.OrderDraftDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDraftDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderDraftClient<runtime.Types.Result.GetResult<Prisma.$OrderDraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    matchedProduct<T extends Prisma.OrderDraftItem$matchedProductArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDraftItem$matchedProductArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    matchedVariant<T extends Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDraftItem$matchedVariantArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OrderDraftItem model
 */
export interface OrderDraftItemFieldRefs {
    readonly id: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly orderDraftId: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly matchedProductId: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly matchedVariantId: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly rawText: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly name: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly color: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly size: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly quantity: Prisma.FieldRef<"OrderDraftItem", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"OrderDraftItem", 'Float'>;
    readonly isFuzzy: Prisma.FieldRef<"OrderDraftItem", 'Boolean'>;
    readonly fuzzyReason: Prisma.FieldRef<"OrderDraftItem", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OrderDraftItem", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OrderDraftItem", 'DateTime'>;
}
/**
 * OrderDraftItem findUnique
 */
export type OrderDraftItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraftItem to fetch.
     */
    where: Prisma.OrderDraftItemWhereUniqueInput;
};
/**
 * OrderDraftItem findUniqueOrThrow
 */
export type OrderDraftItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraftItem to fetch.
     */
    where: Prisma.OrderDraftItemWhereUniqueInput;
};
/**
 * OrderDraftItem findFirst
 */
export type OrderDraftItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraftItem to fetch.
     */
    where?: Prisma.OrderDraftItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDraftItems to fetch.
     */
    orderBy?: Prisma.OrderDraftItemOrderByWithRelationInput | Prisma.OrderDraftItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderDraftItems.
     */
    cursor?: Prisma.OrderDraftItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDraftItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDraftItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderDraftItems.
     */
    distinct?: Prisma.OrderDraftItemScalarFieldEnum | Prisma.OrderDraftItemScalarFieldEnum[];
};
/**
 * OrderDraftItem findFirstOrThrow
 */
export type OrderDraftItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraftItem to fetch.
     */
    where?: Prisma.OrderDraftItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDraftItems to fetch.
     */
    orderBy?: Prisma.OrderDraftItemOrderByWithRelationInput | Prisma.OrderDraftItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderDraftItems.
     */
    cursor?: Prisma.OrderDraftItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDraftItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDraftItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderDraftItems.
     */
    distinct?: Prisma.OrderDraftItemScalarFieldEnum | Prisma.OrderDraftItemScalarFieldEnum[];
};
/**
 * OrderDraftItem findMany
 */
export type OrderDraftItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OrderDraftItems to fetch.
     */
    where?: Prisma.OrderDraftItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderDraftItems to fetch.
     */
    orderBy?: Prisma.OrderDraftItemOrderByWithRelationInput | Prisma.OrderDraftItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderDraftItems.
     */
    cursor?: Prisma.OrderDraftItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderDraftItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderDraftItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderDraftItems.
     */
    distinct?: Prisma.OrderDraftItemScalarFieldEnum | Prisma.OrderDraftItemScalarFieldEnum[];
};
/**
 * OrderDraftItem create
 */
export type OrderDraftItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OrderDraftItem.
     */
    data: Prisma.XOR<Prisma.OrderDraftItemCreateInput, Prisma.OrderDraftItemUncheckedCreateInput>;
};
/**
 * OrderDraftItem createMany
 */
export type OrderDraftItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderDraftItems.
     */
    data: Prisma.OrderDraftItemCreateManyInput | Prisma.OrderDraftItemCreateManyInput[];
};
/**
 * OrderDraftItem createManyAndReturn
 */
export type OrderDraftItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDraftItem
     */
    select?: Prisma.OrderDraftItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderDraftItem
     */
    omit?: Prisma.OrderDraftItemOmit<ExtArgs> | null;
    /**
     * The data used to create many OrderDraftItems.
     */
    data: Prisma.OrderDraftItemCreateManyInput | Prisma.OrderDraftItemCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderDraftItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OrderDraftItem update
 */
export type OrderDraftItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OrderDraftItem.
     */
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateInput, Prisma.OrderDraftItemUncheckedUpdateInput>;
    /**
     * Choose, which OrderDraftItem to update.
     */
    where: Prisma.OrderDraftItemWhereUniqueInput;
};
/**
 * OrderDraftItem updateMany
 */
export type OrderDraftItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderDraftItems.
     */
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateManyMutationInput, Prisma.OrderDraftItemUncheckedUpdateManyInput>;
    /**
     * Filter which OrderDraftItems to update
     */
    where?: Prisma.OrderDraftItemWhereInput;
    /**
     * Limit how many OrderDraftItems to update.
     */
    limit?: number;
};
/**
 * OrderDraftItem updateManyAndReturn
 */
export type OrderDraftItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderDraftItem
     */
    select?: Prisma.OrderDraftItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderDraftItem
     */
    omit?: Prisma.OrderDraftItemOmit<ExtArgs> | null;
    /**
     * The data used to update OrderDraftItems.
     */
    data: Prisma.XOR<Prisma.OrderDraftItemUpdateManyMutationInput, Prisma.OrderDraftItemUncheckedUpdateManyInput>;
    /**
     * Filter which OrderDraftItems to update
     */
    where?: Prisma.OrderDraftItemWhereInput;
    /**
     * Limit how many OrderDraftItems to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderDraftItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OrderDraftItem upsert
 */
export type OrderDraftItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OrderDraftItem to update in case it exists.
     */
    where: Prisma.OrderDraftItemWhereUniqueInput;
    /**
     * In case the OrderDraftItem found by the `where` argument doesn't exist, create a new OrderDraftItem with this data.
     */
    create: Prisma.XOR<Prisma.OrderDraftItemCreateInput, Prisma.OrderDraftItemUncheckedCreateInput>;
    /**
     * In case the OrderDraftItem was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OrderDraftItemUpdateInput, Prisma.OrderDraftItemUncheckedUpdateInput>;
};
/**
 * OrderDraftItem delete
 */
export type OrderDraftItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OrderDraftItem to delete.
     */
    where: Prisma.OrderDraftItemWhereUniqueInput;
};
/**
 * OrderDraftItem deleteMany
 */
export type OrderDraftItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OrderDraftItems to delete
     */
    where?: Prisma.OrderDraftItemWhereInput;
    /**
     * Limit how many OrderDraftItems to delete.
     */
    limit?: number;
};
/**
 * OrderDraftItem.matchedProduct
 */
export type OrderDraftItem$matchedProductArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * OrderDraftItem.matchedVariant
 */
export type OrderDraftItem$matchedVariantArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * OrderDraftItem without action
 */
export type OrderDraftItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=OrderDraftItem.d.ts.map