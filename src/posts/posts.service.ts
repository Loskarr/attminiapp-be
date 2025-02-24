import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(limit: number): Promise<Post[]> {
    return this.postModel.find().limit(limit).exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }
}