import { PostsService } from './posts.service';
import { Post as PostModel } from './post.schema';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(limit: number): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    create(post: PostModel): Promise<PostModel>;
}
