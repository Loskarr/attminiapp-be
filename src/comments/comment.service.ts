import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createComment(
    user: string,
    post: string,
    content: string,
  ): Promise<Comment> {
    const foundUser = await this.userService.findByZid(user);

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
    return this.commentModel
      .find({ post: postId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getCommentById(commentId: string): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${commentId}" not found`);
    }
    return comment;
  }

  async deleteComment(commentId: string): Promise<void> {
    const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Comment with ID "${commentId}" not found`);
    }
  }

  async updateComment(commentId: string, content: string): Promise<Comment> {
    const updatedComment = await this.commentModel
      .findOneAndUpdate({ _id: commentId }, { content: content }, { new: true })
      .exec();

    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID "${commentId}" not found`);
    }

    return updatedComment;
  }
}
