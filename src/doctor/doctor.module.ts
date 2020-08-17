import { AuthenticationModule } from './../authentication/authentication.module';
import { PasswordEncrypterService } from './../authentication/auth-configuration/password-encrypter.service';
import { DoctorService } from './doctor.service';
import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DoctorRepository } from './doctor.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    SharedModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService, PasswordEncrypterService],
  exports: [DoctorService],
})
export class DoctorModule {}
