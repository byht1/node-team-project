"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMessageModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_message_service_1 = require("./email-message.service");
let EmailMessageModule = class EmailMessageModule {
};
EmailMessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env' }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    ignoreTLS: true,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
            }),
        ],
        providers: [email_message_service_1.EmailMessageService],
        exports: [email_message_service_1.EmailMessageService],
    })
], EmailMessageModule);
exports.EmailMessageModule = EmailMessageModule;
//# sourceMappingURL=email-message.module.js.map