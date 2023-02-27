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
exports.PetSchema = exports.Pet = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let Pet = class Pet {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f139e997fc630d8da1ff68' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Pet.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jack' }),
    (0, mongoose_1.Prop)({ required: [true, 'name is required'] }),
    __metadata("design:type", String)
], Pet.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '22.04.2018' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pet.prototype, "birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Persian cat' }),
    (0, mongoose_1.Prop)({ required: [true, 'breed is required'] }),
    __metadata("design:type", String)
], Pet.prototype, "breed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://api.multiavatar.com/pet.png' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pet.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem' }),
    (0, mongoose_1.Prop)({ required: [true, 'comments are required'] }),
    __metadata("design:type", String)
], Pet.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f37a8cbf6f72e7f1b27ba3' }),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", user_schema_1.Users)
], Pet.prototype, "owner", void 0);
Pet = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], Pet);
exports.Pet = Pet;
exports.PetSchema = mongoose_1.SchemaFactory.createForClass(Pet);
//# sourceMappingURL=pets.schema.js.map