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
exports.FriendSchema = exports.Friend = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let Friend = class Friend {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63ed3f54220356e340b78d1d' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Friend.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Притулок для бездомних тварин 'Сіріус'" }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Friend.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://dogcat.com.ua' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Friend.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://goo.gl/maps/iq8NXEUf31EAQCzc6' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Friend.prototype, "addressUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://api.multiavatar.com/sirius.png' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Friend.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fedorivka, Kyiv Oblast, Ukraine, 07372' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Friend.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                isOpen: true,
                from: '11:00',
                to: '16:00',
            },
        ],
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Friend.prototype, "workDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+380931934069' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Friend.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'friend@gmail.com' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Friend.prototype, "email", void 0);
Friend = __decorate([
    (0, mongoose_1.Schema)()
], Friend);
exports.Friend = Friend;
exports.FriendSchema = mongoose_1.SchemaFactory.createForClass(Friend);
//# sourceMappingURL=friend.schema.js.map