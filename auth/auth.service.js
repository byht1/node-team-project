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
exports.AuthService = exports.ETypeOperation = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../db-schema/user.schema");
const user_service_1 = require("../user/user.service");
const email_message_service_1 = require("../email-message/email-message.service");
var ETypeOperation;
(function (ETypeOperation) {
    ETypeOperation["GOOGLE"] = "google";
    ETypeOperation["PASSWORD"] = "password";
})(ETypeOperation = exports.ETypeOperation || (exports.ETypeOperation = {}));
let AuthService = class AuthService {
    constructor(usersModel, usersService, jwtService, emailMessage) {
        this.usersModel = usersModel;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.emailMessage = emailMessage;
    }
    async signUp(newUserDto) {
        const { email, name, password } = newUserDto;
        const isEmail = await this.usersService.userByEmail(email);
        if (isEmail)
            throw new common_1.HttpException('Email in use', common_1.HttpStatus.CONFLICT);
        const hashPassword = await this.hashPassword(password);
        const user = await this.usersModel.create(Object.assign(Object.assign({}, newUserDto), { photo: this.avatarGenerator(name), password: hashPassword }));
        const tokens = await this.generatorTokens(user._id);
        return this.normalizeData(user, tokens);
    }
    async isUseEmail({ email }) {
        if (!email)
            return;
        const user = await this.usersService.userByEmail(email);
        if (user)
            throw new common_1.HttpException('Email in use', common_1.HttpStatus.CONFLICT);
        return;
    }
    async logIn(logInDto) {
        const { email, password } = logInDto;
        const isUser = await this.usersService.userByEmail(email);
        if (!isUser) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.passwordIsValid(password, isUser.password);
        const tokens = await this.generatorTokens(isUser._id);
        return this.normalizeData(isUser, tokens);
    }
    async logOut(user, accessToken, refreshToken) {
        const id = user._id;
        const accessTokenDelete = user.access_token.filter(x => x.token !== accessToken);
        const refreshTokenDelete = user.refresh_token.filter(x => {
            return x.token !== refreshToken;
        });
        await this.usersModel.findByIdAndUpdate(id, {
            access_token: accessTokenDelete,
            refresh_token: refreshTokenDelete,
        });
        return;
    }
    async refresh(refreshToken) {
        try {
            if (!refreshToken)
                throw new Error();
            const isValid = await this.jwtService.verify(refreshToken, {
                secret: process.env.REFRESH_SECRET_KEY,
            });
            const user = await this.usersModel.findById(isValid.id);
            if (!(user === null || user === void 0 ? void 0 : user.refresh_token.find(x => x.token === refreshToken)))
                throw new Error();
            const accessToken = this.generatorToken(isValid.id, 'access');
            user.access_token.push(accessToken);
            user.save();
            return accessToken.token;
        }
        catch (error) {
            const payload = await this.jwtService.decode(refreshToken);
            if (typeof payload === 'string' || !(payload === null || payload === void 0 ? void 0 : payload.id)) {
                throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.clearTokens(payload.id, refreshToken);
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async googleLogin(googleAuthDto) {
        const { email, picture, firstName, lastName } = googleAuthDto;
        const isUser = await this.usersService.userByEmail(email);
        if (isUser)
            return await this.generatorTokens(isUser._id);
        const hashPassword = await this.hashPassword(Date.now().toString());
        const newUser = await this.usersModel.create({
            password: hashPassword,
            photo: picture,
            name: `${firstName} ${lastName}`,
            email,
        });
        return await this.generatorTokens(newUser._id);
    }
    async current(id, type) {
        const user = await this.usersModel.findById(id, '-password').populate('cards');
        if (type === 'google') {
            const tokens = await this.generatorTokens(id);
            return this.normalizeData(user, tokens);
        }
        delete user.access_token;
        delete user.refresh_token;
        return user;
    }
    async passwordChangeRequest({ email }) {
        const regex = new RegExp(email, 'i');
        const isUser = await this.usersModel.findOne({ email: regex });
        if (!isUser) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { token } = this.generatorToken(isUser._id, 'access', ETypeOperation.PASSWORD);
        await this.emailMessage.forgottenPassword(email, token);
        isUser.forgottenPasswordToken = token;
        isUser.save();
        return;
    }
    async forgottenPasswordError(token) {
        const isUser = await this.forgottenPasswordUserSearch(token);
        if (typeof isUser === 'boolean') {
            return this.forgottenPasswordDecode(token);
        }
        await this.usersModel.findByIdAndUpdate(isUser._id, {
            forgottenPasswordToken: null,
        });
        return;
    }
    async passwordChangeNewPassword({ password }, userId) {
        const hashPassword = await this.hashPassword(password);
        const user = await this.usersModel.findByIdAndUpdate(userId, {
            forgottenPasswordToken: null,
            password: hashPassword,
        }, { new: true });
        const tokens = await this.generatorTokens(user.id);
        return this.normalizeData(user, tokens);
    }
    async forgottenPasswordUserSearch(forgottenPasswordToken) {
        const { id, typeOperation } = await this.jwtService.verify(forgottenPasswordToken, {
            secret: process.env.ACCESS_SECRET_KEY,
        });
        if (!id || typeOperation !== ETypeOperation.PASSWORD)
            return false;
        const isUser = await this.usersModel.findById(id);
        if (!isUser || (isUser === null || isUser === void 0 ? void 0 : isUser.forgottenPasswordToken) !== forgottenPasswordToken)
            return false;
        return isUser;
    }
    async forgottenPasswordDecode(token) {
        const payload = await this.jwtService.decode(token);
        if (typeof payload === 'string' || !(payload === null || payload === void 0 ? void 0 : payload.id)) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.usersModel.findById(payload.id);
        user.forgottenPasswordToken = null;
        user.save();
        return;
    }
    avatarGenerator(name) {
        return `https://api.multiavatar.com/${name}.png`;
    }
    generatorToken(id, type, typeOperation) {
        const payload = { id };
        if (typeOperation) {
            payload.typeOperation = typeOperation;
        }
        return {
            token: this.jwtService.sign(payload, {
                expiresIn: type === 'ref' ? '24h' : '15m',
                secret: type === 'ref' ? process.env.REFRESH_SECRET_KEY : process.env.ACCESS_SECRET_KEY,
            }),
            date: Date.now(),
        };
    }
    async generatorTokens(id) {
        const access = this.generatorToken(id, 'access');
        const refresh = this.generatorToken(id, 'ref');
        const user = await this.usersModel.findById(id);
        user.access_token.push(access);
        user.refresh_token.push(refresh);
        user.save();
        return { access_token: access.token, refresh_token: refresh.token };
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async passwordIsValid(password, userPassword) {
        const passwordEquals = await bcrypt.compare(password, userPassword);
        if (!passwordEquals) {
            throw new common_1.HttpException('Incorrect password', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    normalizeData(user, tokens) {
        const res = Object.assign({}, user);
        delete res._doc.password;
        return Object.assign(Object.assign({}, res._doc), tokens);
    }
    async clearTokens(id, refCurrentToken) {
        const user = await this.usersModel.findById(id);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
        }
        const currentDate = Date.now();
        const accessToken = [];
        const refreshToken = user.refresh_token.filter(x => currentDate - x.date <= 24 * 60 * 60 * 1000 && x.token !== refCurrentToken);
        user.access_token = accessToken;
        user.refresh_token = refreshToken;
        user.save();
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        jwt_1.JwtService,
        email_message_service_1.EmailMessageService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map