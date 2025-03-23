import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(category: Category): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, category: Category): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, category, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
