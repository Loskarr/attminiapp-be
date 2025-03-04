import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findPosts(limit: number, skip: number): Promise<Post[]> {
    return this.postModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({ id: id }).exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async incrementLikes(postId: string): Promise<Post> {
    return this.postModel.findOneAndUpdate(
      { id: postId },
      { $inc: { like: 1 } },
      { new: true }
    ).exec();
  }

  async decrementLikes(postId: string): Promise<Post> {
    return this.postModel.findOneAndUpdate(
      { id: postId },
      { $inc: { like: -1 } },
      { new: true }
    ).exec();
  }

  async incrementComments(postId: string): Promise<Post> {
    return this.postModel.findOneAndUpdate(
      { id: postId },
      { $inc: { comment: 1 } },
      { new: true }
    ).exec();
  }
}