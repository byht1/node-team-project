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
exports.CreatePostSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatePostSchema {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post title', description: 'Post title' }),
    __metadata("design:type", String)
], CreatePostSchema.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post text', description: 'Post description' }),
    __metadata("design:type", String)
], CreatePostSchema.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'veterinary', description: 'Post category' }),
    __metadata("design:type", String)
], CreatePostSchema.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'post.jpg', description: 'Post photo' }),
    __metadata("design:type", Object)
], CreatePostSchema.prototype, "image", void 0);
exports.CreatePostSchema = CreatePostSchema;
//# sourceMappingURL=create-post.schema.js.map