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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const post_service_1 = require("./post.service");
const post_schema_1 = require("./post.schema");
const like_service_1 = require("../likes/like.service");
const comment_service_1 = require("../comments/comment.service");
const comment_schema_1 = require("../comments/comment.schema");
let PostsController = class PostsController {
    constructor(postsService, likeService, commentService) {
        this.postsService = postsService;
        this.likeService = likeService;
        this.commentService = commentService;
    }
    async findAll(page = 1, limit = 20, category) {
        const skip = (page - 1) * limit;
        return this.postsService.findPosts(limit, skip, category);
    }
    async findOne(id) {
        return this.postsService.findOne(id);
    }
    async create(post) {
        return this.postsService.create(post);
    }
    async likePost(postId, req) {
        const userId = req.headers['userid'];
        const isLiked = await this.likeService.isLiked(userId, postId);
        if (isLiked) {
            await this.likeService.unlikePost(userId, postId);
            await this.postsService.decrementLikes(postId);
            return { message: 'Post unliked' };
        }
        else {
            await this.likeService.likePost(userId, postId);
            await this.postsService.incrementLikes(postId);
            return { message: 'Post liked' };
        }
    }
    async isPostLiked(postId, req) {
        const userId = req.headers['userid'];
        const isLiked = await this.likeService.isLiked(userId, postId);
        return { isLiked: isLiked };
    }
    async addComment(postId, req, content) {
        const userId = req.headers['userid'];
        const newComment = await this.commentService.createComment(userId, postId, content);
        await this.postsService.incrementComments(postId);
        return newComment;
    }
    async getCommentsForPost(postId) {
        return this.commentService.getCommentsByPostId(postId);
    }
    async deleteComment(commentId, userId) {
        const comment = await this.commentService.getCommentById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        if (comment.user !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to delete this comment');
        }
        await this.commentService.deleteComment(commentId);
        await this.postsService.decrementComments(comment.post);
    }
    async updateComment(commentId, userId, content) {
        const comment = await this.commentService.getCommentById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        if (comment.user !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to update this comment');
        }
        return this.commentService.updateComment(commentId, content);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get posts with limit and category', description: 'Retrieve posts with a limit and filter by category' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, description: 'Page number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, description: 'Limit the number of posts', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'category', type: String, description: 'Filter by post category', required: false }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The records have been successfully retrieved.' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get post by ID', description: 'Retrieve a post by its ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the post' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The record has been successfully retrieved.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a post', description: 'Create a new post' }),
    (0, swagger_1.ApiBody)({ type: post_schema_1.Post }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The record has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_schema_1.Post]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    (0, swagger_1.ApiOperation)({ summary: 'Like/Unlike a post', description: 'Like or unlike a post for a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the post' }),
    (0, swagger_1.ApiHeader)({ name: 'userId', description: 'ID of the user' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "likePost", null);
__decorate([
    (0, common_1.Get)(':id/isLiked'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if a post is liked by a user', description: 'Check if a post is liked by a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the post' }),
    (0, swagger_1.ApiHeader)({ name: 'userId', description: 'ID of the user' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "isPostLiked", null);
__decorate([
    (0, common_1.Post)(':id/comment'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a post', description: 'Add a comment to a specific post' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the post' }),
    (0, swagger_1.ApiHeader)({ name: 'userId', description: 'ID of the user' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                content: { type: 'string', description: 'Content of the comment' },
            },
            required: ['content'],
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)(':id/getcomments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get comments for a post', description: 'Retrieve all comments for a specific post' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the post' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getCommentsForPost", null);
__decorate([
    (0, common_1.Delete)(':id/comments/:commentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment from a post', description: 'Delete a specific comment from a post' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the post' }),
    (0, swagger_1.ApiParam)({ name: 'commentId', type: String, description: 'ID of the comment to delete' }),
    (0, swagger_1.ApiHeader)({ name: 'userId', description: 'ID of the user' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Comment deleted successfully' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Headers)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Put)(':id/comments/:commentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a comment', description: 'Update the content of a specific comment' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the post' }),
    (0, swagger_1.ApiParam)({ name: 'commentId', type: String, description: 'ID of the comment to update' }),
    (0, swagger_1.ApiHeader)({ name: 'userId', description: 'ID of the user' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                content: { type: 'string', description: 'New content for the comment' },
            },
            required: ['content'],
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Comment updated successfully', type: comment_schema_1.Comment }),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Headers)('userId')),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateComment", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, swagger_1.ApiTags)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostsService,
        like_service_1.LikeService,
        comment_service_1.CommentService])
], PostsController);
//# sourceMappingURL=post.controller.js.map