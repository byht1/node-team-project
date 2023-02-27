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
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let Post = class Post {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f139e997fc630d8da1ff68' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Post.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post title' }),
    (0, mongoose_1.Prop)({ required: [true, 'title is required'] }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post text' }),
    (0, mongoose_1.Prop)({ required: [true, 'text is required'] }),
    __metadata("design:type", String)
], Post.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'veterinary' }),
    (0, mongoose_1.Prop)({ required: [true, 'category is required'] }),
    __metadata("design:type", String)
], Post.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://api.multiavatar.com/post.png' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['63f139e997fc630d8da1ff68'] }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f139e997fc630d8da1ff68' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", user_schema_1.Users)
], Post.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Comment' }] }),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
Post = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], Post);
exports.Post = Post;
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
//# sourceMappingURL=post.schema.js.map