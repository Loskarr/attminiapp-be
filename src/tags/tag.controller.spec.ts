import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from './tag.schema';

describe('TagController', () => {
  let tagController: TagController;

  const mockTagService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [{ provide: TagService, useValue: mockTagService }],
    }).compile();

    tagController = module.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(tagController).toBeDefined();
  });

  describe('create', () => {
    it('should call tagService.create with correct parameters', async () => {
      const tag: Tag = { id: '1', name: 'Test Tag' } as Tag;
      mockTagService.create.mockResolvedValue(tag);

      const result = await tagController.create(tag);

      expect(mockTagService.create).toHaveBeenCalledWith(tag);
      expect(mockTagService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(tag);
    });
  });

  describe('findAll', () => {
    it('should call tagService.findAll and return all tags', async () => {
      const tags: Tag[] = [
        { id: '1', name: 'Tag 1' } as Tag,
        { id: '2', name: 'Tag 2' } as Tag,
      ];
      mockTagService.findAll.mockResolvedValue(tags);

      const result = await tagController.findAll();

      expect(mockTagService.findAll).toHaveBeenCalled();
      expect(mockTagService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(tags);
    });
  });

  describe('findOne', () => {
    it('should call tagService.findOne with correct id', async () => {
      const tag: Tag = { id: '1', name: 'Test Tag' } as Tag;
      mockTagService.findOne.mockResolvedValue(tag);

      const result = await tagController.findOne('1');

      expect(mockTagService.findOne).toHaveBeenCalledWith('1');
      expect(mockTagService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(tag);
    });
  });

  describe('update', () => {
    it('should call tagService.update with correct parameters', async () => {
      const tag: Tag = { id: '1', name: 'Updated Tag' } as Tag;
      mockTagService.update.mockResolvedValue(tag);

      const result = await tagController.update('1', tag);

      expect(mockTagService.update).toHaveBeenCalledWith('1', tag);
      expect(mockTagService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(tag);
    });
  });

  describe('remove', () => {
    it('should call tagService.remove with correct id', async () => {
      mockTagService.remove.mockResolvedValue(undefined);

      await tagController.remove('1');

      expect(mockTagService.remove).toHaveBeenCalledWith('1');
      expect(mockTagService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
