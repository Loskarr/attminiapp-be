import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as PostModel } from './post.schema';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get posts with limit', description: 'Retrieve posts with a limit' })
  @ApiQuery({ name: 'limit', type: Number, description: 'Limit the number of posts', required: false })
  @ApiCreatedResponse({ description: 'The records have been successfully retrieved.' })
  async findAll(@Query('limit') limit: number): Promise<PostModel[]> {
    const postLimit = limit ? Number(limit) : 20;
    return this.postsService.findAll(postLimit);
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
}