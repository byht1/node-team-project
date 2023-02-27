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
exports.CreatePetSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatePetSchema {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jack', description: 'Pet name' }),
    __metadata("design:type", String)
], CreatePetSchema.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '22.04.2018', description: 'Pet\'s date of birth in \'dd.mm.yyyy\' format' }),
    __metadata("design:type", String)
], CreatePetSchema.prototype, "birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Persian cat', description: 'Pet breed' }),
    __metadata("design:type", String)
], CreatePetSchema.prototype, "breed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'my-pet.jpg', description: 'Pet photo' }),
    __metadata("design:type", Object)
], CreatePetSchema.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem',
        description: 'Pet description'
    }),
    __metadata("design:type", String)
], CreatePetSchema.prototype, "comments", void 0);
exports.CreatePetSchema = CreatePetSchema;
//# sourceMappingURL=create-pet.schema.js.map