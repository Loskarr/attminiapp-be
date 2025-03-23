import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class ZUser extends Document {
  // Changed User to ZUser
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;
}

export const ZUserSchema = SchemaFactory.createForClass(ZUser); // Changed UserSchema to ZUserSchema
