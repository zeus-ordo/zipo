export interface ImportRow {
    name: string;
    sku?: string;
    category?: string;
    description?: string;
    base_price?: number;
    color?: string;
    size?: string;
    price?: number;
}
export declare function parseExcelFile(buffer: Buffer): Promise<ImportRow[]>;
export declare function importProducts(tenantId: string, rows: ImportRow[]): Promise<{
    success: number;
    failed: number;
    errors: string[];
}>;
//# sourceMappingURL=import.d.ts.map