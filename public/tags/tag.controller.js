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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const tag_schema_1 = require("./tag.schema");
const swagger_1 = require("@nestjs/swagger");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async create(tag) {
        return this.tagService.create(tag);
    }
    async findAll() {
        return this.tagService.findAll();
    }
    async findOne(id) {
        return this.tagService.findOne(id);
    }
    async update(id, tag) {
        return this.tagService.update(id, tag);
    }
    async remove(id) {
        await this.tagService.remove(id);
    }
};
exports.TagController = TagController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a tag', description: 'Create a new tag' }),
    (0, swagger_1.ApiBody)({ type: tag_schema_1.Tag }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The record has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_schema_1.Tag]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tags', description: 'Retrieve all tags' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The records have been successfully retrieved.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tag by ID', description: 'Retrieve a tag by its ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the tag' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The record has been successfully retrieved.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a tag', description: 'Update a tag by its ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the tag' }),
    (0, swagger_1.ApiBody)({ type: tag_schema_1.Tag }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The record has been successfully updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tag_schema_1.Tag]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a tag', description: 'Delete a tag by its ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'ID of the tag' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The record has been successfully deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "remove", null);
exports.TagController = TagController = __decorate([
    (0, common_1.Controller)('tags'),
    (0, swagger_1.ApiTags)('tags'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
//# sourceMappingURL=tag.controller.js.map