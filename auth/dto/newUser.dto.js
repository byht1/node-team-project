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
exports.NewUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const helpers_1 = require("../../helpers");
class NewUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'User email' }),
    (0, class_validator_1.IsString)({ message: 'Not a line' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Incorrect email' }),
    (0, class_validator_1.Matches)(helpers_1.emailValid.reg.value, { message: helpers_1.emailValid.reg.message }),
    (0, class_validator_1.MaxLength)(helpers_1.emailValid.maxLength.value, { message: helpers_1.emailValid.maxLength.message }),
    (0, class_validator_1.MinLength)(helpers_1.emailValid.minLength.value, { message: helpers_1.emailValid.minLength.message }),
    __metadata("design:type", String)
], NewUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'User password' }),
    (0, class_validator_1.IsString)({ message: 'Not a line' }),
    (0, class_validator_1.Matches)(helpers_1.passwordSchema.upperCase.value, { message: helpers_1.passwordSchema.upperCase.message }),
    (0, class_validator_1.Matches)(helpers_1.passwordSchema.lowerCase.value, { message: helpers_1.passwordSchema.lowerCase.message }),
    (0, class_validator_1.Matches)(helpers_1.passwordSchema.lat.value, { message: helpers_1.passwordSchema.lat.message }),
    (0, class_validator_1.Matches)(helpers_1.passwordSchema.number.value, { message: helpers_1.passwordSchema.number.message }),
    (0, class_validator_1.MaxLength)(helpers_1.passwordSchema.max.value, { message: helpers_1.passwordSchema.max.message }),
    (0, class_validator_1.MinLength)(helpers_1.passwordSchema.min.value, { message: helpers_1.passwordSchema.min.message }),
    __metadata("design:type", String)
], NewUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Username' }),
    (0, class_validator_1.IsString)({ message: 'Not a line' }),
    (0, class_validator_1.MinLength)(helpers_1.nameValid.minLength.value, { message: helpers_1.nameValid.minLength.message }),
    (0, class_validator_1.MaxLength)(helpers_1.nameValid.maxLength.value, { message: helpers_1.nameValid.maxLength.message }),
    (0, class_validator_1.Matches)(helpers_1.nameValid.reg.value, { message: helpers_1.nameValid.reg.message }),
    __metadata("design:type", String)
], NewUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'City' }),
    (0, class_validator_1.IsString)({ message: 'Not a line' }),
    (0, class_validator_1.MinLength)(helpers_1.ciryValid.minLength.value, { message: helpers_1.ciryValid.minLength.message }),
    (0, class_validator_1.MaxLength)(helpers_1.ciryValid.maxLength.value, { message: helpers_1.ciryValid.maxLength.message }),
    (0, class_validator_1.Matches)(helpers_1.ciryValid.reg.value, { message: helpers_1.ciryValid.reg.message }),
    __metadata("design:type", String)
], NewUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+380961122333' }),
    (0, class_validator_1.IsString)({ message: 'Not a line' }),
    (0, class_validator_1.IsMobilePhone)('uk-UA', { strictMode: true }, { message: 'Not a valid phone number' }),
    __metadata("design:type", String)
], NewUserDto.prototype, "phone", void 0);
exports.NewUserDto = NewUserDto;
//# sourceMappingURL=newUser.dto.js.map