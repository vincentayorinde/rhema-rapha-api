import { AppointmentMailDto } from './../../appointment/dto/appointment_mail.dto';
import { emailSettings } from './../../config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

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

  public emailSenderWithTemplate(patient: AppointmentMailDto): void {
    this.mailerService
      .sendMail({
        // to: patient.patientEmail,
        to: 'dra81481@eoopy.com',
        from: emailSettings.fromEmail,
        subject: 'Appointment Notification with template ✔',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        // context: {
        //   // Data to be sent to template engine.
        //   date: patient.date,
        //   appointmentTime: patient.appointmentTime,
        //   doctorEmail: patient.doctorEmail,
        //   patientEmail: patient.patientEmail,
        //   patientFullName: patient.patientFullName,
        //   doctorFullName: patient.doctorFullName,
        //   doctorPhoneNumber: patient.doctorPhoneNumber,
        //   description: patient.description,
        // },
      })
      .then((success: any) => {
        console.log(success);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
