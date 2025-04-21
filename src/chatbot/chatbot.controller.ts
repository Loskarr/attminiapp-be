import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

class ChatMessageDto {
  @ApiProperty({
    enum: ['user', 'model'],
    description: 'The role of the sender (user or model)',
  })
  role: 'user' | 'model';

  @ApiProperty({ description: 'The text content of the message' })
  text: string;
}

class AskConversationDto {
  @ApiProperty({
    type: [ChatMessageDto],
    description: 'The conversation history including the latest user prompt',
  })
  messages: ChatMessageDto[];
}

@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send a conversation history to the chatbot and get a response',
  })
  @ApiBody({ type: AskConversationDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully received chatbot response.',
    schema: { type: 'object', properties: { reply: { type: 'string' } } },
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async ask(@Body() askDto: AskConversationDto): Promise<{ reply: string }> {
    const systemPrompt: ChatMessageDto = {
      role: 'user',
      text: `
    Bạn là An Tâm Tưới, một trợ lý ảo chuyên hỗ trợ nông dân trong việc tư vấn kỹ thuật nông nghiệp và các giải pháp tưới tiêu. 
    Bạn cung cấp thông tin chính xác, dễ hiểu, và luôn thân thiện. 
    Hãy trả lời ngắn gọn ( khoảng 200 từ ), tập trung vào việc giải quyết vấn đề của người dùng. 
    Nếu không chắc chắn về câu trả lời, hãy khuyến nghị người dùng tham khảo chuyên gia hoặc nguồn thông tin đáng tin cậy.
  `,
    };

    const messagesWithSystemPrompt = [systemPrompt, ...askDto.messages];

    const reply = await this.chatbotService.generateResponse(
      messagesWithSystemPrompt,
    );
    return { reply };
  }
}

// {
//   "messages": [
//     {
//       "role": "user",
//       "text": "Chào bạn, tôi muốn hỏi về kỹ thuật trồng lúa nước hiệu quả."
//     },
//     {
//       "role": "model",
//       "text": "Chào bạn! Kỹ thuật trồng lúa nước hiệu quả bao gồm nhiều yếu tố như chọn giống tốt, làm đất kỹ, bón phân cân đối, quản lý nước hợp lý và phòng trừ sâu bệnh kịp thời. Bạn quan tâm cụ thể đến khía cạnh nào ạ?"
//     },
//     {
//       "role": "user",
//       "text": "Tôi muốn biết về cách bón phân cân đối cho lúa."
//     }
//   ]
// }
