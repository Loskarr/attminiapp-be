import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.schema';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('tags')
@ApiTags('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Create a tag', description: 'Create a new tag' })
  @ApiBody({ type: Tag })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(@Body() tag: Tag): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags', description: 'Retrieve all tags' })
  @ApiCreatedResponse({
    description: 'The records have been successfully retrieved.',
  })
  async findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get tag by ID',
    description: 'Retrieve a tag by its ID',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the tag' })
  @ApiCreatedResponse({
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a tag',
    description: 'Update a tag by its ID',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the tag' })
  @ApiBody({ type: Tag })
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
  })
  async update(@Param('id') id: string, @Body() tag: Tag): Promise<Tag> {
    return this.tagService.update(id, tag);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a tag',
    description: 'Delete a tag by its ID',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the tag' })
  @ApiCreatedResponse({
    description: 'The record has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.tagService.remove(id);
  }
}
