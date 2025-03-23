import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Tag extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
