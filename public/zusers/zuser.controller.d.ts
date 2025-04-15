import { UserService } from './zuser.service';
import { LikeService } from '../likes/like.service';
import { Like } from '../likes/like.schema';
import { ZUser as zuserModel } from './zuser.schema';
export declare class UserController {
    private readonly userService;
    private readonly likeService;
    constructor(userService: UserService, likeService: LikeService);
    getLikedPosts(req: Request): Promise<Like[]>;
    findOne(id: string): Promise<zuserModel>;
    findAll(): Promise<zuserModel[]>;
    isExist(id: string): Promise<any>;
    createUser(id: string, name: string, avatar: string): Promise<zuserModel | string>;
}
