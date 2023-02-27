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
exports.CreateNoticeDto = void 0;
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../decorators");
const categoryNotices_1 = require("../../global/enum/categoryNotices");
const helpers_1 = require("../../helpers");
class CreateNoticeDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.IsIn)(['sell', 'lost/found', 'in good hands']),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.MinLength)(2, { message: '$property should be from 2 symbols' }),
    (0, class_validator_1.MaxLength)(48, { message: '$property should be maximum 48 symbols' }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.emptyField.value, { message: helpers_1.fieldsValid.emptyField.message }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.allowedCharacters.value, { message: helpers_1.fieldsValid.allowedCharacters.message }),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.MinLength)(2, { message: '$property should be from 2 symbols' }),
    (0, class_validator_1.MaxLength)(16, { message: '$property should be maximum 16 symbols' }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.emptyField.value, { message: helpers_1.fieldsValid.emptyField.message }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.allowedCharacters.value, { message: helpers_1.fieldsValid.allowedCharacters.message }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "name", void 0);
__decorate([
    (0, decorators_1.IsValidDate)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.emptyField.value, { message: helpers_1.fieldsValid.emptyField.message }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.allowedCharacters.value, { message: helpers_1.fieldsValid.allowedCharacters.message }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.oneWord.value, { message: helpers_1.fieldsValid.oneWord.message }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "petType", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.MinLength)(2, { message: '$property should be from 2 symbols' }),
    (0, class_validator_1.MaxLength)(50, { message: '$property should be maximum 50 symbols' }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.emptyField.value, { message: helpers_1.fieldsValid.emptyField.message }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.allowedCharacters.value, { message: helpers_1.fieldsValid.allowedCharacters.message }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "breed", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.IsIn)(['male', 'female']),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "sex", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.emptyField.value, { message: helpers_1.fieldsValid.emptyField.message }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.allowedCharacters.value, { message: helpers_1.fieldsValid.allowedCharacters.message }),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: '$property should be a number' }),
    (0, class_validator_1.ValidateIf)(o => o.category === categoryNotices_1.CategoryNotices.SELL),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.emptyField.value, { message: helpers_1.fieldsValid.emptyField.message }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property should be a string' }),
    (0, class_validator_1.MinLength)(2, { message: '$property should be from 2 symbols' }),
    (0, class_validator_1.MaxLength)(200, { message: '$property should be maximum 200 symbols' }),
    (0, class_validator_1.Matches)(helpers_1.fieldsValid.emptyField.value, { message: helpers_1.fieldsValid.emptyField.message }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeDto.prototype, "comments", void 0);
exports.CreateNoticeDto = CreateNoticeDto;
//# sourceMappingURL=create-notice.dto.js.map