import { UserService } from './zuser.service';
import { LikeService } from '../likes/like.service';
import { ZUser as zuserModel } from './zuser.schema';
export declare class UserController {
    private readonly userService;
    private readonly likeService;
    constructor(userService: UserService, likeService: LikeService);
    findOne(id: string): Promise<zuserModel>;
    findAll(): Promise<zuserModel[]>;
    isExist(zid: string): Promise<any>;
    createUser(zid: string, name: string, avatar: string): Promise<zuserModel | string>;
}
