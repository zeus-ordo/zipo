import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model NotificationTarget
 *
 */
export type NotificationTargetModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationTargetPayload>;
export type AggregateNotificationTarget = {
    _count: NotificationTargetCountAggregateOutputType | null;
    _min: NotificationTargetMinAggregateOutputType | null;
    _max: NotificationTargetMaxAggregateOutputType | null;
};
export type NotificationTargetMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    lineUserId: string | null;
    email: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NotificationTargetMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    lineUserId: string | null;
    email: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NotificationTargetCountAggregateOutputType = {
    id: number;
    tenantId: number;
    name: number;
    lineUserId: number;
    email: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type NotificationTargetMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    lineUserId?: true;
    email?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NotificationTargetMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    lineUserId?: true;
    email?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NotificationTargetCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    lineUserId?: true;
    email?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type NotificationTargetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTarget to aggregate.
     */
    where?: Prisma.NotificationTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: Prisma.NotificationTargetOrderByWithRelationInput | Prisma.NotificationTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.NotificationTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned NotificationTargets
    **/
    _count?: true | NotificationTargetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: NotificationTargetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: NotificationTargetMaxAggregateInputType;
};
export type GetNotificationTargetAggregateType<T extends NotificationTargetAggregateArgs> = {
    [P in keyof T & keyof AggregateNotificationTarget]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotificationTarget[P]> : Prisma.GetScalarType<T[P], AggregateNotificationTarget[P]>;
};
export type NotificationTargetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationTargetWhereInput;
    orderBy?: Prisma.NotificationTargetOrderByWithAggregationInput | Prisma.NotificationTargetOrderByWithAggregationInput[];
    by: Prisma.NotificationTargetScalarFieldEnum[] | Prisma.NotificationTargetScalarFieldEnum;
    having?: Prisma.NotificationTargetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationTargetCountAggregateInputType | true;
    _min?: NotificationTargetMinAggregateInputType;
    _max?: NotificationTargetMaxAggregateInputType;
};
export type NotificationTargetGroupByOutputType = {
    id: string;
    tenantId: string;
    name: string;
    lineUserId: string | null;
    email: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: NotificationTargetCountAggregateOutputType | null;
    _min: NotificationTargetMinAggregateOutputType | null;
    _max: NotificationTargetMaxAggregateOutputType | null;
};
export type GetNotificationTargetGroupByPayload<T extends NotificationTargetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationTargetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationTargetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationTargetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationTargetGroupByOutputType[P]>;
}>>;
export type NotificationTargetWhereInput = {
    AND?: Prisma.NotificationTargetWhereInput | Prisma.NotificationTargetWhereInput[];
    OR?: Prisma.NotificationTargetWhereInput[];
    NOT?: Prisma.NotificationTargetWhereInput | Prisma.NotificationTargetWhereInput[];
    id?: Prisma.StringFilter<"NotificationTarget"> | string;
    tenantId?: Prisma.StringFilter<"NotificationTarget"> | string;
    name?: Prisma.StringFilter<"NotificationTarget"> | string;
    lineUserId?: Prisma.StringNullableFilter<"NotificationTarget"> | string | null;
    email?: Prisma.StringNullableFilter<"NotificationTarget"> | string | null;
    isActive?: Prisma.BoolFilter<"NotificationTarget"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"NotificationTarget"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NotificationTarget"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
};
export type NotificationTargetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    lineUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
};
export type NotificationTargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NotificationTargetWhereInput | Prisma.NotificationTargetWhereInput[];
    OR?: Prisma.NotificationTargetWhereInput[];
    NOT?: Prisma.NotificationTargetWhereInput | Prisma.NotificationTargetWhereInput[];
    tenantId?: Prisma.StringFilter<"NotificationTarget"> | string;
    name?: Prisma.StringFilter<"NotificationTarget"> | string;
    lineUserId?: Prisma.StringNullableFilter<"NotificationTarget"> | string | null;
    email?: Prisma.StringNullableFilter<"NotificationTarget"> | string | null;
    isActive?: Prisma.BoolFilter<"NotificationTarget"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"NotificationTarget"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NotificationTarget"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
}, "id">;
export type NotificationTargetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    lineUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NotificationTargetCountOrderByAggregateInput;
    _max?: Prisma.NotificationTargetMaxOrderByAggregateInput;
    _min?: Prisma.NotificationTargetMinOrderByAggregateInput;
};
export type NotificationTargetScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationTargetScalarWhereWithAggregatesInput | Prisma.NotificationTargetScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationTargetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationTargetScalarWhereWithAggregatesInput | Prisma.NotificationTargetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"NotificationTarget"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"NotificationTarget"> | string;
    name?: Prisma.StringWithAggregatesFilter<"NotificationTarget"> | string;
    lineUserId?: Prisma.StringNullableWithAggregatesFilter<"NotificationTarget"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"NotificationTarget"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"NotificationTarget"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NotificationTarget"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"NotificationTarget"> | Date | string;
};
export type NotificationTargetCreateInput = {
    id?: string;
    name: string;
    lineUserId?: string | null;
    email?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutNotificationTargetsInput;
};
export type NotificationTargetUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    name: string;
    lineUserId?: string | null;
    email?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationTargetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    lineUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutNotificationTargetsNestedInput;
};
export type NotificationTargetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    lineUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationTargetCreateManyInput = {
    id?: string;
    tenantId: string;
    name: string;
    lineUserId?: string | null;
    email?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationTargetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    lineUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationTargetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    lineUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationTargetListRelationFilter = {
    every?: Prisma.NotificationTargetWhereInput;
    some?: Prisma.NotificationTargetWhereInput;
    none?: Prisma.NotificationTargetWhereInput;
};
export type NotificationTargetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotificationTargetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    lineUserId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationTargetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    lineUserId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationTargetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    lineUserId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationTargetCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.NotificationTargetCreateWithoutTenantInput, Prisma.NotificationTargetUncheckedCreateWithoutTenantInput> | Prisma.NotificationTargetCreateWithoutTenantInput[] | Prisma.NotificationTargetUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.NotificationTargetCreateOrConnectWithoutTenantInput | Prisma.NotificationTargetCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.NotificationTargetCreateManyTenantInputEnvelope;
    connect?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
};
export type NotificationTargetUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.NotificationTargetCreateWithoutTenantInput, Prisma.NotificationTargetUncheckedCreateWithoutTenantInput> | Prisma.NotificationTargetCreateWithoutTenantInput[] | Prisma.NotificationTargetUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.NotificationTargetCreateOrConnectWithoutTenantInput | Prisma.NotificationTargetCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.NotificationTargetCreateManyTenantInputEnvelope;
    connect?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
};
export type NotificationTargetUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationTargetCreateWithoutTenantInput, Prisma.NotificationTargetUncheckedCreateWithoutTenantInput> | Prisma.NotificationTargetCreateWithoutTenantInput[] | Prisma.NotificationTargetUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.NotificationTargetCreateOrConnectWithoutTenantInput | Prisma.NotificationTargetCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.NotificationTargetUpsertWithWhereUniqueWithoutTenantInput | Prisma.NotificationTargetUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.NotificationTargetCreateManyTenantInputEnvelope;
    set?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    disconnect?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    delete?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    connect?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    update?: Prisma.NotificationTargetUpdateWithWhereUniqueWithoutTenantInput | Prisma.NotificationTargetUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.NotificationTargetUpdateManyWithWhereWithoutTenantInput | Prisma.NotificationTargetUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.NotificationTargetScalarWhereInput | Prisma.NotificationTargetScalarWhereInput[];
};
export type NotificationTargetUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationTargetCreateWithoutTenantInput, Prisma.NotificationTargetUncheckedCreateWithoutTenantInput> | Prisma.NotificationTargetCreateWithoutTenantInput[] | Prisma.NotificationTargetUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.NotificationTargetCreateOrConnectWithoutTenantInput | Prisma.NotificationTargetCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.NotificationTargetUpsertWithWhereUniqueWithoutTenantInput | Prisma.NotificationTargetUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.NotificationTargetCreateManyTenantInputEnvelope;
    set?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    disconnect?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    delete?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    connect?: Prisma.NotificationTargetWhereUniqueInput | Prisma.NotificationTargetWhereUniqueInput[];
    update?: Prisma.NotificationTargetUpdateWithWhereUniqueWithoutTenantInput | Prisma.NotificationTargetUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.NotificationTargetUpdateManyWithWhereWithoutTenantInput | Prisma.NotificationTargetUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.NotificationTargetScalarWhereInput | Prisma.NotificationTargetScalarWhereInput[];
};
export type NotificationTargetCreateWithoutTenantInput = {
    id?: string;
    name: string;
    lineUserId?: string | null;
    email?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationTargetUncheckedCreateWithoutTenantInput = {
    id?: string;
    name: string;
    lineUserId?: string | null;
    email?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationTargetCreateOrConnectWithoutTenantInput = {
    where: Prisma.NotificationTargetWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationTargetCreateWithoutTenantInput, Prisma.NotificationTargetUncheckedCreateWithoutTenantInput>;
};
export type NotificationTargetCreateManyTenantInputEnvelope = {
    data: Prisma.NotificationTargetCreateManyTenantInput | Prisma.NotificationTargetCreateManyTenantInput[];
};
export type NotificationTargetUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.NotificationTargetWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationTargetUpdateWithoutTenantInput, Prisma.NotificationTargetUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.NotificationTargetCreateWithoutTenantInput, Prisma.NotificationTargetUncheckedCreateWithoutTenantInput>;
};
export type NotificationTargetUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.NotificationTargetWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationTargetUpdateWithoutTenantInput, Prisma.NotificationTargetUncheckedUpdateWithoutTenantInput>;
};
export type NotificationTargetUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.NotificationTargetScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationTargetUpdateManyMutationInput, Prisma.NotificationTargetUncheckedUpdateManyWithoutTenantInput>;
};
export type NotificationTargetScalarWhereInput = {
    AND?: Prisma.NotificationTargetScalarWhereInput | Prisma.NotificationTargetScalarWhereInput[];
    OR?: Prisma.NotificationTargetScalarWhereInput[];
    NOT?: Prisma.NotificationTargetScalarWhereInput | Prisma.NotificationTargetScalarWhereInput[];
    id?: Prisma.StringFilter<"NotificationTarget"> | string;
    tenantId?: Prisma.StringFilter<"NotificationTarget"> | string;
    name?: Prisma.StringFilter<"NotificationTarget"> | string;
    lineUserId?: Prisma.StringNullableFilter<"NotificationTarget"> | string | null;
    email?: Prisma.StringNullableFilter<"NotificationTarget"> | string | null;
    isActive?: Prisma.BoolFilter<"NotificationTarget"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"NotificationTarget"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NotificationTarget"> | Date | string;
};
export type NotificationTargetCreateManyTenantInput = {
    id?: string;
    name: string;
    lineUserId?: string | null;
    email?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationTargetUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    lineUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationTargetUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    lineUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationTargetUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    lineUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationTargetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    lineUserId?: boolean;
    email?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notificationTarget"]>;
export type NotificationTargetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    lineUserId?: boolean;
    email?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notificationTarget"]>;
export type NotificationTargetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    lineUserId?: boolean;
    email?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notificationTarget"]>;
export type NotificationTargetSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    lineUserId?: boolean;
    email?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type NotificationTargetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "name" | "lineUserId" | "email" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationTarget"]>;
export type NotificationTargetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type NotificationTargetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type NotificationTargetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $NotificationTargetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NotificationTarget";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        name: string;
        lineUserId: string | null;
        email: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["notificationTarget"]>;
    composites: {};
};
export type NotificationTargetGetPayload<S extends boolean | null | undefined | NotificationTargetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload, S>;
export type NotificationTargetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationTargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationTargetCountAggregateInputType | true;
};
export interface NotificationTargetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NotificationTarget'];
        meta: {
            name: 'NotificationTarget';
        };
    };
    /**
     * Find zero or one NotificationTarget that matches the filter.
     * @param {NotificationTargetFindUniqueArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationTargetFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationTargetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one NotificationTarget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationTargetFindUniqueOrThrowArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationTargetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationTargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NotificationTarget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetFindFirstArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationTargetFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationTargetFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NotificationTarget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetFindFirstOrThrowArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationTargetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationTargetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more NotificationTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationTargets
     * const notificationTargets = await prisma.notificationTarget.findMany()
     *
     * // Get first 10 NotificationTargets
     * const notificationTargets = await prisma.notificationTarget.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const notificationTargetWithIdOnly = await prisma.notificationTarget.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NotificationTargetFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationTargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a NotificationTarget.
     * @param {NotificationTargetCreateArgs} args - Arguments to create a NotificationTarget.
     * @example
     * // Create one NotificationTarget
     * const NotificationTarget = await prisma.notificationTarget.create({
     *   data: {
     *     // ... data to create a NotificationTarget
     *   }
     * })
     *
     */
    create<T extends NotificationTargetCreateArgs>(args: Prisma.SelectSubset<T, NotificationTargetCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many NotificationTargets.
     * @param {NotificationTargetCreateManyArgs} args - Arguments to create many NotificationTargets.
     * @example
     * // Create many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NotificationTargetCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationTargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many NotificationTargets and returns the data saved in the database.
     * @param {NotificationTargetCreateManyAndReturnArgs} args - Arguments to create many NotificationTargets.
     * @example
     * // Create many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many NotificationTargets and only return the `id`
     * const notificationTargetWithIdOnly = await prisma.notificationTarget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NotificationTargetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotificationTargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a NotificationTarget.
     * @param {NotificationTargetDeleteArgs} args - Arguments to delete one NotificationTarget.
     * @example
     * // Delete one NotificationTarget
     * const NotificationTarget = await prisma.notificationTarget.delete({
     *   where: {
     *     // ... filter to delete one NotificationTarget
     *   }
     * })
     *
     */
    delete<T extends NotificationTargetDeleteArgs>(args: Prisma.SelectSubset<T, NotificationTargetDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one NotificationTarget.
     * @param {NotificationTargetUpdateArgs} args - Arguments to update one NotificationTarget.
     * @example
     * // Update one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NotificationTargetUpdateArgs>(args: Prisma.SelectSubset<T, NotificationTargetUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more NotificationTargets.
     * @param {NotificationTargetDeleteManyArgs} args - Arguments to filter NotificationTargets to delete.
     * @example
     * // Delete a few NotificationTargets
     * const { count } = await prisma.notificationTarget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NotificationTargetDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationTargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NotificationTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NotificationTargetUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationTargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NotificationTargets and returns the data updated in the database.
     * @param {NotificationTargetUpdateManyAndReturnArgs} args - Arguments to update many NotificationTargets.
     * @example
     * // Update many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more NotificationTargets and only return the `id`
     * const notificationTargetWithIdOnly = await prisma.notificationTarget.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationTargetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotificationTargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one NotificationTarget.
     * @param {NotificationTargetUpsertArgs} args - Arguments to update or create a NotificationTarget.
     * @example
     * // Update or create a NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.upsert({
     *   create: {
     *     // ... data to create a NotificationTarget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationTarget we want to update
     *   }
     * })
     */
    upsert<T extends NotificationTargetUpsertArgs>(args: Prisma.SelectSubset<T, NotificationTargetUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationTargetClient<runtime.Types.Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of NotificationTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetCountArgs} args - Arguments to filter NotificationTargets to count.
     * @example
     * // Count the number of NotificationTargets
     * const count = await prisma.notificationTarget.count({
     *   where: {
     *     // ... the filter for the NotificationTargets we want to count
     *   }
     * })
    **/
    count<T extends NotificationTargetCountArgs>(args?: Prisma.Subset<T, NotificationTargetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationTargetCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a NotificationTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationTargetAggregateArgs>(args: Prisma.Subset<T, NotificationTargetAggregateArgs>): Prisma.PrismaPromise<GetNotificationTargetAggregateType<T>>;
    /**
     * Group by NotificationTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetGroupByArgs} args - Group by arguments.
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
    groupBy<T extends NotificationTargetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationTargetGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationTargetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationTargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the NotificationTarget model
     */
    readonly fields: NotificationTargetFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for NotificationTarget.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__NotificationTargetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the NotificationTarget model
 */
export interface NotificationTargetFieldRefs {
    readonly id: Prisma.FieldRef<"NotificationTarget", 'String'>;
    readonly tenantId: Prisma.FieldRef<"NotificationTarget", 'String'>;
    readonly name: Prisma.FieldRef<"NotificationTarget", 'String'>;
    readonly lineUserId: Prisma.FieldRef<"NotificationTarget", 'String'>;
    readonly email: Prisma.FieldRef<"NotificationTarget", 'String'>;
    readonly isActive: Prisma.FieldRef<"NotificationTarget", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"NotificationTarget", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"NotificationTarget", 'DateTime'>;
}
/**
 * NotificationTarget findUnique
 */
export type NotificationTargetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where: Prisma.NotificationTargetWhereUniqueInput;
};
/**
 * NotificationTarget findUniqueOrThrow
 */
export type NotificationTargetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where: Prisma.NotificationTargetWhereUniqueInput;
};
/**
 * NotificationTarget findFirst
 */
export type NotificationTargetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where?: Prisma.NotificationTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: Prisma.NotificationTargetOrderByWithRelationInput | Prisma.NotificationTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NotificationTargets.
     */
    cursor?: Prisma.NotificationTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NotificationTargets.
     */
    distinct?: Prisma.NotificationTargetScalarFieldEnum | Prisma.NotificationTargetScalarFieldEnum[];
};
/**
 * NotificationTarget findFirstOrThrow
 */
export type NotificationTargetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where?: Prisma.NotificationTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: Prisma.NotificationTargetOrderByWithRelationInput | Prisma.NotificationTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NotificationTargets.
     */
    cursor?: Prisma.NotificationTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NotificationTargets.
     */
    distinct?: Prisma.NotificationTargetScalarFieldEnum | Prisma.NotificationTargetScalarFieldEnum[];
};
/**
 * NotificationTarget findMany
 */
export type NotificationTargetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotificationTargets to fetch.
     */
    where?: Prisma.NotificationTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: Prisma.NotificationTargetOrderByWithRelationInput | Prisma.NotificationTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing NotificationTargets.
     */
    cursor?: Prisma.NotificationTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotificationTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NotificationTargets.
     */
    distinct?: Prisma.NotificationTargetScalarFieldEnum | Prisma.NotificationTargetScalarFieldEnum[];
};
/**
 * NotificationTarget create
 */
export type NotificationTargetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a NotificationTarget.
     */
    data: Prisma.XOR<Prisma.NotificationTargetCreateInput, Prisma.NotificationTargetUncheckedCreateInput>;
};
/**
 * NotificationTarget createMany
 */
export type NotificationTargetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationTargets.
     */
    data: Prisma.NotificationTargetCreateManyInput | Prisma.NotificationTargetCreateManyInput[];
};
/**
 * NotificationTarget createManyAndReturn
 */
export type NotificationTargetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: Prisma.NotificationTargetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: Prisma.NotificationTargetOmit<ExtArgs> | null;
    /**
     * The data used to create many NotificationTargets.
     */
    data: Prisma.NotificationTargetCreateManyInput | Prisma.NotificationTargetCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationTargetIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * NotificationTarget update
 */
export type NotificationTargetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a NotificationTarget.
     */
    data: Prisma.XOR<Prisma.NotificationTargetUpdateInput, Prisma.NotificationTargetUncheckedUpdateInput>;
    /**
     * Choose, which NotificationTarget to update.
     */
    where: Prisma.NotificationTargetWhereUniqueInput;
};
/**
 * NotificationTarget updateMany
 */
export type NotificationTargetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationTargets.
     */
    data: Prisma.XOR<Prisma.NotificationTargetUpdateManyMutationInput, Prisma.NotificationTargetUncheckedUpdateManyInput>;
    /**
     * Filter which NotificationTargets to update
     */
    where?: Prisma.NotificationTargetWhereInput;
    /**
     * Limit how many NotificationTargets to update.
     */
    limit?: number;
};
/**
 * NotificationTarget updateManyAndReturn
 */
export type NotificationTargetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: Prisma.NotificationTargetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: Prisma.NotificationTargetOmit<ExtArgs> | null;
    /**
     * The data used to update NotificationTargets.
     */
    data: Prisma.XOR<Prisma.NotificationTargetUpdateManyMutationInput, Prisma.NotificationTargetUncheckedUpdateManyInput>;
    /**
     * Filter which NotificationTargets to update
     */
    where?: Prisma.NotificationTargetWhereInput;
    /**
     * Limit how many NotificationTargets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationTargetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * NotificationTarget upsert
 */
export type NotificationTargetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the NotificationTarget to update in case it exists.
     */
    where: Prisma.NotificationTargetWhereUniqueInput;
    /**
     * In case the NotificationTarget found by the `where` argument doesn't exist, create a new NotificationTarget with this data.
     */
    create: Prisma.XOR<Prisma.NotificationTargetCreateInput, Prisma.NotificationTargetUncheckedCreateInput>;
    /**
     * In case the NotificationTarget was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.NotificationTargetUpdateInput, Prisma.NotificationTargetUncheckedUpdateInput>;
};
/**
 * NotificationTarget delete
 */
export type NotificationTargetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which NotificationTarget to delete.
     */
    where: Prisma.NotificationTargetWhereUniqueInput;
};
/**
 * NotificationTarget deleteMany
 */
export type NotificationTargetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTargets to delete
     */
    where?: Prisma.NotificationTargetWhereInput;
    /**
     * Limit how many NotificationTargets to delete.
     */
    limit?: number;
};
/**
 * NotificationTarget without action
 */
export type NotificationTargetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=NotificationTarget.d.ts.map