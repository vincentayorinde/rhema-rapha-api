import * as ejs from 'ejs';
import { AppointmentMailDto } from './../../appointment/dto/appointment_mail.dto';
import { emailSettings } from './../../config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
const path = join(__dirname, '../../../src/template/');
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public basicEmailSender(patient: AppointmentMailDto): void {
    this.mailerService
      .sendMail({
        to: patient.patientEmail, // List of receivers email address
        from: emailSettings.fromEmail, // Senders email address
        subject: 'Rhema Rapha Appointment Notification ✔', // Subject line
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

  public async emailSenderWithTemplate(patient: AppointmentMailDto) {
    try {
      const data = await ejs.renderFile(path + 'index.ejs', {
        appointment_detail: patient,
      });

      const result = await this.mailerService.sendMail({
        to: patient.patientEmail,
        from: emailSettings.fromEmail,
        subject: 'Appointment Notification',
        html: data,
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
