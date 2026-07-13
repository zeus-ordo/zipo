interface LlmTask {
    conversationId: string;
    tenantId: string;
    customerId: string;
    lastMessage: string;
}
export declare function queueLlmExtraction(task: LlmTask): void;
export declare function processLlmQueue(): void;
export declare function getQueueSize(): number;
export declare function clearQueue(): void;
export {};
//# sourceMappingURL=queue.d.ts.map