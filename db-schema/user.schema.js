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
exports.UsersSchema = exports.Users = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let Users = class Users {
};
__decorate([
    (0, swagger_1.ApiProperty)({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' }),
    __metadata("design:type", Object)
], Users.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com' }),
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Users.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Users.prototype, "refresh_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com' }),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+380964752260' }),
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    }),
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Users.prototype, "forgottenPasswordToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    }),
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Users.prototype, "verificationToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
    }),
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "verify", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://api.multiavatar.com/1.png',
    }),
    (0, mongoose_1.Prop)({
        type: String,
        default: 'https://api.multiavatar.com/1.png',
    }),
    __metadata("design:type", String)
], Users.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Notice' }],
        default: [],
    }),
    __metadata("design:type", Array)
], Users.prototype, "favorite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Notice' }],
        default: [],
    }),
    __metadata("design:type", Array)
], Users.prototype, "advertisement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Pet' }],
        default: [],
    }),
    __metadata("design:type", Array)
], Users.prototype, "cards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Post' }],
        default: [],
    }),
    __metadata("design:type", Array)
], Users.prototype, "posts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    }),
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Users.prototype, "forgottenPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '20.08.1999',
    }),
    (0, mongoose_1.Prop)({ type: String, default: '00.00.0000' }),
    __metadata("design:type", String)
], Users.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kyiv',
    }),
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
Users = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], Users);
exports.Users = Users;
exports.UsersSchema = mongoose_1.SchemaFactory.createForClass(Users);
//# sourceMappingURL=user.schema.js.map