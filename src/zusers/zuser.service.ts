import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ZUser } from './zuser.schema';  // Changed User to ZUser

@Injectable()
export class UserService {
  constructor(@InjectModel(ZUser.name) private zuserModel: Model<ZUser>) {}  // Changed User to ZUser and userModel to zuserModel

  async findOne(id: string): Promise<ZUser> {  // Changed User to ZUser
    const data = await this.zuserModel.findOne({ id: id }).exec();  // Changed userModel to zuserModel
    console.log(data);
    return data;
  }

  async findAll(): Promise<ZUser[]> {  // Changed User to ZUser
    const data = await this.zuserModel.find().exec();  // Changed userModel to zuserModel
    return data;
  }

  async findByName(nameFind: string): Promise<ZUser> {  // Changed User to ZUser
    const data = await this.zuserModel.findOne({ name: nameFind }).exec();  // Changed userModel to zuserModel
    console.log(data);
    return data;
  }

  async isExist(id: string): Promise<any> {
    return await this.zuserModel.findOne({ id }).exec();  // Changed userModel to zuserModel
  }

  async createUser(id: string, name: string, avatar: string): Promise<ZUser> {  // Changed User to ZUser
    const newUser = new this.zuserModel({ id, name, avatar });  // Changed userModel to zuserModel
    return await newUser.save();
  }
}