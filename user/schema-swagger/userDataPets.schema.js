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
exports.UserDataPets = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDataPets {
}
__decorate([
    (0, swagger_1.ApiProperty)({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' }),
    __metadata("design:type", Object)
], UserDataPets.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com' }),
    __metadata("design:type", String)
], UserDataPets.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James Allen' }),
    __metadata("design:type", String)
], UserDataPets.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+380964752260' }),
    __metadata("design:type", String)
], UserDataPets.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
    }),
    __metadata("design:type", Boolean)
], UserDataPets.prototype, "verify", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://api.multiavatar.com/1.png',
    }),
    __metadata("design:type", String)
], UserDataPets.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                _id: '63f139e997fc630d8da1ff68',
                name: 'Jack',
                birth: '22.04.2018',
                breed: 'Persian cat',
                image: 'https://api.multiavatar.com/pet.png',
                comments: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem',
                owner: '63f37a8cbf6f72e7f1b27ba3',
            },
        ],
    }),
    __metadata("design:type", Array)
], UserDataPets.prototype, "cards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '20.08.1999',
    }),
    __metadata("design:type", String)
], UserDataPets.prototype, "birthday", void 0);
exports.UserDataPets = UserDataPets;
//# sourceMappingURL=userDataPets.schema.js.map