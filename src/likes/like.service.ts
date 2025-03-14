import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async likePost(user: string, post: string): Promise<Like> { // Changed User to string and Post to string
    const newLike = new this.likeModel({ user: user, post: post }); // Use string IDs
    return newLike.save();
  }

  async unlikePost(user: string, post: string): Promise<void> { // Changed User to string and Post to string
    await this.likeModel.deleteOne({ user: user, post: post }).exec(); // Use string IDs
  }

  async isLiked(user: string, post: string): Promise<boolean> { // Changed User to string
    const like = await this.likeModel.findOne({ user: user, post: post }).exec();
    return !!like;
  }

  async getLikesForPost(post: string): Promise<Like[]> { // Changed Post to string
    return this.likeModel.find({ post: post }).populate('user').exec(); // Populate user details
  }

  async getLikeCountForPost(post: string): Promise<number> { // Changed Post to string
    return this.likeModel.countDocuments({ post: post }).exec();
  }
}