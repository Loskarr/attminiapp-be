import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

class Media {
  @Prop()
  ytb_video_id: string;
}

@Schema()
export class Post extends Document {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  slug: string;

  @Prop()
  short_desc: string;

  @Prop()
  content: string;

  @Prop()
  thumbnail_url: string;

  @Prop()
  has_audio: number;

  @Prop({ type: Media })
  media: Media;

  @Prop([String])
  taxonomy_ids: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
  post_categories: mongoose.Types.ObjectId[];

  @Prop([String])
  post_category_details: string[];

  @Prop()
  taxonomies: string;

  @Prop()
  status: string;

  @Prop()
  post_format: string;

  @Prop()
  status_name: string;

  @Prop()
  publish_date: string;

  @Prop()
  author: string;

  @Prop()
  is_approved: boolean;

  @Prop()
  approved_by: string;

  @Prop()
  approved_by_name: string;

  @Prop({ default: 0 })
  view: number;

  @Prop()
  is_featured: number;

  @Prop()
  keyword: string;

  @Prop()
  post_type: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }])
  tags: mongoose.Types.ObjectId[];

  @Prop()
  created_at: string;

  @Prop()
  created_by: string;

  @Prop()
  updated_at: string;

  @Prop()
  updated_by: string;

  @Prop()
  like: number;

  @Prop()
  comment: number;

  @Prop()
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
