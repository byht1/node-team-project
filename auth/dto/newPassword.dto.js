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
exports.NewPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const helpers_1 = require("../../helpers");
class NewPasswordDto {
}
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
], NewPasswordDto.prototype, "password", void 0);
exports.NewPasswordDto = NewPasswordDto;
//# sourceMappingURL=newPassword.dto.js.map