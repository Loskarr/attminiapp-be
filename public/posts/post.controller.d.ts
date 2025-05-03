import { PostsService } from './post.service';
import { Post as PostModel } from './post.schema';
import { LikeService } from '../likes/like.service';
import { CommentService } from '../comments/comment.service';
import { Comment } from '../comments/comment.schema';
export declare class PostsController {
    private readonly postsService;
    private readonly likeService;
    private readonly commentService;
    constructor(postsService: PostsService, likeService: LikeService, commentService: CommentService);
    findAll(page?: number, limit?: number, category?: string, sortBy?: string, query?: string): Promise<PostModel[]>;
    create(post: PostModel): Promise<PostModel>;
    getLikedPosts(req: Request, sortBy?: string, query?: string): Promise<PostModel[]>;
    getRecommendations(req: Request, sortBy?: string, query?: string): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    likePost(postId: string, req: Request): Promise<any>;
    isPostLiked(postId: string, req: Request): Promise<{
        isLiked: boolean;
    }>;
    addComment(postId: string, req: Request, content: string): Promise<any>;
    getCommentsForPost(postId: string): Promise<Comment[]>;
    deleteComment(commentId: string, userId: string): Promise<void>;
    updateComment(commentId: string, userId: string, content: string): Promise<Comment>;
}
