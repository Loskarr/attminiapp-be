import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserService } from './zuser.service';
import { LikeService } from '../likes/like.service';
import { ZUser as zuserModel } from './zuser.schema';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly likeService: LikeService,
  ) {}

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

  @Get('checkExist/:zid')
  @ApiOperation({
    summary: 'Check if user exist',
    description: 'Check if user exist',
  })
  @ApiParam({ name: 'zid', type: String, description: 'ZID of the user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully retrieved.',
  })
  async isExist(@Param('zid') zid: string): Promise<any> {
    return this.userService.isExist(zid);
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
        zid: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
      },
      required: ['zid', 'name', 'avatar'],
    },
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  async createUser(
    @Body('zid') zid: string,
    @Body('name') name: string,
    @Body('avatar') avatar: string,
  ): Promise<zuserModel | string> {
    return this.userService.createUser(zid, name, avatar);
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
