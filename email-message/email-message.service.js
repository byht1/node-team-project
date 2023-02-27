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
exports.EmailMessageService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let EmailMessageService = class EmailMessageService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async forgottenPassword(email, token) {
        const dev = process.env.CURRENT_HOST ? `http://localhost:5000/` : 'https://node-team-project.onrender.com/';
        const title = 'Зміна пароля на сайті PERLY';
        const html = `<div>
    <h1>Підтвердження пошти на сайті PERLY</h1>
    <span>Для підтвердження перейдіть  <a href="https://byht1.github.io/react-team-project/forgotten-password/?token=${token}">за посиланням</a></span>
    <span>Для підтвердження перейдіть  <a href="http://localhost:3000/react-team-project/forgotten-password/?token=${token}">Локальне посилання</a></span>
    </br>
    </br>
    <span>Якщо це були не ви то перейдіть <a href="${dev}api/auth/forgotten-password/error/?token=${token}">за посиланням</a></span>
    </div>`;
        await this.example(html, title, email);
    }
    async example(html, title, email) {
        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'test.server.byht1@gmail.com',
                subject: title,
                html,
            });
        }
        catch (_a) {
            throw new common_1.HttpException('Не вдалося відправити повідомлення на пошту', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
EmailMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailMessageService);
exports.EmailMessageService = EmailMessageService;
//# sourceMappingURL=email-message.service.js.map