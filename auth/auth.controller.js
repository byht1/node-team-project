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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../db-schema/user.schema");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("./guard/jwt-auth.guard");
const validate_pipe_1 = require("../global/pipe/validate.pipe");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const LoginRedirectUrlDto_1 = require("./dto/LoginRedirectUrlDto");
const forgoten_password_guard_1 = require("./guard/forgoten-password.guard");
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async signUp(newUserDto, response) {
        const user = await this.authService.signUp(newUserDto);
        response.cookie('refreshToken', user.refresh_token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return user;
    }
    isUseEmail(email) {
        return this.authService.isUseEmail(email);
    }
    async logIn(logInDto) {
        const user = await this.authService.logIn(logInDto);
        return user;
    }
    logOut(req, { refresh_token }) {
        return this.authService.logOut(req.user, req.access_token, refresh_token);
    }
    refresh({ refresh_token }) {
        return this.authService.refresh(refresh_token);
    }
    current(req, { type, fields }) {
        return this.authService.current(req.user._id, type, fields);
    }
    googleLogin() {
    }
    async googleLoginCallback(req, response) {
        const tokens = await this.authService.googleLogin(req.user);
        return response.redirect(`https://byht1.github.io/react-team-project/?access_token=${tokens.access_token}`);
    }
    passwordChangeRequest(body) {
        return this.authService.passwordChangeRequest(body);
    }
    async passwordChangeRequestError({ token }, response) {
        await this.authService.forgottenPasswordError(token);
        return response.redirect(`https://byht1.github.io/react-team-project`);
    }
    passwordChangeNewPassword(req, body) {
        return this.authService.passwordChangeNewPassword(body, req.user._id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registration' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.Users, description: 'User created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Email in use',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.NewUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Email is use' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Email in use',
    }),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.Post)('is-use-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "isUseEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.Users }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'User does not exist' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Incorrect password' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.Post)('log-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LogInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Logout' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.HttpCode)(204),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.RefreshTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a new access token' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: String }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RefreshTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Authorization by token' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.Users }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('current'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QueryCurrentDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "current", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Google authorization' }),
    (0, swagger_1.ApiExtraModels)(LoginRedirectUrlDto_1.LoginRedirectUrlDto),
    (0, swagger_1.ApiResponse)({ status: 302, type: LoginRedirectUrlDto_1.LoginRedirectUrlDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'User access token generated successfully' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid authorization code or state value' }),
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, common_1.Get)('google/callback'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLoginCallback", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Password change request' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'User does not exist' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.HttpCode)(204),
    (0, common_1.Patch)('/forgotten-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "passwordChangeRequest", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('/forgotten-password/error'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TokenForgotenPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "passwordChangeRequestError", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Password change' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.Users }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(forgoten_password_guard_1.ForgotenPasswordGuard),
    (0, common_1.Patch)('/forgotten-password/new'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.NewPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "passwordChangeNewPassword", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, config_1.ConfigService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map