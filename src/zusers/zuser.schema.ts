import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class ZUser extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;
}

export const ZUserSchema = SchemaFactory.createForClass(ZUser);
