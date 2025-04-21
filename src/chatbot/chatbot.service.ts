import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
} from '@google/generative-ai';
import config from '../config';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

@Injectable()
export class ChatbotService {
  private genAI: GoogleGenerativeAI;
  private model;

  constructor() {
    const apiKey = config.gemini?.apiKey;

    if (!apiKey) {
      throw new Error('Gemini API key is not set in the config file');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const history: Content[] = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const result = await this.model.generateContent({
        contents: history,
        generationConfig,
        safetySettings,
      });

      if (
        result.response &&
        result.response.candidates &&
        result.response.candidates.length > 0 &&
        result.response.candidates[0].content &&
        result.response.candidates[0].content.parts &&
        result.response.candidates[0].content.parts.length > 0
      ) {
        return result.response.candidates[0].content.parts[0].text;
      } else {
        console.error('Gemini response blocked or invalid:', result.response);
        throw new InternalServerErrorException(
          'Failed to get a valid response from the chatbot.',
        );
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new InternalServerErrorException(
        'Failed to communicate with the chatbot service.',
      );
    }
  }
}
