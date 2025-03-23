import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './like.schema';
import { LikeService } from './like.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  providers: [LikeService],
  exports: [LikeService], // Export LikeService if you need to use it in other modules
})
export class LikeModule {}
