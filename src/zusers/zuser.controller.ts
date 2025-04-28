import { Controller, Get, Post, Param, Body, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { UserService } from './zuser.service';
import { LikeService } from '../likes/like.service';
import { Like } from '../likes/like.schema';
import { ZUser as zuserModel } from './zuser.schema';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly likeService: LikeService,
  ) {}

  @Get('liked')
  @ApiOperation({
    summary: 'Get posts liked by a user',
    description: 'Retrieve all posts liked by the authenticated user',
  })
  @ApiHeader({ name: 'userId', description: 'ID of the user' })
  @ApiCreatedResponse({
    description: 'The liked posts have been successfully retrieved.',
  })
  async getLikedPosts(@Req() req: Request): Promise<Like[]> {
    const userId = req.headers['userid'] as string;
    return this.likeService.getLikedPostsByUser(userId);
  }

  @Get('getId/:id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a user by its ID',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<zuserModel> {
    return this.userService.findOne(id);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Get all user',
    description: 'Retrieve all user',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully retrieved.',
  })
  async findAll(): Promise<zuserModel[]> {
    return this.userService.findAll();
  }

  @Get('checkExist/:id')
  @ApiOperation({
    summary: 'Check if user exist',
    description: 'Check if user exist',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully retrieved.',
  })
  async isExist(@Param('id') id: string): Promise<any> {
    return this.userService.isExist(id);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Add a new user',
    description: 'Create a new user instance and store it in the database',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
      },
      required: ['id', 'name', 'avatar'],
    },
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  async createUser(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('avatar') avatar: string,
  ): Promise<zuserModel | string> {
    return this.userService.createUser(id, name, avatar);
  }

  // @Get('name/:name')
  // @ApiOperation({
  //   summary: 'Get user by name',
  //   description: 'Retrieve user by name',
  // })
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully retrieved.',
  // })
  // async findByName(@Param('name') name: string): Promise<userModel> {
  //   return this.userService.findByName(name);
  // }
}
