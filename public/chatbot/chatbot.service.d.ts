interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
export declare class ChatbotService {
    private genAI;
    private model;
    constructor();
    generateResponse(messages: ChatMessage[]): Promise<string>;
}
export {};
