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
exports.CommentSchema = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./post.schema");
const user_schema_1 = require("./user.schema");
let Comment = class Comment {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f139e997fc630d8da1ff68' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Comment.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post title' }),
    (0, mongoose_1.Prop)({ required: [true, 'text is required'] }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f37a8cbf6f72e7f1b27ba3' }),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Post' }),
    __metadata("design:type", post_schema_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '63f37a8cbf6f72e7f1b27ba3' }),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", user_schema_1.Users)
], Comment.prototype, "author", void 0);
Comment = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
//# sourceMappingURL=comments.schema.js.map