import { DoctorDto } from './../doctor/doctor.dto';
import { PatientDto } from './../patient/patient.dto';
import { IdentityUserService } from './identity-user/identity-user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EXPIRESIN } from '../configuration/config';
import { PasswordEncrypterService } from './auth-configuration/password-encrypter.service';
import { IdentityUserDto } from './identity-user/identity-user.dto';
import { ResultException } from '../configuration/exceptions/result';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { UserRole } from '../shared/user-base.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private passwordEncrypterService: PasswordEncrypterService,
    private jwtService: JwtService,
    private identityUserService: IdentityUserService,
    private doctorService: DoctorService,
    private patientService: PatientService,
  ) {}

  public async registerPatient(patient: PatientDto): Promise<any> {
    if (this.validateUser(patient.email)) {
      const password = (
        await this.passwordEncrypterService.encrypt(patient.email)
      ).toString();

      patient.password = password;
      patient.role = UserRole.PATIENT;
      return this.patientService.addPatient(patient);
    } else {
      throw new HttpException(
        { message: 'Patient Already Exit' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async registerDoctor(doctor: DoctorDto): Promise<any> {
    if (this.validateUser(doctor.email)) {
      const password = (
        await this.passwordEncrypterService.encrypt(doctor.password)
      ).toString();

      doctor.password = password;
      doctor.role = UserRole.DOCTOR;
      return this.doctorService.addDoctor(doctor);
    } else {
      throw new HttpException(
        { message: 'Doctor Already Exit' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async registerAdmin(user: IdentityUserDto): Promise<any> {
    if (this.validateUser(user.email)) {
      const password = (
        await this.passwordEncrypterService.encrypt(user.password)
      ).toString();

      user.password = password;
      user.role = UserRole.ADMIN;
      return this.identityUserService.createUser(user);
    } else {
      throw new HttpException(
        { message: 'User Already Exit' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async sigIn(user: { email: string; password: string }): Promise<any> {
    try {
      const dbUser = await this.identityUserService.getUserByEmail(user.email);
      if (dbUser) {
        const verifyPassword = await this.passwordEncrypterService.decrypt(
          user.password,
          dbUser.password,
        );

        if (verifyPassword) {
          const token = await this.createToken(
            dbUser.id,
            dbUser.email,
            dbUser.role,
          );
          return { token, dbUser };
        }
      }
      return new ResultException('Wrong credentials', HttpStatus.BAD_REQUEST);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async googleLogin(req: any) {
    if (!req.user) {
      return new ResultException('No user from google', HttpStatus.BAD_REQUEST);
    }

    if (this.validateUser(req.user.email)) {
      const newUser = new IdentityUserDto();
      newUser.email = req.user.email;
      newUser.fullName = req.user.fullName;
      newUser.avatar = req.user.picture;
      newUser.role = UserRole.PATIENT;

      return this.identityUserService.createUser(newUser);
    } else {
      const dbUser = await this.validateUser(req.user.email);

      const token = await this.createToken(
        dbUser.id,
        req.user.email,
        dbUser.role,
      );
      return { token, dbUser };
    }
  }

  public async validateUser(email: string) {
    return this.identityUserService.getUserByEmail(email);
  }

  private async createToken(id: string, email: string, role: UserRole) {
    const expiresIn = EXPIRESIN;
    const user = { id: id, email: email, role: role };
    const token = this.jwtService.sign(user);

    return { expiresIn: expiresIn, token };
  }

  public verifyToken(token: string) {
    this.jwtService.verify(token);
  }
}
