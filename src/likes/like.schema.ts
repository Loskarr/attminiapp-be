import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ZUser } from '../zusers/zuser.schema';
import { Post } from '../posts/post.schema';

@Schema({ timestamps: true, versionKey: false })
export class Like extends Document {
  @Prop({ type: String, ref: ZUser.name, required: true })
  user: string;

  @Prop({ type: String, ref: Post.name, required: true })
  post: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
