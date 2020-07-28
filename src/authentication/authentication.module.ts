import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { PasswordEncrypterService } from './auth-configuration/password-encrypter.service';
import { IdentityUserService } from './identity-user/identity-user.service';
import { IdentityUserController } from './identity-user/identity-user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SECRET, EXPIRESIN } from '../configuration/config';
import { JwtStrategy } from './auth-configuration/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityUserRepository } from './identity-user/identity-user.repository';
import { GoogleStrategy } from './auth-configuration/google.strategy';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    PatientModule,
    DoctorModule,
    TypeOrmModule.forFeature([IdentityUserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || SECRET,
      signOptions: { expiresIn: EXPIRESIN },
    }),
  ],
  controllers: [IdentityUserController],
  providers: [
    AuthenticationService,
    PasswordEncrypterService,
    IdentityUserService,
    JwtStrategy,
    GoogleStrategy,
  ],
  exports: [PassportModule, AuthenticationService],
})
export class AuthenticationModule {}
