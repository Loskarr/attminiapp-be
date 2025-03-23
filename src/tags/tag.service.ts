import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    return this.tagModel.findOne({ id: id }).exec();
  }

  async update(id: string, tag: Tag): Promise<Tag> {
    return this.tagModel
      .findOneAndUpdate({ id: id }, tag, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.tagModel.deleteOne({ id: id }).exec();
  }
}
