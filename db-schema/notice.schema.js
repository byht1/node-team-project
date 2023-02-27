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
exports.NoticeSchema = exports.Notice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const categoryNotices_1 = require("../global/enum/categoryNotices");
let Notice = class Notice {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifier of the user who created the Notice',
        example: '63ee3d660f0d7d1060550d13',
    }),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", Object)
], Notice.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'in good hands',
    }),
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Category is required'],
    }),
    __metadata("design:type", String)
], Notice.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Сute dog looking for a home',
    }),
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Title is required'],
    }),
    __metadata("design:type", String)
], Notice.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rich',
        required: false,
    }),
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Notice.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '01.01.2023',
        required: false,
    }),
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Notice.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Dog',
        required: false,
    }),
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Notice.prototype, "petType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pomeranian',
        required: false,
    }),
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Notice.prototype, "breed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'male',
    }),
    (0, mongoose_1.Prop)({ type: String, enum: ['male', 'female'], default: 'male', required: [true, 'Sex is required'] }),
    __metadata("design:type", String)
], Notice.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
    }),
    (0, mongoose_1.Prop)({ type: String, default: '', required: [true, 'Location is required'] }),
    __metadata("design:type", String)
], Notice.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'If category is "sell" price is required',
        example: '150',
        required: false,
    }),
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Notice.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "['https://team-project-react-node.s3.amazonaws.com/image/bee726b9-45b2-4a31-b616-4cee1c640209.jpg', ...]",
        required: false,
    }),
    (0, mongoose_1.Prop)({
        type: [String],
        default: ['https://team-project-react-node.s3.amazonaws.com/image/bee726b9-45b2-4a31-b616-4cee1c640209.jpg'],
    }),
    __metadata("design:type", Array)
], Notice.prototype, "imgUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem',
        required: false,
    }),
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Notice.prototype, "comments", void 0);
Notice = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], Notice);
exports.Notice = Notice;
exports.NoticeSchema = mongoose_1.SchemaFactory.createForClass(Notice);
//# sourceMappingURL=notice.schema.js.map