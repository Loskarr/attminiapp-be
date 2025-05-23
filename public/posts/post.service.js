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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./post.schema");
const mongodb_1 = require("mongodb");
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async findPosts(limit, skip, category, sortBy, query) {
        const filter = {};
        if (category) {
            filter.post_categories = { $in: [new mongodb_1.ObjectId(category)] };
        }
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
            ];
        }
        let sortOptions = {};
        if (sortBy === 'view') {
            sortOptions = { view: -1 };
        }
        else if (sortBy === 'created_at') {
            sortOptions = { createdAt: -1 };
        }
        else {
            sortOptions = { createdAt: -1 };
        }
        return this.postModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sortOptions)
            .populate('post_categories')
            .populate('tags')
            .exec();
    }
    async findOne(id) {
        return this.postModel
            .findById(new mongodb_1.ObjectId(id))
            .populate('post_categories')
            .populate('tags')
            .exec();
    }
    async create(post) {
        const newPost = new this.postModel(post);
        return newPost.save();
    }
    async incrementLikes(postId) {
        return this.postModel
            .findOneAndUpdate({ _id: postId }, { $inc: { like: 1 } }, { new: true })
            .exec();
    }
    async decrementLikes(postId) {
        return this.postModel
            .findOneAndUpdate({ _id: postId }, { $inc: { like: -1 } }, { new: true })
            .exec();
    }
    async incrementComments(postId) {
        return this.postModel
            .findOneAndUpdate({ _id: postId }, { $inc: { comment: 1 } }, { new: true })
            .exec();
    }
    async decrementComments(postId) {
        return this.postModel
            .findOneAndUpdate({ _id: postId }, { $inc: { comment: -1 } }, { new: true })
            .exec();
    }
    async searchPosts(query, limit, skip) {
        return this.postModel
            .find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { tags: { $in: [query] } },
            ],
        })
            .skip(skip)
            .limit(limit)
            .exec();
    }
    async incrementViews(postId) {
        return this.postModel
            .findOneAndUpdate({ _id: postId }, { $inc: { view: 1 } }, { new: true })
            .exec();
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
//# sourceMappingURL=post.service.js.map