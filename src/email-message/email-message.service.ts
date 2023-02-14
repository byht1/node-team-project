import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { uuid } from 'uuidv4';

@Injectable()
export class EmailMessageService {
  constructor(private readonly mailerService: MailerService) {}

  //   async newPassword(email: string): Promise<string> {
  //     const dev = process.env.DEV
  //       ? `http://localhost:3000/pet-music-client`
  //       : `https://byht1.github.io/pet-music-client`;
  //     const link = uuidv4();
  //     const title = 'Заміна пароля на сайті LiveMusic';

  //     const html = `<div>
  //     <h1>Підтвердження пошти на сайті Bakery</h1>
  //     <p>Для зміни пароля перейдіть  <a href="${dev}/user/new-password/${link}">за посиланням</a></p>
  //     </hr>
  //     </br>
  //     </hr>
  //     <p>Якщо це були не ви то перйдіть  <a href="${dev}/user/new-password/error/${link}">за посиланням</a></p>
  //     </div>`;
  //     try {
  //       if (!dev) {
  //         await this.example(html, title, email);
  //       }

  //       await this.example(html, title, email);

  //       return link;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  private async example(
    html: string,
    title: string,
    email: string,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'test.server.byht1@gmail.com',
        subject: title,
        html,
      });
    } catch {
      throw new HttpException(
        'Не вдалося відправити повідомлення на пошту',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
