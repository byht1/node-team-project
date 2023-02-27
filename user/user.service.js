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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const s3_service_1 = require("../AWS/s3.service");
const user_schema_1 = require("../db-schema/user.schema");
let UserService = class UserService {
    constructor(usersModel, s3servise) {
        this.usersModel = usersModel;
        this.s3servise = s3servise;
        this.resDate = '-password -access_token -refresh_token';
        this.scipDate = {
            createdAt: 0,
            updatedAt: 0,
            password: 0,
            access_token: 0,
            refresh_token: 0,
            favorite: 0,
            advertisement: 0,
            forgottenPasswordToken: 0,
            verificationToken: 0,
            forgottenPassword: 0,
        };
    }
    async currentUser(id) {
        return await this.usersModel.findById(id, this.resDate);
    }
    async editingData(editingUserDto, id) {
        const { email } = editingUserDto;
        if (email) {
            const isUser = await this.usersModel.findOne({ email });
            if (isUser)
                throw new common_1.HttpException('Email in use', common_1.HttpStatus.CONFLICT);
        }
        const user = await this.usersModel
            .findByIdAndUpdate(id, editingUserDto, { new: true })
            .select(Object.assign(Object.assign({}, this.scipDate), { cards: 0 }));
        return this.normalizeData(user);
    }
    async editingPhoto(file, userId) {
        const photoUrl = await this.s3servise.uploadFile(file, s3_service_1.TypeOperation.AVSTAR);
        const user = await this.usersModel.findByIdAndUpdate(userId, { photo: photoUrl }, { new: true });
        return this.normalizeData(user);
    }
    async addFavirite(userId, advertisementId) {
        const user = await this.usersModel.findById(userId);
        user.favorite.push(advertisementId);
        await user.save();
        return true;
    }
    async getFavotiteNotices(userId) {
        const user = await this.usersModel.findById(userId, 'favorite').populate('favorite');
        return user.favorite;
    }
    async removeNoticeFromFavorite(userId, noticeId) {
        await this.usersModel.findByIdAndUpdate(userId, {
            $pull: { favorite: noticeId },
        });
        return noticeId;
    }
    async addNoticeToFavorite(userId, noticeId) {
        const user = await this.usersModel.findById(userId);
        user.favorite.push(noticeId);
        await user.save();
        return noticeId;
    }
    async allUserPets(userId) {
        const user = await this.usersModel.findById(userId).populate('cards').select(this.scipDate);
        return user;
    }
    async addPet(userId, pet) {
        const user = await this.usersModel.findById(userId);
        user.cards.push(pet._id);
        await user.save();
        return;
    }
    async removePet(userId, pet) {
        const user = await this.usersModel.findById(userId);
        user.cards = user.cards.filter(x => x.toString() !== pet._id.toString());
        await user.save();
        return;
    }
    async addPost(userId, post) {
        const user = await this.usersModel.findById(userId);
        user.posts.push(post._id);
        await user.save();
        return;
    }
    async removePost(userId, post) {
        const user = await this.usersModel.findById(userId);
        user.posts = user.posts.filter(x => x.toString() !== post._id.toString());
        await user.save();
        return;
    }
    async addComment(userId, comment) {
        const user = await this.usersModel.findById(userId);
        user.comments.push(comment._id);
        await user.save();
        return;
    }
    async removeComment(userId, comment) {
        const user = await this.usersModel.findById(userId);
        user.comments = user.comments.filter(x => x.toString() !== comment._id.toString());
        await user.save();
        return;
    }
    async addNotice(userId, post) {
        const user = await this.usersModel.findById(userId);
        user.advertisement.push(post._id);
        user.save();
        return;
    }
    async removeNotise(userId, post) {
        const user = await this.usersModel.findById(userId);
        user.advertisement = user.advertisement.filter(x => x.toString() !== post._id.toString());
        user.save();
        return;
    }
    async userById(id) {
        return await this.usersModel.findById(id);
    }
    async userByEmail(email) {
        const regex = new RegExp(email, 'i');
        return await this.usersModel.findOne({ email: regex });
    }
    async userByUsername(username) {
        return await this.usersModel.findOne({ name: username });
    }
    normalizeData(user) {
        const res = Object.assign({}, user);
        delete res._doc.password;
        delete res._doc.access_token;
        delete res._doc.refresh_token;
        return Object.assign({}, res._doc);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, s3_service_1.S3Service])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map