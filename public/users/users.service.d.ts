import { UserDTO } from './users.dto';
export declare class UsersService {
    users: {
        id: number;
        name: string;
        age: number;
    }[];
    getUser(): {
        id: number;
        name: string;
        age: number;
    }[];
    getUserById(id: number): {
        id: number;
        name: string;
        age: number;
    };
    createUser(user: UserDTO): UserDTO;
    deleteUser(id: number): {
        id: number;
        name: string;
        age: number;
    }[];
}
