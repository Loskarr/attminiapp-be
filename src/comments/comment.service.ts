import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { UserService } from '../zusers/zuser.service'; // Import UserService

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly userService: UserService, // Inject UserService
  ) {}

  async createComment(user: string, post: string, content: string): Promise<Comment> {
    const foundUser = await this.userService.findOne(user);

    if (!foundUser) {
      throw new Error('User not found');
    }

    const newComment = new this.commentModel({
      user: user,
      post: post,
      content: content,
      userName: foundUser.name,
      userAvatar: foundUser.avatar,
    });
    return newComment.save();
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post: postId }).exec();
  }
}