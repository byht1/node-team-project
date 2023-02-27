import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailMessageService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    forgottenPassword(email: string, token: string): Promise<void>;
    private example;
}
