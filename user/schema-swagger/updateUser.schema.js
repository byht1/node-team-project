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
exports.UpdateUser = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateUser {
}
__decorate([
    (0, swagger_1.ApiProperty)({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' }),
    __metadata("design:type", Object)
], UpdateUser.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com' }),
    __metadata("design:type", String)
], UpdateUser.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James Allen' }),
    __metadata("design:type", String)
], UpdateUser.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+380964752260' }),
    __metadata("design:type", String)
], UpdateUser.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    }),
    __metadata("design:type", String)
], UpdateUser.prototype, "forgottenPasswordToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    }),
    __metadata("design:type", String)
], UpdateUser.prototype, "verificationToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateUser.prototype, "verify", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://api.multiavatar.com/1.png',
    }),
    __metadata("design:type", String)
], UpdateUser.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    __metadata("design:type", Array)
], UpdateUser.prototype, "favorite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    __metadata("design:type", Array)
], UpdateUser.prototype, "advertisement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6373c0bca5a6e4c9556f1e7a'] }),
    __metadata("design:type", Array)
], UpdateUser.prototype, "cards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    }),
    __metadata("design:type", String)
], UpdateUser.prototype, "forgottenPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '20.08.1999',
    }),
    __metadata("design:type", String)
], UpdateUser.prototype, "birthday", void 0);
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=updateUser.schema.js.map