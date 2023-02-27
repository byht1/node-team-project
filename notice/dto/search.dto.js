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
exports.SearchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const categoryNotices_1 = require("../../global/enum/categoryNotices");
class SearchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "One of category 'sell', 'lost/found', 'in good hands'", example: 'sell' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Not a line' }),
    (0, class_validator_1.IsEnum)(categoryNotices_1.CategoryNotices),
    __metadata("design:type", String)
], SearchDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Search by title', example: 'Beautiful cat', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Not a line' }),
    __metadata("design:type", String)
], SearchDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount of ads per page', example: '10', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], SearchDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Page number from which the counting starts', example: '0', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], SearchDto.prototype, "offset", void 0);
exports.SearchDto = SearchDto;
//# sourceMappingURL=search.dto.js.map