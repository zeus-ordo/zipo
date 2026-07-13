import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model Tenant
 *
 */
export type Tenant = Prisma.TenantModel;
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model LineChannel
 *
 */
export type LineChannel = Prisma.LineChannelModel;
/**
 * Model Customer
 *
 */
export type Customer = Prisma.CustomerModel;
/**
 * Model Conversation
 *
 */
export type Conversation = Prisma.ConversationModel;
/**
 * Model Message
 *
 */
export type Message = Prisma.MessageModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model ProductVariant
 *
 */
export type ProductVariant = Prisma.ProductVariantModel;
/**
 * Model OrderDraft
 *
 */
export type OrderDraft = Prisma.OrderDraftModel;
/**
 * Model OrderDraftItem
 *
 */
export type OrderDraftItem = Prisma.OrderDraftItemModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderItem
 *
 */
export type OrderItem = Prisma.OrderItemModel;
/**
 * Model NotificationTarget
 *
 */
export type NotificationTarget = Prisma.NotificationTargetModel;
/**
 * Model StoreSetting
 *
 */
export type StoreSetting = Prisma.StoreSettingModel;
/**
 * Model AuditLog
 *
 */
export type AuditLog = Prisma.AuditLogModel;
//# sourceMappingURL=client.d.ts.map