import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongo.url), PostsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
