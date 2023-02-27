"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../db-schema/user.schema");
const email_message_module_1 = require("../email-message/email-message.module");
const email_message_service_1 = require("../email-message/email-message.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const s3_service_1 = require("../AWS/s3.service");
const passport_1 = require("@nestjs/passport");
const google_strategy_1 = require("./strategy/google.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env' }),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.Users.name, schema: user_schema_1.UsersSchema }]),
            passport_1.PassportModule,
            jwt_1.JwtModule,
            email_message_module_1.EmailMessageModule,
            user_module_1.UserModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, email_message_service_1.EmailMessageService, s3_service_1.S3Service, user_service_1.UserService, google_strategy_1.GoogleStrategy],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule, mongoose_1.MongooseModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map