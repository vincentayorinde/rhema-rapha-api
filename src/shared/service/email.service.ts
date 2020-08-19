import { emailSettings } from './../../config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public basicEmailSender(patient: { name: string; email: string }): void {
    this.mailerService
      .sendMail({
        to: patient.email, // List of receivers email address
        from: emailSettings.fromEmail, // Senders email address
        subject: 'Appointment Notification ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((success: any) => {
        console.log(success);
      })
      .catch((err: any) => {
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
        from: emailSettings.fromEmail,
        subject: 'Appointment Notification with template ✔',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          email: patient.email,
          name: patient.name,
        },
      })
      .then((success: any) => {
        console.log(success);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
