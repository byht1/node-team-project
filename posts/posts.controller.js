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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const posts_service_1 = require("./posts.service");
const dto_1 = require("./dto");
const create_post_schema_1 = require("./schema-swagger/create-post.schema");
const post_schema_1 = require("../db-schema/post.schema");
const comments_scheme_1 = require("../db-schema/comments.scheme");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const validate_pipe_1 = require("../global/pipe/validate.pipe");
const validateIsNotVoid_pipe_1 = require("../global/pipe/validateIsNotVoid.pipe");
const comments_service_1 = require("../comments/comments.service");
const create_comment_schema_1 = require("../comments/schema-swagger/create-comment.schema");
let PostsController = class PostsController {
    constructor(postsService, commentsService) {
        this.postsService = postsService;
        this.commentsService = commentsService;
    }
    getAllPosts(dto) {
        return this.postsService.getAllPosts(dto);
    }
    getOnePost(id) {
        return this.postsService.getPostById(id);
    }
    createPost(req, dto, { image }) {
        return this.postsService.createPost(dto, image[0], req.user._id);
    }
    removePost(id, req) {
        return this.postsService.removePost(id, req.user._id);
    }
    likes(id, req) {
        return this.postsService.likes(id, req.user._id);
    }
    addComment(postId, req, dto) {
        return this.commentsService.createComment(dto, postId, req.user._id);
    }
    removeComment(postId, commentId) {
        return this.commentsService.removeComment(commentId, postId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Posts found', type: [post_schema_1.Post] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get post by id' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post found', type: post_schema_1.Post }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({ name: 'postId', required: true, description: 'Post ID' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, common_1.Get)('/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getOnePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create post' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiBody)({ type: create_post_schema_1.CreatePostSchema }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created', type: post_schema_1.Post }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.UsePipes)(validateIsNotVoid_pipe_1.ValidateIsNotVoid),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'image', maxCount: 1 }])),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreatePostDto, dto_1.UploadeFileDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete post' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post deleted', type: post_schema_1.Post }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({ name: 'postId', required: true, description: 'Post ID' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, common_1.Delete)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "removePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add or remove \'like\' mark' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post \'likes\' field updated', type: post_schema_1.Post }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, swagger_1.ApiParam)({ name: 'postId', required: true, description: 'Post ID' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, common_1.Patch)(':postId/likes'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "likes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add comment' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: create_comment_schema_1.CreateCommentSchema }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment created', type: comments_scheme_1.Comment }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({ name: 'postId', required: true, description: 'Post ID' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, common_1.Post)(':postId/comments'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "addComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete comment' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comment deleted', type: comments_scheme_1.Comment }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({ name: 'commentId', required: true, description: 'Comment ID' }),
    (0, swagger_1.ApiParam)({ name: 'postId', required: true, description: 'Post ID' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, common_1.Delete)(':postId/comments/:commentId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "removeComment", null);
PostsController = __decorate([
    (0, swagger_1.ApiTags)('Blog'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        comments_service_1.CommentsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map