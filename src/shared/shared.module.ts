import { emailSettings } from './../config';
import { IdentityUserService } from './../authentication/identity-user/identity-user.service';
import { Module } from '@nestjs/common';
import { IdentityUserRepository } from '../authentication/identity-user/identity-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './service/notification.service';
import { EmailService } from './service/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdentityUserRepository]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com',
        port: 587,
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.FROM_EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      },
      defaults: {
        from: emailSettings.fromEmail,
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [IdentityUserService, NotificationService, EmailService],
  exports: [IdentityUserService, EmailService],
})
export class SharedModule {}
