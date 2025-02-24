import { UsersService } from './users.service';
import { UserDTO } from './users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): {
        id: number;
        name: string;
        age: number;
    }[];
    getUserById(id: number): {
        id: number;
        name: string;
        age: number;
    };
    addUser(user: UserDTO): UserDTO;
    deleteUser(id: number): {
        id: number;
        name: string;
        age: number;
    }[];
}
