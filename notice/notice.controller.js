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
exports.NoticeController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const notice_service_1 = require("./notice.service");
const user_service_1 = require("../user/user.service");
const create_notice_dto_1 = require("./dto/create-notice.dto");
const search_dto_1 = require("./dto/search.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("./../auth/guard/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const notice_schema_1 = require("../db-schema/notice.schema");
const create_notice_swagger_schema_1 = require("./schema-swagger/create-notice-swagger.schema");
const uploaded_files_dto_1 = require("./dto/uploaded-files.dto");
const notice_swagger_schema_1 = require("./schema-swagger/notice-swagger.schema");
const validate_pipe_1 = require("../global/pipe/validate.pipe");
const helpers_1 = require("../helpers");
let NoticeController = class NoticeController {
    constructor(noticeService, userService) {
        this.noticeService = noticeService;
        this.userService = userService;
    }
    getNoticesByCategoryAndSearch(dto) {
        return this.noticeService.getNoticesByCategoryAndSearch(dto);
    }
    getUserNotices(request) {
        const { user } = request;
        return this.noticeService.getUserNotices(user._id);
    }
    getFavotiteNotices(request) {
        const { user } = request;
        return this.userService.getFavotiteNotices(user._id);
    }
    addNoticeToFavorite(request, id) {
        const { user } = request;
        return this.userService.addNoticeToFavorite(user._id, id);
    }
    removeNoticeFromFavorite(request, id) {
        const { user } = request;
        return this.userService.removeNoticeFromFavorite(user._id, id);
    }
    getNoticeById(id) {
        return this.noticeService.getNoticeById(id);
    }
    addNotice(request, files, dto) {
        const { user } = request;
        const { images } = files;
        const normalizedDto = (0, helpers_1.removeExtraSpaces)(dto);
        return this.noticeService.addNotice(user._id, normalizedDto, images);
    }
    removeNotice(request, id) {
        const { user } = request;
        return this.noticeService.removeNotice(user._id, id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get notices grouped by category with a search by title' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [notice_schema_1.Notice] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "getNoticesByCategoryAndSearch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'receive notices that have been created by an authorized user' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: [notice_schema_1.Notice] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "getUserNotices", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get favorite notices added by an authorized user' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: [notice_schema_1.Notice] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/favorite'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "getFavotiteNotices", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'add a notice to favorites by authorized user' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: mongoose_1.default.Schema.Types.ObjectId }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Ad identifier' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:id/favorite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "addNoticeToFavorite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'delete a notice from favorites by authorized user' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: mongoose_1.default.Schema.Types.ObjectId }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Ad identifier' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id/favorite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "removeNoticeFromFavorite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get notice by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: notice_swagger_schema_1.NoticeSwagger }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Ad identifier' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "getNoticeById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'add a notice to one of categories' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token.',
        },
    ]),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: create_notice_swagger_schema_1.CreateNoticeSwaggerSchema }),
    (0, swagger_1.ApiResponse)({ status: 201, type: notice_schema_1.Notice }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'images', maxCount: 4 }])),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, uploaded_files_dto_1.UploadedFilesDto, create_notice_dto_1.CreateNoticeDto]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "addNotice", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'delete a notice created by an authorized user' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: notice_schema_1.Notice }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Ad identifier' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NoticeController.prototype, "removeNotice", null);
NoticeController = __decorate([
    (0, swagger_1.ApiTags)('Notices'),
    (0, common_1.Controller)('/notices'),
    __metadata("design:paramtypes", [notice_service_1.NoticeService, user_service_1.UserService])
], NoticeController);
exports.NoticeController = NoticeController;
//# sourceMappingURL=notice.controller.js.map