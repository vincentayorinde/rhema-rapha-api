import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public basicEmailSender(patient: { name: string; email: string }): void {
    this.mailerService
      .sendMail({
        to: patient.email, // List of receivers email address
        from: 'user@outlook.com', // Senders email address
        subject: 'Appointment Notification ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public emailSenderWithTemplate(patient: {
    name: string;
    email: string;
  }): void {
    this.mailerService
      .sendMail({
        to: patient.email,
        from: 'noreply@nestjs.com',
        subject: 'Appointment Notification with template ✔',
        template: __dirname + 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          email: patient.email,
          name: patient.name,
        },
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
