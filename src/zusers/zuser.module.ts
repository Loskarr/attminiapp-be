import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './zuser.service';
import { UserController } from './zuser.controller';
import { ZUser, ZUserSchema } from './zuser.schema';
import { LikeModule } from '../likes/like.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ZUser.name, schema: ZUserSchema }]),
    LikeModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
