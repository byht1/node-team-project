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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const validate_pipe_1 = require("../global/pipe/validate.pipe");
const validateIsNotVoid_pipe_1 = require("../global/pipe/validateIsNotVoid.pipe");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const schema_swagger_1 = require("./schema-swagger");
const platform_express_1 = require("@nestjs/platform-express");
const dto_1 = require("./dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    currentUser(req) {
        return this.userService.currentUser(req.user._id);
    }
    editingData(editingUserDto, req) {
        return this.userService.editingData(editingUserDto, req.user._id);
    }
    editingPhoto({ file }, req) {
        return this.userService.editingPhoto(file[0], req.user._id);
    }
    allUserPets(req) {
        return this.userService.allUserPets(req.user._id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user data' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: schema_swagger_1.UpdateUser, description: 'User found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "currentUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user data' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: schema_swagger_1.UpdateUser, description: 'User data updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.UsePipes)(validateIsNotVoid_pipe_1.ValidateIsNotVoid),
    (0, common_1.Patch)('editing'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EditingUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editingData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user avatar' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: schema_swagger_1.UpdateUser, description: 'User avatar updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file', maxCount: 1 }])),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.Patch)('editing/photo'),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EditingUserPhotoDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editingPhoto", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get current user data' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: schema_swagger_1.UserDataPets }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user-pets'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "allUserPets", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map