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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const like_schema_1 = require("./like.schema");
let LikeService = class LikeService {
    constructor(likeModel) {
        this.likeModel = likeModel;
    }
    async likePost(user, post) {
        const newLike = new this.likeModel({
            user,
            post: new mongoose_2.Types.ObjectId(post),
        });
        return newLike.save();
    }
    async unlikePost(user, post) {
        await this.likeModel
            .deleteOne({
            user,
            post: new mongoose_2.Types.ObjectId(post),
        })
            .exec();
    }
    async isLiked(user, post) {
        const like = await this.likeModel
            .findOne({
            user,
            post: new mongoose_2.Types.ObjectId(post),
        })
            .exec();
        return !!like;
    }
    async getLikesForPost(post) {
        return this.likeModel.find({ post: new mongoose_2.Types.ObjectId(post) }).exec();
    }
    async getLikeCountForPost(post) {
        return this.likeModel
            .countDocuments({ post: new mongoose_2.Types.ObjectId(post) })
            .exec();
    }
    async getLikedPostsByUser(userId) {
        const likes = await this.likeModel
            .find({ user: userId })
            .populate({
            path: 'post',
        })
            .exec();
        return likes.map((like) => like.post);
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(like_schema_1.Like.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LikeService);
//# sourceMappingURL=like.service.js.map