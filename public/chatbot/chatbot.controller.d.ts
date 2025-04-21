import { ChatbotService } from './chatbot.service';
declare class ChatMessageDto {
    role: 'user' | 'model';
    text: string;
}
declare class AskConversationDto {
    messages: ChatMessageDto[];
}
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    ask(askDto: AskConversationDto): Promise<{
        reply: string;
    }>;
}
export {};
