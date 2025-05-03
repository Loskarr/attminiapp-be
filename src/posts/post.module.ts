import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { Post, PostSchema } from './post.schema';
import { LikeModule } from '../likes/like.module';
import { CommentModule } from '../comments/comment.module';
import { UserModule } from '../zusers/zuser.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    LikeModule,
    CommentModule,
    UserModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
