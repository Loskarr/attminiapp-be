import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Comment extends Document {
  @Prop({ type: String, ref: 'User', required: true })
  user: string;

  @Prop({ type: String, ref: 'Post', required: true })
  post: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  userName: string;

  @Prop()
  userAvatar: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
