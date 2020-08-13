import { IdentityUserService } from './identity-user/identity-user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EXPIRESIN } from '../configuration/config';
import { PasswordEncrypterService } from './auth-configuration/password-encrypter.service';
import { IdentityUserDto } from './identity-user/dto/identity-user.dto';
import { ResultException } from '../configuration/exceptions/result';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { UserRole } from '../shared/user-base.entity';
import { RegisterDto } from './identity-user/dto/register.dto';
import { SignInDto } from './identity-user/dto/signIn.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly passwordEncrypterService: PasswordEncrypterService,
    private readonly jwtService: JwtService,
    private readonly identityUserService: IdentityUserService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  public async register(data: RegisterDto): Promise<any> {
    try {
      const dbUser = await this.validateUser(data.email);

      if (typeof dbUser === 'object' && dbUser !== null) {
        throw new HttpException(
          { message: 'User Already Exit' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const password = (
        await this.passwordEncrypterService.encrypt(data.password)
      ).toString();

      const user = new IdentityUserDto();
      user.email = data.email;
      user.fullName = data.fullName;
      user.phonenumber = data.phonenumber;
      user.username = data.username;
      user.password = password;
      data.password = password;

      this.registerUser(data, user);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async signInUser(user: SignInDto): Promise<any> {
    try {
      const dbUser = await this.identityUserService.getUserByEmail(user.email);

      if (!dbUser || Object.keys(dbUser).length === 0) {
        return new ResultException('Wrong credentials', HttpStatus.BAD_REQUEST);
      }

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
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async googleLogin(req: any): Promise<any> {
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

  public async validateUser(email: string): Promise<any> {
    try {
      return await this.identityUserService.getUserByEmail(email);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private async createToken(id: string, email: string, role: UserRole) {
    const expiresIn = EXPIRESIN;
    const user = { id: id, email: email, role: role };
    const token = this.jwtService.sign(user);

    return { expiresIn: expiresIn, token };
  }

  private verifyToken(token: string): any {
    this.jwtService.verify(token);
  }

  private registerUser(data: any, user: IdentityUserDto) {
    const role = data.role.toLowerCase();
    try {
      switch (role) {
        case 'patient':
          user.role = UserRole.PATIENT;
          this.checkUserCreated(() => this.patientService.addPatient(data));
          break;

        case 'doctor':
          user.role = UserRole.DOCTOR;
          this.checkUserCreated(() => this.doctorService.addDoctor(data));
          break;

        case 'admin':
          user.role = UserRole.ADMIN;
          this.identityUserService.createUser(user);
          break;

        default:
          new ResultException('Invalid Role', HttpStatus.BAD_REQUEST);
          break;
      }
    } catch (error) {
      throw new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private async checkUserCreated(createUser: any) {
    try {
      const result = await createUser();

      if (typeof result === 'object' && result !== null) {
        const user = new IdentityUserDto();
        user.email = result.email;
        user.fullName = result.fullName;
        user.phonenumber = result.phonenumber;
        user.username = result.username;
        user.password = result.password;

        this.identityUserService.createUser(user);
      }
    } catch (error) {
      throw new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
