import { Controller, Get, Post, Param, Body, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiCreatedResponse, ApiQuery, ApiHeader } from '@nestjs/swagger';
import { PostsService } from './posts.service';
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
  @ApiOperation({ summary: 'Get posts with limit', description: 'Retrieve posts with a limit' })
  @ApiQuery({ name: 'page', type: Number, description: 'Page number', required: false })
  @ApiQuery({ name: 'limit', type: Number, description: 'Limit the number of posts', required: false })
  @ApiCreatedResponse({ description: 'The records have been successfully retrieved.' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<PostModel[]> {
    const skip = (page - 1) * limit;
    return this.postsService.findPosts(limit, skip);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID', description: 'Retrieve a post by its ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  @ApiCreatedResponse({ description: 'The record has been successfully retrieved.' })
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a post', description: 'Create a new post' })
  @ApiBody({ type: PostModel })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  async create(@Body() post: PostModel): Promise<PostModel> {
    return this.postsService.create(post);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Like/Unlike a post', description: 'Like or unlike a post for a user' })
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
  @ApiOperation({ summary: 'Check if a post is liked by a user', description: 'Check if a post is liked by a specific user' })
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
  @ApiOperation({ summary: 'Add a comment to a post', description: 'Add a comment to a specific post' })
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
    const newComment = await this.commentService.createComment(userId, postId, content);
    await this.postsService.incrementComments(postId);
    return newComment;
  }

  @Get(':id/getcomments')
  @ApiOperation({ summary: 'Get comments for a post', description: 'Retrieve all comments for a specific post' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the post' })
  async getCommentsForPost(@Param('id') postId: string): Promise<Comment[]> {
    return this.commentService.getCommentsByPostId(postId);
  }
}