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
exports.ForgotenPasswordGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../db-schema/user.schema");
const auth_service_1 = require("../auth.service");
let ForgotenPasswordGuard = class ForgotenPasswordGuard {
    constructor(usersModel, jwtService) {
        this.usersModel = usersModel;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const isToken = req.headers.authorization;
        if (!isToken) {
            throw new common_1.HttpException('Missing token', common_1.HttpStatus.FORBIDDEN);
        }
        const [bearer, token] = isToken.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            const { id, typeOperation } = this.jwtService.verify(token, {
                secret: process.env.ACCESS_SECRET_KEY,
            });
            const user = await this.usersModel.findById(id);
            if (!user || (user.forgottenPasswordToken !== token && typeOperation === auth_service_1.ETypeOperation.PASSWORD)) {
                throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
            }
            req.user = user;
            req.access_token = token;
            req.typeOperation = typeOperation;
            return true;
        }
        catch (error) {
            const payload = this.jwtService.decode(token);
            if (typeof payload === 'string' || !(payload === null || payload === void 0 ? void 0 : payload.id)) {
                throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
            }
            const user = await this.usersModel.findById(payload.id);
            user.forgottenPasswordToken = null;
            user.save();
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
ForgotenPasswordGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService])
], ForgotenPasswordGuard);
exports.ForgotenPasswordGuard = ForgotenPasswordGuard;
//# sourceMappingURL=forgoten-password.guard.js.map