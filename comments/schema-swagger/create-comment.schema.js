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
exports.CreateCommentSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateCommentSchema {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'This article was really helpful! Thanks!',
        description: 'Another user\'s comment on this post'
    }),
    __metadata("design:type", String)
], CreateCommentSchema.prototype, "text", void 0);
exports.CreateCommentSchema = CreateCommentSchema;
//# sourceMappingURL=create-comment.schema.js.map