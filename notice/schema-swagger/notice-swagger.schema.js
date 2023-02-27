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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const categoryNotices_1 = require("../../global/enum/categoryNotices");
class NoticeSwagger {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Information about the user who created the notification',
        example: {
            _id: '611e270507081715c89c10e1',
            email: 'user@example.com',
            phone: '+1234567890',
        },
    }),
    __metadata("design:type", Object)
], NoticeSwagger.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Сute dog looking for a home',
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rich',
        required: false,
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "['https://team-project-react-node.s3.amazonaws.com/image/bee726b9-45b2-4a31-b616-4cee1c640209.jpg', ...]",
        required: false,
    }),
    __metadata("design:type", Array)
], NoticeSwagger.prototype, "imgUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '01.01.2023',
        required: false,
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Dog',
        required: false,
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "petType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pomeranian',
        required: false,
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "breed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        required: false,
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'male',
        required: false,
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '150',
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'in good hands',
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
        required: false,
    }),
    __metadata("design:type", String)
], NoticeSwagger.prototype, "comments", void 0);
exports.NoticeSwagger = NoticeSwagger;
//# sourceMappingURL=notice-swagger.schema.js.map