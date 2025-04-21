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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("../config");
let ChatbotService = class ChatbotService {
    constructor() {
        const apiKey = config_1.default.gemini?.apiKey;
        if (!apiKey) {
            throw new Error('Gemini API key is not set in the config file');
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    }
    async generateResponse(messages) {
        try {
            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            };
            const safetySettings = [
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];
            const history = messages.map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.text }],
            }));
            const result = await this.model.generateContent({
                contents: history,
                generationConfig,
                safetySettings,
            });
            if (result.response &&
                result.response.candidates &&
                result.response.candidates.length > 0 &&
                result.response.candidates[0].content &&
                result.response.candidates[0].content.parts &&
                result.response.candidates[0].content.parts.length > 0) {
                return result.response.candidates[0].content.parts[0].text;
            }
            else {
                console.error('Gemini response blocked or invalid:', result.response);
                throw new common_1.InternalServerErrorException('Failed to get a valid response from the chatbot.');
            }
        }
        catch (error) {
            console.error('Error calling Gemini API:', error);
            throw new common_1.InternalServerErrorException('Failed to communicate with the chatbot service.');
        }
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map