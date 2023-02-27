"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notice_schema_1 = require("../db-schema/notice.schema");
const notice_controller_1 = require("./notice.controller");
const notice_service_1 = require("./notice.service");
const user_service_1 = require("../user/user.service");
const s3_service_1 = require("../AWS/s3.service");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
let NoticeModule = class NoticeModule {
};
NoticeModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: notice_schema_1.Notice.name, schema: notice_schema_1.NoticeSchema }]), auth_module_1.AuthModule, user_module_1.UserModule],
        controllers: [notice_controller_1.NoticeController],
        providers: [notice_service_1.NoticeService, s3_service_1.S3Service, user_service_1.UserService],
    })
], NoticeModule);
exports.NoticeModule = NoticeModule;
//# sourceMappingURL=notice.module.js.map