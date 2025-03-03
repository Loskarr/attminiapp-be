import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(id: string): Promise<User> {
    const data = await this.userModel.findOne({ id: id }).exec();
    console.log(data);
    return data;
  }

  async findAll(): Promise<User[]> {
    const data = await this.userModel.find().exec();
    // console.log('Database name:', this.userModel.db.name);
    // console.log('Collection name:', this.userModel.collection.name);
    // console.log('Model name:', this.userModel.modelName);
    // console.log(data);
    return data;
  }

  async findByName(nameFind: string): Promise<User> {
    const data = await this.userModel.findOne({ name: nameFind }).exec();
    console.log(data);
    return data;
  }

  async isExist(id: string): Promise<any> {
    return await this.userModel.findOne({ id }).exec();
  }

  async createUser(id: string, name: string, avatar: string): Promise<User> {
    const newUser = new this.userModel({ id, name, avatar });
    return await newUser.save();
  }
}
