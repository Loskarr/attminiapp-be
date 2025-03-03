import { UserService } from './user.service';
import { User as userModel } from './user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(id: string): Promise<userModel>;
    findAll(): Promise<userModel[]>;
    isExist(id: string): Promise<any>;
    createUser(id: string, name: string, avatar: string): Promise<userModel | string>;
}
