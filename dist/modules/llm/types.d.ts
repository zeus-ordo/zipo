export interface LlmCompletionRequest {
    prompt: string;
    temperature?: number;
    maxTokens?: number;
}
export interface LlmCompletionResponse {
    content: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}
//# sourceMappingURL=types.d.ts.map