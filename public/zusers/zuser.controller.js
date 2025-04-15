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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const zuser_service_1 = require("./zuser.service");
const like_service_1 = require("../likes/like.service");
let UserController = class UserController {
    constructor(userService, likeService) {
        this.userService = userService;
        this.likeService = likeService;
    }
    async getLikedPosts(req) {
        const userId = req.headers['userid'];
        return this.likeService.getLikedPostsByUser(userId);
    }
    async findOne(id) {
        return this.userService.findOne(id);
    }
    async findAll() {
        return this.userService.findAll();
    }
    async isExist(id) {
        return this.userService.isExist(id);
    }
    async createUser(id, name, avatar) {
        return this.userService.createUser(id, name, avatar);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('liked'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get posts liked by a user',
        description: 'Retrieve all posts liked by the authenticated user',
    }),
    (0, swagger_1.ApiHeader)({ name: 'userId', description: 'ID of the user' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The liked posts have been successfully retrieved.',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLikedPosts", null);
__decorate([
    (0, common_1.Get)('getId/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user by ID',
        description: 'Retrieve a user by its ID',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the user' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The record has been successfully retrieved.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all user',
        description: 'Retrieve all user',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The record has been successfully retrieved.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('checkExist/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Check if user exist',
        description: 'Check if user exist',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the user' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The record has been successfully retrieved.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isExist", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add a new user',
        description: 'Create a new user instance and store it in the database',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                avatar: { type: 'string' },
            },
            required: ['id', 'name', 'avatar'],
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully created.',
    }),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('avatar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    __metadata("design:paramtypes", [zuser_service_1.UserService,
        like_service_1.LikeService])
], UserController);
//# sourceMappingURL=zuser.controller.js.map