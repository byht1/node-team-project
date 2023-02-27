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
exports.NoticeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const s3_service_1 = require("../AWS/s3.service");
const notice_schema_1 = require("../db-schema/notice.schema");
const user_service_1 = require("../user/user.service");
let NoticeService = class NoticeService {
    constructor(noticeModel, s3Service, userService) {
        this.noticeModel = noticeModel;
        this.s3Service = s3Service;
        this.userService = userService;
    }
    async getNoticesByCategoryAndSearch(dto) {
        const { count = 10, offset = 0, category = 'sell', search = '' } = dto;
        const notices = await this.noticeModel
            .find({
            category,
            title: { $regex: new RegExp(search, 'i') },
        })
            .skip(Number(offset) * count)
            .limit(Number(count))
            .sort({ createdAt: -1 });
        return notices;
    }
    async getNoticeById(id) {
        const notice = await this.noticeModel.findById(id).populate({ path: 'owner', select: ['email', 'phone'] });
        if (!notice) {
            throw new common_1.HttpException('Ad not found', common_1.HttpStatus.NOT_FOUND);
        }
        return notice;
    }
    async addNotice(userId, dto, picture) {
        let picturePath = [];
        if (picture) {
            picturePath = await Promise.all(picture.map(pic => this.s3Service.uploadFile(pic, s3_service_1.TypeOperation.IMAGE)));
        }
        const notice = await this.noticeModel.create(Object.assign(Object.assign({}, dto), { owner: userId, imgUrl: picturePath }));
        await this.userService.addNotice(userId, notice);
        return notice;
    }
    async getUserNotices(userId) {
        const notices = this.noticeModel.find({ owner: userId });
        return notices;
    }
    async removeNotice(userId, noticeId) {
        const notice = await this.noticeModel.findOneAndRemove({ owner: userId, _id: noticeId });
        if (!notice) {
            throw new common_1.HttpException("The notice wasn't found or doesn't belong to the authorized user", common_1.HttpStatus.NOT_FOUND);
        }
        const picturePath = notice.imgUrl;
        if (picturePath.length > 0) {
            Promise.all(picturePath.map(el => this.s3Service.deleteFile(el, s3_service_1.TypeOperation.IMAGE)));
        }
        await this.userService.removeNotise(userId, notice);
        return notice;
    }
};
NoticeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notice_schema_1.Notice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        s3_service_1.S3Service,
        user_service_1.UserService])
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map