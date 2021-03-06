import { AppointmentMailDto } from './dto/appointment_mail.dto';
import { EmailService } from './../shared/service/email.service';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { AppointmentDto } from './dto/appointment.dto';
import { CronExpression, Cron } from '@nestjs/schedule';
import { Raw } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private readonly appointmentRepository: AppointmentRepository,
    private readonly emailService: EmailService,
  ) {}

  public async getByUserId(userId: string): Promise<any> {
    try {
      return await this.appointmentRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointments(query: QueryModel): Promise<any> {
    try {
      return await this.appointmentRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointment(id: string): Promise<any> {
    try {
      return await this.appointmentRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addAppointment(newAppointment: AppointmentDto) {
    try {
      return await this.appointmentRepository.save(newAppointment);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateAppointment(id: string, newAppointment: AppointmentDto) {
    try {
      const dbAppointment = this.getAppointment(id);
      if (dbAppointment) {
        return await this.appointmentRepository.update(id, newAppointment);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async cancelAppointment(id: string) {
    try {
      const dbAppointment: AppointmentDto = await this.getAppointment(id);
      if (dbAppointment) {
        dbAppointment.isCanceled = true;
        return await this.appointmentRepository.update(id, dbAppointment);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAppointment(id: string) {
    try {
      return await this.appointmentRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async getAppointNotification() {
    try {
      const yesterday = "NOW() - INTERVAL '1 DAY'";
      const appointments = await this.appointmentRepository.find({
        where: {
          date: Raw(alias => `${alias} = ${yesterday}`),
          isCanceled: false,
          // date: Raw(alias => `${alias} > NOW()`),
        },
      });

      appointments.forEach(appointment => {
        const appointmentMail = new AppointmentMailDto();
        appointmentMail.appointmentTime = appointment.appointmentTime;
        appointmentMail.date = appointment.date;
        appointmentMail.doctorFullName = appointment.doctor.fullName;
        appointmentMail.doctorPhoneNumber = appointment.doctor.phonenumber;
        appointmentMail.patientEmail = appointment.patient.email;
        appointmentMail.patientFullName = appointment.patient.fullName;

        this.emailService.emailSenderWithTemplate(appointmentMail);
      });

      console.log('Appointment', appointments);
      return;
    } catch (error) {
      return new ResultException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
