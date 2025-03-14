import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './zuser.service';
import { UserController } from './zuser.controller';
import { ZUser, ZUserSchema } from './zuser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ZUser.name, schema: ZUserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
