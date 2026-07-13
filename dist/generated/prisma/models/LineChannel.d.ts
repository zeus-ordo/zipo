import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model LineChannel
 *
 */
export type LineChannelModel = runtime.Types.Result.DefaultSelection<Prisma.$LineChannelPayload>;
export type AggregateLineChannel = {
    _count: LineChannelCountAggregateOutputType | null;
    _min: LineChannelMinAggregateOutputType | null;
    _max: LineChannelMaxAggregateOutputType | null;
};
export type LineChannelMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    channelId: string | null;
    channelSecret: string | null;
    channelAccessToken: string | null;
    webhookUrl: string | null;
    webhookEnabled: boolean | null;
    webhookVerifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LineChannelMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    channelId: string | null;
    channelSecret: string | null;
    channelAccessToken: string | null;
    webhookUrl: string | null;
    webhookEnabled: boolean | null;
    webhookVerifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LineChannelCountAggregateOutputType = {
    id: number;
    tenantId: number;
    channelId: number;
    channelSecret: number;
    channelAccessToken: number;
    webhookUrl: number;
    webhookEnabled: number;
    webhookVerifiedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LineChannelMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    channelId?: true;
    channelSecret?: true;
    channelAccessToken?: true;
    webhookUrl?: true;
    webhookEnabled?: true;
    webhookVerifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LineChannelMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    channelId?: true;
    channelSecret?: true;
    channelAccessToken?: true;
    webhookUrl?: true;
    webhookEnabled?: true;
    webhookVerifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LineChannelCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    channelId?: true;
    channelSecret?: true;
    channelAccessToken?: true;
    webhookUrl?: true;
    webhookEnabled?: true;
    webhookVerifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LineChannelAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LineChannel to aggregate.
     */
    where?: Prisma.LineChannelWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LineChannels to fetch.
     */
    orderBy?: Prisma.LineChannelOrderByWithRelationInput | Prisma.LineChannelOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LineChannelWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LineChannels from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LineChannels.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned LineChannels
    **/
    _count?: true | LineChannelCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LineChannelMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LineChannelMaxAggregateInputType;
};
export type GetLineChannelAggregateType<T extends LineChannelAggregateArgs> = {
    [P in keyof T & keyof AggregateLineChannel]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLineChannel[P]> : Prisma.GetScalarType<T[P], AggregateLineChannel[P]>;
};
export type LineChannelGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LineChannelWhereInput;
    orderBy?: Prisma.LineChannelOrderByWithAggregationInput | Prisma.LineChannelOrderByWithAggregationInput[];
    by: Prisma.LineChannelScalarFieldEnum[] | Prisma.LineChannelScalarFieldEnum;
    having?: Prisma.LineChannelScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LineChannelCountAggregateInputType | true;
    _min?: LineChannelMinAggregateInputType;
    _max?: LineChannelMaxAggregateInputType;
};
export type LineChannelGroupByOutputType = {
    id: string;
    tenantId: string;
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
    webhookUrl: string | null;
    webhookEnabled: boolean;
    webhookVerifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LineChannelCountAggregateOutputType | null;
    _min: LineChannelMinAggregateOutputType | null;
    _max: LineChannelMaxAggregateOutputType | null;
};
export type GetLineChannelGroupByPayload<T extends LineChannelGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LineChannelGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LineChannelGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LineChannelGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LineChannelGroupByOutputType[P]>;
}>>;
export type LineChannelWhereInput = {
    AND?: Prisma.LineChannelWhereInput | Prisma.LineChannelWhereInput[];
    OR?: Prisma.LineChannelWhereInput[];
    NOT?: Prisma.LineChannelWhereInput | Prisma.LineChannelWhereInput[];
    id?: Prisma.StringFilter<"LineChannel"> | string;
    tenantId?: Prisma.StringFilter<"LineChannel"> | string;
    channelId?: Prisma.StringFilter<"LineChannel"> | string;
    channelSecret?: Prisma.StringFilter<"LineChannel"> | string;
    channelAccessToken?: Prisma.StringFilter<"LineChannel"> | string;
    webhookUrl?: Prisma.StringNullableFilter<"LineChannel"> | string | null;
    webhookEnabled?: Prisma.BoolFilter<"LineChannel"> | boolean;
    webhookVerifiedAt?: Prisma.DateTimeNullableFilter<"LineChannel"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"LineChannel"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LineChannel"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
};
export type LineChannelOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    channelSecret?: Prisma.SortOrder;
    channelAccessToken?: Prisma.SortOrder;
    webhookUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    webhookEnabled?: Prisma.SortOrder;
    webhookVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
};
export type LineChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId?: string;
    channelId?: string;
    AND?: Prisma.LineChannelWhereInput | Prisma.LineChannelWhereInput[];
    OR?: Prisma.LineChannelWhereInput[];
    NOT?: Prisma.LineChannelWhereInput | Prisma.LineChannelWhereInput[];
    channelSecret?: Prisma.StringFilter<"LineChannel"> | string;
    channelAccessToken?: Prisma.StringFilter<"LineChannel"> | string;
    webhookUrl?: Prisma.StringNullableFilter<"LineChannel"> | string | null;
    webhookEnabled?: Prisma.BoolFilter<"LineChannel"> | boolean;
    webhookVerifiedAt?: Prisma.DateTimeNullableFilter<"LineChannel"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"LineChannel"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LineChannel"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
}, "id" | "tenantId" | "channelId">;
export type LineChannelOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    channelSecret?: Prisma.SortOrder;
    channelAccessToken?: Prisma.SortOrder;
    webhookUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    webhookEnabled?: Prisma.SortOrder;
    webhookVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LineChannelCountOrderByAggregateInput;
    _max?: Prisma.LineChannelMaxOrderByAggregateInput;
    _min?: Prisma.LineChannelMinOrderByAggregateInput;
};
export type LineChannelScalarWhereWithAggregatesInput = {
    AND?: Prisma.LineChannelScalarWhereWithAggregatesInput | Prisma.LineChannelScalarWhereWithAggregatesInput[];
    OR?: Prisma.LineChannelScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LineChannelScalarWhereWithAggregatesInput | Prisma.LineChannelScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"LineChannel"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"LineChannel"> | string;
    channelId?: Prisma.StringWithAggregatesFilter<"LineChannel"> | string;
    channelSecret?: Prisma.StringWithAggregatesFilter<"LineChannel"> | string;
    channelAccessToken?: Prisma.StringWithAggregatesFilter<"LineChannel"> | string;
    webhookUrl?: Prisma.StringNullableWithAggregatesFilter<"LineChannel"> | string | null;
    webhookEnabled?: Prisma.BoolWithAggregatesFilter<"LineChannel"> | boolean;
    webhookVerifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"LineChannel"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LineChannel"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"LineChannel"> | Date | string;
};
export type LineChannelCreateInput = {
    id?: string;
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
    webhookUrl?: string | null;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutLineChannelsInput;
};
export type LineChannelUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
    webhookUrl?: string | null;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LineChannelUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelSecret?: Prisma.StringFieldUpdateOperationsInput | string;
    channelAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    webhookVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutLineChannelsNestedInput;
};
export type LineChannelUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelSecret?: Prisma.StringFieldUpdateOperationsInput | string;
    channelAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    webhookVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LineChannelCreateManyInput = {
    id?: string;
    tenantId: string;
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
    webhookUrl?: string | null;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LineChannelUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelSecret?: Prisma.StringFieldUpdateOperationsInput | string;
    channelAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    webhookVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LineChannelUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelSecret?: Prisma.StringFieldUpdateOperationsInput | string;
    channelAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    webhookVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LineChannelListRelationFilter = {
    every?: Prisma.LineChannelWhereInput;
    some?: Prisma.LineChannelWhereInput;
    none?: Prisma.LineChannelWhereInput;
};
export type LineChannelOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LineChannelCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    channelSecret?: Prisma.SortOrder;
    channelAccessToken?: Prisma.SortOrder;
    webhookUrl?: Prisma.SortOrder;
    webhookEnabled?: Prisma.SortOrder;
    webhookVerifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LineChannelMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    channelSecret?: Prisma.SortOrder;
    channelAccessToken?: Prisma.SortOrder;
    webhookUrl?: Prisma.SortOrder;
    webhookEnabled?: Prisma.SortOrder;
    webhookVerifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LineChannelMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    channelSecret?: Prisma.SortOrder;
    channelAccessToken?: Prisma.SortOrder;
    webhookUrl?: Prisma.SortOrder;
    webhookEnabled?: Prisma.SortOrder;
    webhookVerifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LineChannelCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.LineChannelCreateWithoutTenantInput, Prisma.LineChannelUncheckedCreateWithoutTenantInput> | Prisma.LineChannelCreateWithoutTenantInput[] | Prisma.LineChannelUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LineChannelCreateOrConnectWithoutTenantInput | Prisma.LineChannelCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.LineChannelCreateManyTenantInputEnvelope;
    connect?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
};
export type LineChannelUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.LineChannelCreateWithoutTenantInput, Prisma.LineChannelUncheckedCreateWithoutTenantInput> | Prisma.LineChannelCreateWithoutTenantInput[] | Prisma.LineChannelUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LineChannelCreateOrConnectWithoutTenantInput | Prisma.LineChannelCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.LineChannelCreateManyTenantInputEnvelope;
    connect?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
};
export type LineChannelUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.LineChannelCreateWithoutTenantInput, Prisma.LineChannelUncheckedCreateWithoutTenantInput> | Prisma.LineChannelCreateWithoutTenantInput[] | Prisma.LineChannelUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LineChannelCreateOrConnectWithoutTenantInput | Prisma.LineChannelCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.LineChannelUpsertWithWhereUniqueWithoutTenantInput | Prisma.LineChannelUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.LineChannelCreateManyTenantInputEnvelope;
    set?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    disconnect?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    delete?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    connect?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    update?: Prisma.LineChannelUpdateWithWhereUniqueWithoutTenantInput | Prisma.LineChannelUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.LineChannelUpdateManyWithWhereWithoutTenantInput | Prisma.LineChannelUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.LineChannelScalarWhereInput | Prisma.LineChannelScalarWhereInput[];
};
export type LineChannelUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.LineChannelCreateWithoutTenantInput, Prisma.LineChannelUncheckedCreateWithoutTenantInput> | Prisma.LineChannelCreateWithoutTenantInput[] | Prisma.LineChannelUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LineChannelCreateOrConnectWithoutTenantInput | Prisma.LineChannelCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.LineChannelUpsertWithWhereUniqueWithoutTenantInput | Prisma.LineChannelUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.LineChannelCreateManyTenantInputEnvelope;
    set?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    disconnect?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    delete?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    connect?: Prisma.LineChannelWhereUniqueInput | Prisma.LineChannelWhereUniqueInput[];
    update?: Prisma.LineChannelUpdateWithWhereUniqueWithoutTenantInput | Prisma.LineChannelUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.LineChannelUpdateManyWithWhereWithoutTenantInput | Prisma.LineChannelUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.LineChannelScalarWhereInput | Prisma.LineChannelScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type LineChannelCreateWithoutTenantInput = {
    id?: string;
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
    webhookUrl?: string | null;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LineChannelUncheckedCreateWithoutTenantInput = {
    id?: string;
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
    webhookUrl?: string | null;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LineChannelCreateOrConnectWithoutTenantInput = {
    where: Prisma.LineChannelWhereUniqueInput;
    create: Prisma.XOR<Prisma.LineChannelCreateWithoutTenantInput, Prisma.LineChannelUncheckedCreateWithoutTenantInput>;
};
export type LineChannelCreateManyTenantInputEnvelope = {
    data: Prisma.LineChannelCreateManyTenantInput | Prisma.LineChannelCreateManyTenantInput[];
};
export type LineChannelUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.LineChannelWhereUniqueInput;
    update: Prisma.XOR<Prisma.LineChannelUpdateWithoutTenantInput, Prisma.LineChannelUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.LineChannelCreateWithoutTenantInput, Prisma.LineChannelUncheckedCreateWithoutTenantInput>;
};
export type LineChannelUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.LineChannelWhereUniqueInput;
    data: Prisma.XOR<Prisma.LineChannelUpdateWithoutTenantInput, Prisma.LineChannelUncheckedUpdateWithoutTenantInput>;
};
export type LineChannelUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.LineChannelScalarWhereInput;
    data: Prisma.XOR<Prisma.LineChannelUpdateManyMutationInput, Prisma.LineChannelUncheckedUpdateManyWithoutTenantInput>;
};
export type LineChannelScalarWhereInput = {
    AND?: Prisma.LineChannelScalarWhereInput | Prisma.LineChannelScalarWhereInput[];
    OR?: Prisma.LineChannelScalarWhereInput[];
    NOT?: Prisma.LineChannelScalarWhereInput | Prisma.LineChannelScalarWhereInput[];
    id?: Prisma.StringFilter<"LineChannel"> | string;
    tenantId?: Prisma.StringFilter<"LineChannel"> | string;
    channelId?: Prisma.StringFilter<"LineChannel"> | string;
    channelSecret?: Prisma.StringFilter<"LineChannel"> | string;
    channelAccessToken?: Prisma.StringFilter<"LineChannel"> | string;
    webhookUrl?: Prisma.StringNullableFilter<"LineChannel"> | string | null;
    webhookEnabled?: Prisma.BoolFilter<"LineChannel"> | boolean;
    webhookVerifiedAt?: Prisma.DateTimeNullableFilter<"LineChannel"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"LineChannel"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LineChannel"> | Date | string;
};
export type LineChannelCreateManyTenantInput = {
    id?: string;
    channelId: string;
    channelSecret: string;
    channelAccessToken: string;
    webhookUrl?: string | null;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LineChannelUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelSecret?: Prisma.StringFieldUpdateOperationsInput | string;
    channelAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    webhookVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LineChannelUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelSecret?: Prisma.StringFieldUpdateOperationsInput | string;
    channelAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    webhookVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LineChannelUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelSecret?: Prisma.StringFieldUpdateOperationsInput | string;
    channelAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    webhookVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LineChannelSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    channelId?: boolean;
    channelSecret?: boolean;
    channelAccessToken?: boolean;
    webhookUrl?: boolean;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lineChannel"]>;
export type LineChannelSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    channelId?: boolean;
    channelSecret?: boolean;
    channelAccessToken?: boolean;
    webhookUrl?: boolean;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lineChannel"]>;
export type LineChannelSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    channelId?: boolean;
    channelSecret?: boolean;
    channelAccessToken?: boolean;
    webhookUrl?: boolean;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lineChannel"]>;
export type LineChannelSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    channelId?: boolean;
    channelSecret?: boolean;
    channelAccessToken?: boolean;
    webhookUrl?: boolean;
    webhookEnabled?: boolean;
    webhookVerifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LineChannelOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "channelId" | "channelSecret" | "channelAccessToken" | "webhookUrl" | "webhookEnabled" | "webhookVerifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["lineChannel"]>;
export type LineChannelInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type LineChannelIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type LineChannelIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $LineChannelPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LineChannel";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        channelId: string;
        channelSecret: string;
        channelAccessToken: string;
        webhookUrl: string | null;
        webhookEnabled: boolean;
        webhookVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["lineChannel"]>;
    composites: {};
};
export type LineChannelGetPayload<S extends boolean | null | undefined | LineChannelDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LineChannelPayload, S>;
export type LineChannelCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LineChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LineChannelCountAggregateInputType | true;
};
export interface LineChannelDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LineChannel'];
        meta: {
            name: 'LineChannel';
        };
    };
    /**
     * Find zero or one LineChannel that matches the filter.
     * @param {LineChannelFindUniqueArgs} args - Arguments to find a LineChannel
     * @example
     * // Get one LineChannel
     * const lineChannel = await prisma.lineChannel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LineChannelFindUniqueArgs>(args: Prisma.SelectSubset<T, LineChannelFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one LineChannel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LineChannelFindUniqueOrThrowArgs} args - Arguments to find a LineChannel
     * @example
     * // Get one LineChannel
     * const lineChannel = await prisma.lineChannel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LineChannelFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LineChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LineChannel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineChannelFindFirstArgs} args - Arguments to find a LineChannel
     * @example
     * // Get one LineChannel
     * const lineChannel = await prisma.lineChannel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LineChannelFindFirstArgs>(args?: Prisma.SelectSubset<T, LineChannelFindFirstArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LineChannel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineChannelFindFirstOrThrowArgs} args - Arguments to find a LineChannel
     * @example
     * // Get one LineChannel
     * const lineChannel = await prisma.lineChannel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LineChannelFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LineChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more LineChannels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineChannelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LineChannels
     * const lineChannels = await prisma.lineChannel.findMany()
     *
     * // Get first 10 LineChannels
     * const lineChannels = await prisma.lineChannel.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const lineChannelWithIdOnly = await prisma.lineChannel.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LineChannelFindManyArgs>(args?: Prisma.SelectSubset<T, LineChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a LineChannel.
     * @param {LineChannelCreateArgs} args - Arguments to create a LineChannel.
     * @example
     * // Create one LineChannel
     * const LineChannel = await prisma.lineChannel.create({
     *   data: {
     *     // ... data to create a LineChannel
     *   }
     * })
     *
     */
    create<T extends LineChannelCreateArgs>(args: Prisma.SelectSubset<T, LineChannelCreateArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many LineChannels.
     * @param {LineChannelCreateManyArgs} args - Arguments to create many LineChannels.
     * @example
     * // Create many LineChannels
     * const lineChannel = await prisma.lineChannel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LineChannelCreateManyArgs>(args?: Prisma.SelectSubset<T, LineChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many LineChannels and returns the data saved in the database.
     * @param {LineChannelCreateManyAndReturnArgs} args - Arguments to create many LineChannels.
     * @example
     * // Create many LineChannels
     * const lineChannel = await prisma.lineChannel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many LineChannels and only return the `id`
     * const lineChannelWithIdOnly = await prisma.lineChannel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LineChannelCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LineChannelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a LineChannel.
     * @param {LineChannelDeleteArgs} args - Arguments to delete one LineChannel.
     * @example
     * // Delete one LineChannel
     * const LineChannel = await prisma.lineChannel.delete({
     *   where: {
     *     // ... filter to delete one LineChannel
     *   }
     * })
     *
     */
    delete<T extends LineChannelDeleteArgs>(args: Prisma.SelectSubset<T, LineChannelDeleteArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one LineChannel.
     * @param {LineChannelUpdateArgs} args - Arguments to update one LineChannel.
     * @example
     * // Update one LineChannel
     * const lineChannel = await prisma.lineChannel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LineChannelUpdateArgs>(args: Prisma.SelectSubset<T, LineChannelUpdateArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more LineChannels.
     * @param {LineChannelDeleteManyArgs} args - Arguments to filter LineChannels to delete.
     * @example
     * // Delete a few LineChannels
     * const { count } = await prisma.lineChannel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LineChannelDeleteManyArgs>(args?: Prisma.SelectSubset<T, LineChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LineChannels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LineChannels
     * const lineChannel = await prisma.lineChannel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LineChannelUpdateManyArgs>(args: Prisma.SelectSubset<T, LineChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LineChannels and returns the data updated in the database.
     * @param {LineChannelUpdateManyAndReturnArgs} args - Arguments to update many LineChannels.
     * @example
     * // Update many LineChannels
     * const lineChannel = await prisma.lineChannel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more LineChannels and only return the `id`
     * const lineChannelWithIdOnly = await prisma.lineChannel.updateManyAndReturn({
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
    updateManyAndReturn<T extends LineChannelUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LineChannelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one LineChannel.
     * @param {LineChannelUpsertArgs} args - Arguments to update or create a LineChannel.
     * @example
     * // Update or create a LineChannel
     * const lineChannel = await prisma.lineChannel.upsert({
     *   create: {
     *     // ... data to create a LineChannel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LineChannel we want to update
     *   }
     * })
     */
    upsert<T extends LineChannelUpsertArgs>(args: Prisma.SelectSubset<T, LineChannelUpsertArgs<ExtArgs>>): Prisma.Prisma__LineChannelClient<runtime.Types.Result.GetResult<Prisma.$LineChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of LineChannels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineChannelCountArgs} args - Arguments to filter LineChannels to count.
     * @example
     * // Count the number of LineChannels
     * const count = await prisma.lineChannel.count({
     *   where: {
     *     // ... the filter for the LineChannels we want to count
     *   }
     * })
    **/
    count<T extends LineChannelCountArgs>(args?: Prisma.Subset<T, LineChannelCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LineChannelCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a LineChannel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LineChannelAggregateArgs>(args: Prisma.Subset<T, LineChannelAggregateArgs>): Prisma.PrismaPromise<GetLineChannelAggregateType<T>>;
    /**
     * Group by LineChannel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineChannelGroupByArgs} args - Group by arguments.
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
    groupBy<T extends LineChannelGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LineChannelGroupByArgs['orderBy'];
    } : {
        orderBy?: LineChannelGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LineChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLineChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the LineChannel model
     */
    readonly fields: LineChannelFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for LineChannel.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LineChannelClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the LineChannel model
 */
export interface LineChannelFieldRefs {
    readonly id: Prisma.FieldRef<"LineChannel", 'String'>;
    readonly tenantId: Prisma.FieldRef<"LineChannel", 'String'>;
    readonly channelId: Prisma.FieldRef<"LineChannel", 'String'>;
    readonly channelSecret: Prisma.FieldRef<"LineChannel", 'String'>;
    readonly channelAccessToken: Prisma.FieldRef<"LineChannel", 'String'>;
    readonly webhookUrl: Prisma.FieldRef<"LineChannel", 'String'>;
    readonly webhookEnabled: Prisma.FieldRef<"LineChannel", 'Boolean'>;
    readonly webhookVerifiedAt: Prisma.FieldRef<"LineChannel", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"LineChannel", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"LineChannel", 'DateTime'>;
}
/**
 * LineChannel findUnique
 */
export type LineChannelFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which LineChannel to fetch.
     */
    where: Prisma.LineChannelWhereUniqueInput;
};
/**
 * LineChannel findUniqueOrThrow
 */
export type LineChannelFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which LineChannel to fetch.
     */
    where: Prisma.LineChannelWhereUniqueInput;
};
/**
 * LineChannel findFirst
 */
export type LineChannelFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which LineChannel to fetch.
     */
    where?: Prisma.LineChannelWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LineChannels to fetch.
     */
    orderBy?: Prisma.LineChannelOrderByWithRelationInput | Prisma.LineChannelOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LineChannels.
     */
    cursor?: Prisma.LineChannelWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LineChannels from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LineChannels.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LineChannels.
     */
    distinct?: Prisma.LineChannelScalarFieldEnum | Prisma.LineChannelScalarFieldEnum[];
};
/**
 * LineChannel findFirstOrThrow
 */
export type LineChannelFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which LineChannel to fetch.
     */
    where?: Prisma.LineChannelWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LineChannels to fetch.
     */
    orderBy?: Prisma.LineChannelOrderByWithRelationInput | Prisma.LineChannelOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LineChannels.
     */
    cursor?: Prisma.LineChannelWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LineChannels from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LineChannels.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LineChannels.
     */
    distinct?: Prisma.LineChannelScalarFieldEnum | Prisma.LineChannelScalarFieldEnum[];
};
/**
 * LineChannel findMany
 */
export type LineChannelFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which LineChannels to fetch.
     */
    where?: Prisma.LineChannelWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LineChannels to fetch.
     */
    orderBy?: Prisma.LineChannelOrderByWithRelationInput | Prisma.LineChannelOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing LineChannels.
     */
    cursor?: Prisma.LineChannelWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LineChannels from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LineChannels.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LineChannels.
     */
    distinct?: Prisma.LineChannelScalarFieldEnum | Prisma.LineChannelScalarFieldEnum[];
};
/**
 * LineChannel create
 */
export type LineChannelCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a LineChannel.
     */
    data: Prisma.XOR<Prisma.LineChannelCreateInput, Prisma.LineChannelUncheckedCreateInput>;
};
/**
 * LineChannel createMany
 */
export type LineChannelCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many LineChannels.
     */
    data: Prisma.LineChannelCreateManyInput | Prisma.LineChannelCreateManyInput[];
};
/**
 * LineChannel createManyAndReturn
 */
export type LineChannelCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineChannel
     */
    select?: Prisma.LineChannelSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LineChannel
     */
    omit?: Prisma.LineChannelOmit<ExtArgs> | null;
    /**
     * The data used to create many LineChannels.
     */
    data: Prisma.LineChannelCreateManyInput | Prisma.LineChannelCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LineChannelIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * LineChannel update
 */
export type LineChannelUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a LineChannel.
     */
    data: Prisma.XOR<Prisma.LineChannelUpdateInput, Prisma.LineChannelUncheckedUpdateInput>;
    /**
     * Choose, which LineChannel to update.
     */
    where: Prisma.LineChannelWhereUniqueInput;
};
/**
 * LineChannel updateMany
 */
export type LineChannelUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update LineChannels.
     */
    data: Prisma.XOR<Prisma.LineChannelUpdateManyMutationInput, Prisma.LineChannelUncheckedUpdateManyInput>;
    /**
     * Filter which LineChannels to update
     */
    where?: Prisma.LineChannelWhereInput;
    /**
     * Limit how many LineChannels to update.
     */
    limit?: number;
};
/**
 * LineChannel updateManyAndReturn
 */
export type LineChannelUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineChannel
     */
    select?: Prisma.LineChannelSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LineChannel
     */
    omit?: Prisma.LineChannelOmit<ExtArgs> | null;
    /**
     * The data used to update LineChannels.
     */
    data: Prisma.XOR<Prisma.LineChannelUpdateManyMutationInput, Prisma.LineChannelUncheckedUpdateManyInput>;
    /**
     * Filter which LineChannels to update
     */
    where?: Prisma.LineChannelWhereInput;
    /**
     * Limit how many LineChannels to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LineChannelIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * LineChannel upsert
 */
export type LineChannelUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the LineChannel to update in case it exists.
     */
    where: Prisma.LineChannelWhereUniqueInput;
    /**
     * In case the LineChannel found by the `where` argument doesn't exist, create a new LineChannel with this data.
     */
    create: Prisma.XOR<Prisma.LineChannelCreateInput, Prisma.LineChannelUncheckedCreateInput>;
    /**
     * In case the LineChannel was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LineChannelUpdateInput, Prisma.LineChannelUncheckedUpdateInput>;
};
/**
 * LineChannel delete
 */
export type LineChannelDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which LineChannel to delete.
     */
    where: Prisma.LineChannelWhereUniqueInput;
};
/**
 * LineChannel deleteMany
 */
export type LineChannelDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LineChannels to delete
     */
    where?: Prisma.LineChannelWhereInput;
    /**
     * Limit how many LineChannels to delete.
     */
    limit?: number;
};
/**
 * LineChannel without action
 */
export type LineChannelDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=LineChannel.d.ts.map