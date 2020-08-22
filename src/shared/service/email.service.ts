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
        name: 'Stranger',
      });

      this.mailerService.sendMail({
        // to: patient.patientEmail,
        to: 'rwg52359@bcaoo.com',
        from: emailSettings.fromEmail,
        subject: 'Appointment Notification with template ✔',
        html: data,

        // context: {
        //   date: patient.date,
        //   appointmentTime: patient.appointmentTime,
        //   doctorEmail: patient.doctorEmail,
        //   patientEmail: patient.patientEmail,
        //   patientFullName: patient.patientFullName,
        //   doctorFullName: patient.doctorFullName,
        //   doctorPhoneNumber: patient.doctorPhoneNumber,
        //   description: patient.description,
        // },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
