import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// class Media {
//   @Prop()
//   ytb_video_id: string;
// }

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
