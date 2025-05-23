import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Req,
  Headers,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiQuery,
  ApiHeader,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PostsService } from './post.service';
import { Post as PostModel } from './post.schema';
import { LikeService } from '../likes/like.service';
import { CommentService } from '../comments/comment.service';
import { Comment } from '../comments/comment.schema';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly likeService: LikeService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get posts with limit and category',
    description: 'Retrieve posts with a limit and filter by category',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit the number of posts',
    required: false,
  })
  @ApiQuery({
    name: 'category',
    type: String,
    description: 'Filter by post category',
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    description: 'Sort by view or created_at',
    required: false,
  })
  @ApiQuery({
    name: 'query',
    type: String,
    description: 'Search query',
    required: false,
  })
  @ApiCreatedResponse({
    description: 'The records have been successfully retrieved.',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('category') category?: string,
    @Query('sortBy') sortBy?: string,
    @Query('query') query?: string,
  ): Promise<PostModel[]> {
    const skip = (page - 1) * limit;
    return this.postsService.findPosts(limit, skip, category, sortBy, query);
  }

  @Post()
  @ApiOperation({ summary: 'Create a post', description: 'Create a new post' })
  @ApiBody({ type: PostModel })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(@Body() post: PostModel): Promise<PostModel> {
    return this.postsService.create(post);
  }

  @Get('liked')
  @ApiOperation({
    summary: 'Get posts liked by a user',
    description: 'Retrieve all posts liked by a specific user',
  })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    description: 'Sort by view or created_at',
    required: false,
  })
  @ApiQuery({
    name: 'query',
    type: String,
    description: 'Search term to filter posts',
    required: false,
  })
  @ApiCreatedResponse({
    description: 'The liked posts have been successfully retrieved.',
    type: [PostModel],
  })
  async getLikedPosts(
    @Req() req: Request,
    @Query('sortBy') sortBy: string = 'created_at',
    @Query('query') query?: string,
  ): Promise<PostModel[]> {
    const userId = req.headers['userid'] as string;

    let likedPosts = await this.likeService.getLikedPostsByUser(userId);

    if (query) {
      likedPosts = likedPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sortBy === 'view') {
      likedPosts.sort((a, b) => b.view - a.view);
    } else if (sortBy === 'created_at') {
      likedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return likedPosts;
  }

  @Get('recommendations')
  @ApiOperation({
    summary: 'Get recommended posts for a user',
    description:
      'Recommend posts based on user likes and recent posts using Jaccard similarity',
  })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    description: 'Sort by view or similarity',
    required: false,
  })
  @ApiQuery({
    name: 'query',
    type: String,
    description: 'Search term to filter posts',
    required: false,
  })
  @ApiCreatedResponse({
    description: 'The recommended posts have been successfully retrieved.',
  })
  async getRecommendations(
    @Req() req: Request,
    @Query('sortBy') sortBy: string = 'similarity',
    @Query('query') query?: string,
  ): Promise<PostModel[]> {
    const userId = req.headers['userid'] as string;

    const likedPosts = await this.likeService.getLikedPostsByUser(userId);

    const likedPostTags = new Set(
      likedPosts.flatMap((post) => post.tags.map((tag) => tag.toString())),
    );

    let recentPosts = await this.postsService.findPosts(60, 0);

    const likedPostIds = new Set(likedPosts.map((post) => post._id.toString()));

    recentPosts = recentPosts.filter(
      (post) => !likedPostIds.has(post._id.toString()),
    );

    if (query) {
      recentPosts = recentPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    const scoredPosts = recentPosts.map((post) => {
      const postTags = new Set(post.tags.map((tag) => tag._id.toString()));
      const intersection = new Set(
        [...likedPostTags].filter((tag) => postTags.has(tag)),
      );
      const union = new Set([...likedPostTags, ...postTags]);
      const similarity = union.size > 0 ? intersection.size / union.size : 0;

      return { post, similarity };
    });

    const sortedPosts = scoredPosts
      .sort((a, b) => {
        return b.similarity - a.similarity;
      })
      .slice(0, 10);
    if (sortBy === 'view') {
      return sortedPosts
        .map((scoredPost) => scoredPost.post)
        .sort((a, b) => b.view - a.view);
    } else if (sortBy === 'created_at') {
      return sortedPosts
        .map((scoredPost) => scoredPost.post)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return sortedPosts.map((scoredPost) => scoredPost.post);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get post by ID',
    description: 'Retrieve a post by its ID',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  @ApiCreatedResponse({
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<PostModel> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.postsService.incrementViews(id);
    return post;
  }

  @Post(':id/like')
  @ApiOperation({
    summary: 'Like/Unlike a post',
    description: 'Like or unlike a post for a user',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  async likePost(
    @Param('id') postId: string,
    @Req() req: Request,
  ): Promise<any> {
    const userId = req.headers['userid'] as string;
    const isLiked = await this.likeService.isLiked(userId, postId);

    if (isLiked) {
      await this.likeService.unlikePost(userId, postId);
      await this.postsService.decrementLikes(postId);
      return { message: 'Post unliked' };
    } else {
      await this.likeService.likePost(userId, postId);
      await this.postsService.incrementLikes(postId);
      return { message: 'Post liked' };
    }
  }

  @Get(':id/isLiked')
  @ApiOperation({
    summary: 'Check if a post is liked by a user',
    description: 'Check if a post is liked by a specific user',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  async isPostLiked(
    @Param('id') postId: string,
    @Req() req: Request,
  ): Promise<{ isLiked: boolean }> {
    const userId = req.headers['userid'] as string;
    const isLiked = await this.likeService.isLiked(userId, postId);
    return { isLiked: isLiked };
  }

  @Post(':id/comment')
  @ApiOperation({
    summary: 'Add a comment to a post',
    description: 'Add a comment to a specific post',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', description: 'Content of the comment' },
      },
      required: ['content'],
    },
  })
  async addComment(
    @Param('id') postId: string,
    @Req() req: Request,
    @Body('content') content: string,
  ): Promise<any> {
    const userId = req.headers['userid'] as string;
    const newComment = await this.commentService.createComment(
      userId,
      postId,
      content,
    );
    await this.postsService.incrementComments(postId);
    return newComment;
  }

  @Get(':id/getcomments')
  @ApiOperation({
    summary: 'Get comments for a post',
    description: 'Retrieve all comments for a specific post',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  async getCommentsForPost(@Param('id') postId: string): Promise<Comment[]> {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Delete(':id/comments/:commentId')
  @ApiOperation({
    summary: 'Delete a comment from a post',
    description: 'Delete a specific comment from a post',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  @ApiParam({
    name: 'commentId',
    type: String,
    description: 'ID of the comment to delete',
  })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  @ApiNoContentResponse({ description: 'Comment deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param('commentId') commentId: string,
    @Headers('userId') userId: string,
  ): Promise<void> {
    const comment = await this.commentService.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.user !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    await this.commentService.deleteComment(commentId);
    await this.postsService.decrementComments(comment.post);
  }

  @Put(':id/comments/:commentId')
  @ApiOperation({
    summary: 'Update a comment',
    description: 'Update the content of a specific comment',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  @ApiParam({
    name: 'commentId',
    type: String,
    description: 'ID of the comment to update',
  })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', description: 'New content for the comment' },
      },
      required: ['content'],
    },
  })
  @ApiOkResponse({ description: 'Comment updated successfully', type: Comment })
  async updateComment(
    @Param('commentId') commentId: string,
    @Headers('userId') userId: string,
    @Body('content') content: string,
  ): Promise<Comment> {
    const comment = await this.commentService.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.user !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this comment',
      );
    }
    return this.commentService.updateComment(commentId, content);
  }
}
