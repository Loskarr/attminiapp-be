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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class Media {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Media.prototype, "ytb_video_id", void 0);
let Post = class Post extends mongoose_2.Document {
};
exports.Post = Post;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "short_desc", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "thumbnail_url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Post.prototype, "has_audio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Media }),
    __metadata("design:type", Media)
], Post.prototype, "media", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Post.prototype, "taxonomy_ids", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Post.prototype, "post_categories", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Post.prototype, "post_category_details", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "taxonomies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "post_format", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "status_name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "publish_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Post.prototype, "is_approved", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "approved_by", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "approved_by_name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Post.prototype, "view", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Post.prototype, "is_featured", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "keyword", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "post_type", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "created_by", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "updated_by", void 0);
exports.Post = Post = __decorate([
    (0, mongoose_1.Schema)()
], Post);
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
//# sourceMappingURL=post.schema.js.map