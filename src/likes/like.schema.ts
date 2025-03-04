import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Post } from '../posts/post.schema';

@Schema({ timestamps: true, versionKey: false })
export class Like extends Document {
  @Prop({ type: String, ref: User.name, required: true }) // Changed to String
  user: string; // Changed to string

  @Prop({ type: String, ref: Post.name, required: true }) // Changed to String
  post: string; // Changed to string
}

export const LikeSchema = SchemaFactory.createForClass(Like);