import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from './like.schema';
import { Post } from '../posts/post.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async likePost(user: string, post: string): Promise<Like> {
    const newLike = new this.likeModel({
      user,
      post: new Types.ObjectId(post),
    });
    return newLike.save();
  }

  async unlikePost(user: string, post: string): Promise<void> {
    await this.likeModel
      .deleteOne({
        user,
        post: new Types.ObjectId(post),
      })
      .exec();
  }

  async isLiked(user: string, post: string): Promise<boolean> {
    const like = await this.likeModel
      .findOne({
        user,
        post: new Types.ObjectId(post),
      })
      .exec();
    return !!like;
  }

  async getLikesForPost(post: string): Promise<Like[]> {
    return this.likeModel.find({ post: new Types.ObjectId(post) }).exec();
  }

  async getLikeCountForPost(post: string): Promise<number> {
    return this.likeModel
      .countDocuments({ post: new Types.ObjectId(post) })
      .exec();
  }

  async getLikedPostsByUser(userId: string): Promise<Post[]> {
    const likes = await this.likeModel
      .find({ user: userId })
      .populate({
        path: 'post',
      })
      .exec();

    return likes.map((like) => like.post as Post);
  }
}
