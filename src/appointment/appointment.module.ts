import { SharedModule } from './../shared/shared.module';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    AuthenticationModule,
    SharedModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
