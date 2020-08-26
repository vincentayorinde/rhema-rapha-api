import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageService } from './configuration/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicationModule } from './medication/medication.module';
import { DepartmentModule } from './department/department.module';
import { DoctorModule } from './doctor/doctor.module';
import { SharedModule } from './shared/shared.module';
import { PatientModule } from './patient/patient.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './configuration/exceptions/exception.filter';
import { MailerModule } from '@nestjs-modules/mailer';
import { emailSettings } from './config';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
const path = join(__dirname, '../src/template/');

@Module({
  imports: [
    ConfigModule,
    AppointmentModule,
    MedicationModule,
    DepartmentModule,
    DoctorModule,
    SharedModule,
    PatientModule,
    AuthenticationModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      database:
        'postgres://oekccyrnxirqoc:7a6371bb950c828698ebe19bb939b1ff21d928ce264aeb1d226628faa597460f@ec2-52-71-231-180.compute-1.amazonaws.com:5432/dabl3kqo68sg4s',
      cli: {
        migrationsDir: 'src/db/migrations',

        entitiesDir: 'src/db/entities',
      },
    }),
    // TypeOrmModule.forRoot({ autoLoadEntities: true }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
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
        dir: path,
        adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
    MessageService,
  ],
})
export class AppModule {}
