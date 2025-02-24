"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const users_dto_1 = require("./users.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUsers() {
        return this.usersService.getUser();
    }
    getUserById(id) {
        return this.usersService.getUserById(id);
    }
    addUser(user) {
        return this.usersService.createUser(user);
    }
    deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users', description: 'Use to get all users information' }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully created.', content: {
            'application/json': {
                examples: {
                    created_user: {
                        summary: 'Response after get all users information',
                        value: [{
                                "id": 1,
                                "name": "John Doe",
                                "age": 25
                            },
                            {
                                "id": 2,
                                "name": "Jane Doe",
                                "age": 26
                            }
                        ],
                    },
                },
            },
        }, }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user', description: 'Use to get a specific user information by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, examples: {
            id_1: {
                value: 1,
                description: `Get user with id = 1`,
            },
            id_2: {
                value: 2,
                description: `Get user with id = 2`,
            },
        }, }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully created.', content: {
            'application/json': {
                examples: {
                    created_user: {
                        summary: 'Response after get user information',
                        value: {
                            "id": 1,
                            "name": "John Doe",
                            "age": 25
                        },
                    },
                },
            },
        } }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add user', description: 'Use to add new user' }),
    (0, swagger_1.ApiBody)({
        type: users_dto_1.UserDTO,
        examples: {
            example1: {
                value: {
                    id: 3,
                    name: 'John Doe',
                    age: 25
                },
            }
        }
    }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully created.', content: {
            'application/json': {
                examples: {
                    created_user: {
                        summary: 'Response after create new user',
                        value: {
                            id: 3,
                            name: 'John Doe',
                            age: 25
                        },
                    },
                },
            },
        } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user', description: 'Use to delete a specific user by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, examples: {
            id_1: {
                value: 1,
                description: `Delete user with id = 1`,
            },
            id_2: {
                value: 2,
                description: `Delete user with id = 2`,
            },
        }, }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully deleted.', content: {
            'application/json': {
                examples: {
                    created_user: {
                        summary: 'Response after delete user',
                        value: [{
                                "id": 2,
                                "name": "Jane Doe",
                                "age": 26
                            }
                        ],
                    },
                },
            },
        } }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map