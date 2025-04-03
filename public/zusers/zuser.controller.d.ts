import { UserService } from './zuser.service';
import { ZUser as zuserModel } from './zuser.schema';
export declare class UserController {
  private readonly userService;
  constructor(userService: UserService);
  findOne(id: string): Promise<zuserModel>;
  findAll(): Promise<zuserModel[]>;
  isExist(id: string): Promise<any>;
  createUser(
    id: string,
    name: string,
    avatar: string,
  ): Promise<zuserModel | string>;
}
