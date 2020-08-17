import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './configuration/configuration.service';
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

@Module({
  imports: [
    AppointmentModule,
    MedicationModule,
    DepartmentModule,
    DoctorModule,
    SharedModule,
    PatientModule,
    AuthenticationModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
    MessageService,
    ConfigurationService,
  ],
})
export class AppModule {}
