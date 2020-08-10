import { PasswordEncrypterService } from './../authentication/auth-configuration/password-encrypter.service';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService, PasswordEncrypterService],
  exports: [PatientService],
})
export class PatientModule {}
