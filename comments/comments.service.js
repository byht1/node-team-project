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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comments_scheme_1 = require("../db-schema/comments.scheme");
const posts_service_1 = require("../posts/posts.service");
const user_service_1 = require("../user/user.service");
let CommentsService = class CommentsService {
    constructor(commentModel, postService, userService) {
        this.commentModel = commentModel;
        this.postService = postService;
        this.userService = userService;
    }
    async createComment(createCommentDto, postId, userId) {
        const comment = await this.commentModel.create(Object.assign(Object.assign({}, createCommentDto), { owner: userId, post: postId }));
        await this.postService.addComment(postId, comment);
        await this.userService.addComment(userId, comment);
        return comment;
    }
    async removeComment(commentId, postId, userId) {
        const commentFind = await this.commentModel.findOne({ owner: userId, _id: commentId });
        if (!commentFind) {
            throw new common_1.HttpException('Comment not found', common_1.HttpStatus.NOT_FOUND);
        }
        const comment = await this.commentModel.findByIdAndRemove(commentId).select({ createdAt: 0, updatedAt: 0 });
        await this.postService.removeComment(postId, comment);
        await this.userService.removeComment(userId, comment);
        return comment;
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comments_scheme_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        posts_service_1.PostsService,
        user_service_1.UserService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map