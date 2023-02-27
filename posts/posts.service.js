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
const s3_service_1 = require("../AWS/s3.service");
const post_schema_1 = require("../db-schema/post.schema");
const user_service_1 = require("../user/user.service");
let PostsService = class PostsService {
    constructor(postModel, fileService, userService) {
        this.postModel = postModel;
        this.fileService = fileService;
        this.userService = userService;
    }
    async getAllPosts(dto) {
        const { count = 3, offset = 0 } = dto;
        const posts = await this.postModel.find({ title: { $regex: new RegExp(dto.searchQuery, 'i') } })
            .skip(offset)
            .limit(count)
            .sort({ 'createdAt': -1 })
            .populate('author', { name: 1 });
        return posts;
    }
    async getPostById(id) {
        const post = await this.postModel.findById(id)
            .populate({
            path: 'comments',
            populate: {
                path: 'author', select: 'name photo',
            }
        });
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        return post;
    }
    async createPost(createPostDto, image, userId) {
        const fileName = await this.fileService.uploadFile(image, s3_service_1.TypeOperation.POSTS);
        const post = await this.postModel.create(Object.assign(Object.assign({}, createPostDto), { image: fileName, author: userId }));
        await this.userService.addPost(userId, post);
        return post;
    }
    async removePost(postId, userId) {
        const postFind = await this.postModel.findOneAndRemove({ author: { _id: userId }, _id: postId }).select({ createdAt: 0, updatedAt: 0 });
        if (!postFind) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        const string = postFind.image.split('/').pop();
        await this.fileService.deleteFile(string, s3_service_1.TypeOperation.POSTS);
        await this.userService.removePost(userId, postFind);
        return postFind;
    }
    async likes(postId, userId) {
        const post = await this.postModel.findById(postId);
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(x => x.toString() !== userId.toString());
        }
        else {
            post.likes.push(userId);
        }
        await post.save();
        return post;
    }
    async addComment(postId, comment) {
        const post = await this.postModel.findById(postId);
        post.comments.push(comment._id);
        await post.save();
        return;
    }
    async removeComment(postId, comment) {
        const post = await this.postModel.findById(postId);
        post.comments = post.comments.filter(x => x.toString() !== comment._id.toString());
        await post.save();
        return;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        s3_service_1.S3Service,
        user_service_1.UserService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map