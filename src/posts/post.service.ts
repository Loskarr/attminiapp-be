import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findPosts(
    limit: number,
    skip: number,
    category?: string,
    sortBy?: string,
  ): Promise<Post[]> {
    const filter: any = {};
    if (category) {
      filter.post_categories = { $in: [category] };
    }

    let sortOptions = {};
    if (sortBy === 'view') {
      sortOptions = { view: -1 }; // Sort by view count descending
    } else if (sortBy === 'created_at') {
      sortOptions = { createdAt: -1 }; // Sort by createdAt descending
      //sortOptions = { created_at: -1 }; // Sort by created_at descending
    } else {
      sortOptions = { createdAt: -1 };
    }

    return this.postModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id }).exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async incrementLikes(postId: string): Promise<Post> {
    return this.postModel
      .findOneAndUpdate(
        { _id: postId },
        { $inc: { like: 1 } },
        { new: true },
      )
      .exec();
  }

  async decrementLikes(postId: string): Promise<Post> {
    return this.postModel
      .findOneAndUpdate(
        { _id: postId },
        { $inc: { like: -1 } },
        { new: true },
      )
      .exec();
  }

  async incrementComments(postId: string): Promise<Post> {
    return this.postModel
      .findOneAndUpdate(
        { _id: postId},
        { $inc: { comment: 1 } },
        { new: true },
      )
      .exec();
  }

  async decrementComments(postId: string): Promise<Post> {
    return this.postModel
      .findOneAndUpdate(
        { _id: postId },
        { $inc: { comment: -1 } },
        { new: true },
      )
      .exec();
    }
}
