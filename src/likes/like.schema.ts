import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from '../posts/post.schema';

@Schema({ timestamps: true, versionKey: false })
export class Like extends Document {
  @Prop()
  user: string;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post: mongoose.Types.ObjectId | Post;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
