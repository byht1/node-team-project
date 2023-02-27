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
exports.CreatePetDto = void 0;
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../decorators");
class CreatePetDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name should be a string' }),
    (0, class_validator_1.Length)(2, 20, { message: 'Name should be from 2 to 20 symbols' }),
    __metadata("design:type", String)
], CreatePetDto.prototype, "name", void 0);
__decorate([
    (0, decorators_1.IsValidDate)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "birth", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Breed should be a string' }),
    (0, class_validator_1.Length)(1, 50, { message: 'Breed should be a string and max length is 50 symbols' }),
    __metadata("design:type", String)
], CreatePetDto.prototype, "breed", void 0);
__decorate([
    (0, class_validator_1.Length)(8, 120, { message: 'Comments should be from 8 to 120 symbols' }),
    (0, class_validator_1.IsString)({ message: 'Comments should be a string' }),
    __metadata("design:type", String)
], CreatePetDto.prototype, "comments", void 0);
exports.CreatePetDto = CreatePetDto;
//# sourceMappingURL=create-pet.dto.js.map