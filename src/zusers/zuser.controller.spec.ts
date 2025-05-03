import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './zuser.controller';
import { UserService } from './zuser.service';
import { LikeService } from '../likes/like.service';

describe('UserController', () => {
  let userController: UserController;

  const userId = '1';

  const mockUserService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    isExist: jest.fn(),
    createUser: jest.fn(),
  };

  const mockLikeService = {
    getLikedPostsByUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: LikeService, useValue: mockLikeService },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findOne', () => {
    it('should call userService.findOne', async () => {
      await userController.findOne(userId);
      expect(mockUserService.findOne).toHaveBeenCalledWith(userId);
      expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call userService.findAll', async () => {
      await userController.findAll();

      expect(mockUserService.findAll).toHaveBeenCalled();
      expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('isExist', () => {
    it('should call userService.isExist', async () => {
      await userController.isExist(userId);

      expect(mockUserService.isExist).toHaveBeenCalledWith(userId);
      expect(mockUserService.isExist).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should call userService.createUser', async () => {
      const id = '123';
      const name = 'John Doe';
      const avatar = 'avatar.png';

      await userController.createUser(id, name, avatar);

      expect(mockUserService.createUser).toHaveBeenCalledWith(id, name, avatar);
      expect(mockUserService.createUser).toHaveBeenCalledTimes(1);
    });
  });
});
