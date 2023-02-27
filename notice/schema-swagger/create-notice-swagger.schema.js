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
exports.CreateNoticeSwaggerSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
const categoryNotices_1 = require("../../global/enum/categoryNotices");
class CreateNoticeSwaggerSchema {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Сute dog looking for a home' }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Dog',
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "petType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rich',
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '01.01.2023',
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pomeranian',
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "breed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "One of 'male', 'female' ",
        enum: ['male', 'female'],
        example: 'male',
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '150',
        description: "Price is required if category is 'sell' ",
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "One of 'sell', 'lost/found', 'in good hands'",
        enum: categoryNotices_1.CategoryNotices,
        example: 'in good hands',
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur',
        required: false,
    }),
    __metadata("design:type", String)
], CreateNoticeSwaggerSchema.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
            example: "['https://team-project-react-node.s3.amazonaws.com/image/3f0cd17f-d25f-491a-8cce-00bf993edc5f.jpg']",
        },
    }),
    __metadata("design:type", Array)
], CreateNoticeSwaggerSchema.prototype, "images", void 0);
exports.CreateNoticeSwaggerSchema = CreateNoticeSwaggerSchema;
//# sourceMappingURL=create-notice-swagger.schema.js.map