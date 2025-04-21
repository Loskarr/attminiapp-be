"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotController = void 0;
const common_1 = require("@nestjs/common");
const chatbot_service_1 = require("./chatbot.service");
const swagger_1 = require("@nestjs/swagger");
class ChatMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['user', 'model'],
        description: 'The role of the sender (user or model)',
    }),
    __metadata("design:type", String)
], ChatMessageDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The text content of the message' }),
    __metadata("design:type", String)
], ChatMessageDto.prototype, "text", void 0);
class AskConversationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ChatMessageDto],
        description: 'The conversation history including the latest user prompt',
    }),
    __metadata("design:type", Array)
], AskConversationDto.prototype, "messages", void 0);
let ChatbotController = class ChatbotController {
    constructor(chatbotService) {
        this.chatbotService = chatbotService;
    }
    async ask(askDto) {
        const systemPrompt = {
            role: 'user',
            text: `
    Bạn là An Tâm Tưới, một trợ lý ảo chuyên hỗ trợ nông dân trong việc tư vấn kỹ thuật nông nghiệp và các giải pháp tưới tiêu. 
    Bạn cung cấp thông tin chính xác, dễ hiểu, và luôn thân thiện. 
    Hãy trả lời ngắn gọn ( khoảng 200 từ ), tập trung vào việc giải quyết vấn đề của người dùng. 
    Nếu không chắc chắn về câu trả lời, hãy khuyến nghị người dùng tham khảo chuyên gia hoặc nguồn thông tin đáng tin cậy.
  `,
        };
        const messagesWithSystemPrompt = [systemPrompt, ...askDto.messages];
        const reply = await this.chatbotService.generateResponse(messagesWithSystemPrompt);
        return { reply };
    }
};
exports.ChatbotController = ChatbotController;
__decorate([
    (0, common_1.Post)('ask'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a conversation history to the chatbot and get a response',
    }),
    (0, swagger_1.ApiBody)({ type: AskConversationDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully received chatbot response.',
        schema: { type: 'object', properties: { reply: { type: 'string' } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AskConversationDto]),
    __metadata("design:returntype", Promise)
], ChatbotController.prototype, "ask", null);
exports.ChatbotController = ChatbotController = __decorate([
    (0, swagger_1.ApiTags)('chatbot'),
    (0, common_1.Controller)('chatbot'),
    __metadata("design:paramtypes", [chatbot_service_1.ChatbotService])
], ChatbotController);
//# sourceMappingURL=chatbot.controller.js.map