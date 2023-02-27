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
exports.NewSchema = exports.New = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let New = class New {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63ecd2b5220356e340b77cf4' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], New.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'В День ветеринара в столиці пройде безкоштовний тренінг' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], New.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://ukr.media/animals/446231/' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], New.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'В неділю, 14 серпня, в Тимчасовому притулку для тварин «ВДНГ» пройде тренінг.' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], New.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-08-14' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], New.prototype, "date", void 0);
New = __decorate([
    (0, mongoose_1.Schema)()
], New);
exports.New = New;
exports.NewSchema = mongoose_1.SchemaFactory.createForClass(New);
//# sourceMappingURL=new.schema.js.map