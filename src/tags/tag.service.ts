import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Tag } from './tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async create(tag: Tag): Promise<Tag> {
    const createdTag = new this.tagModel(tag);
    return createdTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async findOne(id: string): Promise<Tag> {
    return this.tagModel.findOne({ _id: new ObjectId(id) }).exec();
  }

  async update(id: string, tag: Tag): Promise<Tag> {
    return this.tagModel
<<<<<<< HEAD
      .findOneAndUpdate({ _id: new ObjectId(id) }, tag, { new: true })
=======
      .findOneAndUpdate({ id: id }, tag, { new: true })
>>>>>>> 59b85be63f650fff9714c4e80a1896fcea16f830
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.tagModel.deleteOne({ _id: new ObjectId(id) }).exec();
  }
}
