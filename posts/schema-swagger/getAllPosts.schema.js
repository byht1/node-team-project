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
exports.GetAllPostsSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
class GetAllPostsSchema {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f139e997fc630d8da1ff68' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], GetAllPostsSchema.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post title' }),
    __metadata("design:type", String)
], GetAllPostsSchema.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post text' }),
    __metadata("design:type", String)
], GetAllPostsSchema.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'veterinary' }),
    __metadata("design:type", String)
], GetAllPostsSchema.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://api.multiavatar.com/post.png' }),
    __metadata("design:type", String)
], GetAllPostsSchema.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['63f139e997fc630d8da1ff68'] }),
    __metadata("design:type", Array)
], GetAllPostsSchema.prototype, "likes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: {
            _id: '63f139e997fc630d8da1ff68',
            name: 'James Allen'
        } }),
    __metadata("design:type", Object)
], GetAllPostsSchema.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    __metadata("design:type", Array)
], GetAllPostsSchema.prototype, "comments", void 0);
exports.GetAllPostsSchema = GetAllPostsSchema;
//# sourceMappingURL=getAllPosts.schema.js.map