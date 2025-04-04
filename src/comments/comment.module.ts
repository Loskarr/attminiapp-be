import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { CommentService } from './comment.service';
import { UserModule } from '../zusers/zuser.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UserModule,
  ],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
