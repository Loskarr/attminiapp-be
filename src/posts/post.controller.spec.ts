import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { LikeService } from '../likes/like.service';
import { CommentService } from '../comments/comment.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('PostsController', () => {
  let postsController: PostsController;

  const mockPostsService = {
    findPosts: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    incrementViews: jest.fn(),
    incrementLikes: jest.fn(),
    decrementLikes: jest.fn(),
    incrementComments: jest.fn(),
    decrementComments: jest.fn(),
  };

  const mockLikeService = {
    isLiked: jest.fn(),
    likePost: jest.fn(),
    unlikePost: jest.fn(),
  };

  const mockCommentService = {
    createComment: jest.fn(),
    getCommentsByPostId: jest.fn(),
    getCommentById: jest.fn(),
    updateComment: jest.fn(),
    deleteComment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        { provide: PostsService, useValue: mockPostsService },
        { provide: LikeService, useValue: mockLikeService },
        { provide: CommentService, useValue: mockCommentService },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(postsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result = [{ id: '1', title: 'Test Post' }];
      mockPostsService.findPosts.mockResolvedValue(result);

      expect(await postsController.findAll(1, 10)).toEqual(result);
      expect(mockPostsService.findPosts).toHaveBeenCalledWith(
        10,
        0,
        undefined,
        undefined,
        undefined,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      const result = { id: '1', title: 'Test Post' };
      mockPostsService.findOne.mockResolvedValue(result);

      expect(await postsController.findOne('1')).toEqual(result);
      expect(mockPostsService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('likePost', () => {
    it('should like a post', async () => {
      const postId = '1';
      const req = { headers: { userid: 'user1' } } as any;
      mockLikeService.isLiked.mockResolvedValue(false);

      await postsController.likePost(postId, req);
      expect(mockLikeService.likePost).toHaveBeenCalledWith('user1', postId);
      expect(mockPostsService.incrementLikes).toHaveBeenCalledWith(postId);
    });

    it('should unlike a post', async () => {
      const postId = '1';
      const req = { headers: { userid: 'user1' } } as any;
      mockLikeService.isLiked.mockResolvedValue(true);

      await postsController.likePost(postId, req);
      expect(mockLikeService.unlikePost).toHaveBeenCalledWith('user1', postId);
      expect(mockPostsService.decrementLikes).toHaveBeenCalledWith(postId);
    });
  });

  describe('addComment', () => {
    it('should add a comment to a post', async () => {
      const postId = '1';
      const req = { headers: { userid: 'user1' } } as any;
      const content = 'This is a comment';

      await postsController.addComment(postId, req, content);
      expect(mockCommentService.createComment).toHaveBeenCalledWith(
        'user1',
        postId,
        content,
      );
      expect(mockPostsService.incrementComments).toHaveBeenCalledWith(postId);
    });
  });

  describe('getCommentsForPost', () => {
    it('should return comments for a post', async () => {
      const postId = '1';
      const comments = [{ id: 'comment1', content: 'Test comment' }];
      mockCommentService.getCommentsByPostId.mockResolvedValue(comments);

      expect(await postsController.getCommentsForPost(postId)).toEqual(
        comments,
      );
      expect(mockCommentService.getCommentsByPostId).toHaveBeenCalledWith(
        postId,
      );
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const commentId = 'comment1';
      const userId = 'user1';
      const comment = { id: commentId, user: userId, post: 'post1' };
      mockCommentService.getCommentById.mockResolvedValue(comment);
      mockCommentService.deleteComment.mockResolvedValue(undefined);
      mockPostsService.decrementComments.mockResolvedValue(undefined);

      await postsController.deleteComment(commentId, userId);

      expect(mockCommentService.getCommentById).toHaveBeenCalledWith(commentId);
      expect(mockCommentService.deleteComment).toHaveBeenCalledWith(commentId);
      expect(mockPostsService.decrementComments).toHaveBeenCalledWith('post1');
    });

    it('should throw NotFoundException if comment is not found', async () => {
      mockCommentService.getCommentById.mockResolvedValue(null);

      await expect(
        postsController.deleteComment('comment1', 'user1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not authorized', async () => {
      const comment = { id: 'comment1', user: 'user2', post: 'post1' };
      mockCommentService.getCommentById.mockResolvedValue(comment);

      await expect(
        postsController.deleteComment('comment1', 'user1'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateComment', () => {
    it('should update a comment', async () => {
      const commentId = 'comment1';
      const userId = 'user1';
      const content = 'Updated content';
      const comment = { id: commentId, user: userId };
      const updatedComment = { id: commentId, content };
      mockCommentService.getCommentById.mockResolvedValue(comment);
      mockCommentService.updateComment.mockResolvedValue(updatedComment);

      expect(
        await postsController.updateComment(commentId, userId, content),
      ).toEqual(updatedComment);
      expect(mockCommentService.getCommentById).toHaveBeenCalledWith(commentId);
      expect(mockCommentService.updateComment).toHaveBeenCalledWith(
        commentId,
        content,
      );
    });

    it('should throw NotFoundException if comment is not found', async () => {
      mockCommentService.getCommentById.mockResolvedValue(null);

      await expect(
        postsController.updateComment('comment1', 'user1', 'content'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not authorized', async () => {
      const comment = { id: 'comment1', user: 'user2' };
      mockCommentService.getCommentById.mockResolvedValue(comment);

      await expect(
        postsController.updateComment('comment1', 'user1', 'content'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
