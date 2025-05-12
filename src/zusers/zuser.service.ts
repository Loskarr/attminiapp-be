import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ZUser } from './zuser.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(ZUser.name) private zuserModel: Model<ZUser>) {}

  async findOne(id: string): Promise<ZUser> {
    const data = await this.zuserModel.findOne({ _id: id }).exec();
    console.log(data);
    return data;
  }

  async findByZid(id: string): Promise<ZUser> {
    const user = await this.zuserModel.findOne({ zid: id }).exec();
    if (!user) {
      throw new Error(`User with zid ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<ZUser[]> {
    const data = await this.zuserModel.find().exec();
    return data;
  }

  async findByName(nameFind: string): Promise<ZUser> {
    const data = await this.zuserModel.findOne({ name: nameFind }).exec();
    console.log(data);
    return data;
  }

  async isExist(id: string): Promise<any> {
    return await this.zuserModel.findOne({ zid: id }).exec();
  }

  async createUser(zid: string, name: string, avatar: string): Promise<ZUser> {
    const newUser = new this.zuserModel({ zid, name, avatar });
    return await newUser.save();
  }
}
