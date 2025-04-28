import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;

  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    }).compile();

    categoriesController =
      module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      await categoriesController.findAll();
      expect(mockCategoriesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      await categoriesController.findOne('1');
      expect(mockCategoriesService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      await categoriesController.remove('1');
      expect(mockCategoriesService.remove).toHaveBeenCalledWith('1');
    });
  });
});
