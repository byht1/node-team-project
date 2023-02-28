import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class EmailMessageService {
  constructor(private readonly mailerService: MailerService) {}

  async forgottenPassword(email: string, token: string) {
    const dev = process.env.CURRENT_HOST ? `http://localhost:5000/` : 'https://node-team-project.onrender.com/';
    const title = 'Зміна пароля на сайті PERLY';
    const html = `<div>
    <h1>Підтвердження пошти на сайті PERLY</h1>
    <span>Для підтвердження перейдіть  <a href="https://byht1.github.io/react-team-project/forgotten-password/?token=${token}">за посиланням</a></span>
    </br>
    </br>
    <span>Якщо це були не ви то перейдіть <a href="${dev}api/auth/forgotten-password/error/?token=${token}">за посиланням</a></span>
    </div>`;

    await this.example(html, title, email);
  }

  private async example(html: string, title: string, email: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'test.server.byht1@gmail.com',
        subject: title,
        html,
      });
    } catch {
      throw new HttpException('Не вдалося відправити повідомлення на пошту', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
