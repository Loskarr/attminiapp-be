import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/post.module';
import { UserModule } from './zusers/zuser.module';
import { CategoriesModule } from './categories/categories.module';
import { TagModule } from './tags/tag.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongo.url),
    PostsModule,
    UserModule,
    CategoriesModule,
    TagModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
