"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./comment.schema");
const zuser_service_1 = require("../zusers/zuser.service");
let CommentService = class CommentService {
    constructor(commentModel, userService) {
        this.commentModel = commentModel;
        this.userService = userService;
    }
    async createComment(user, post, content) {
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
    async getCommentsByPostId(postId) {
        return this.commentModel.find({ post: postId }).sort({ createdAt: -1 }).exec();
    }
    async getCommentById(commentId) {
        const comment = await this.commentModel.findById(commentId).exec();
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID "${commentId}" not found`);
        }
        return comment;
    }
    async deleteComment(commentId) {
        const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Comment with ID "${commentId}" not found`);
        }
    }
    async updateComment(commentId, content) {
        const updatedComment = await this.commentModel
            .findOneAndUpdate({ _id: commentId }, { content: content }, { new: true })
            .exec();
        if (!updatedComment) {
            throw new common_1.NotFoundException(`Comment with ID "${commentId}" not found`);
        }
        return updatedComment;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        zuser_service_1.UserService])
], CommentService);
//# sourceMappingURL=comment.service.js.map