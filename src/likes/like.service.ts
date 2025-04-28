import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async likePost(user: string, post: string): Promise<Like> {
    const newLike = new this.likeModel({ user: user, post: post });
    return newLike.save();
  }

  async unlikePost(user: string, post: string): Promise<void> {
    await this.likeModel.deleteOne({ user: user, post: post }).exec();
  }

  async isLiked(user: string, post: string): Promise<boolean> {
    const like = await this.likeModel
      .findOne({ user: user, post: post })
      .exec();
    return !!like;
  }

  async getLikesForPost(post: string): Promise<Like[]> {
    return this.likeModel.find({ post: post }).populate('user').exec(); // Populate user details
  }

  async getLikeCountForPost(post: string): Promise<number> {
    return this.likeModel.countDocuments({ post: post }).exec();
  }

  async getLikedPostsByUser(userId: string): Promise<Like[]> {
    return this.likeModel.find({ user: userId }).exec();
  }
}
