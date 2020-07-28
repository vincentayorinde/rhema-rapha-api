import { DoctorDto } from '../../doctor/dto/doctor.dto';
import { PatientDto } from '../../patient/dto/patient.dto';
import {
  Controller,
  Post,
  UsePipes,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ValidatorPipe } from '../../shared/pipes/validator.pipe';
import { AuthenticationService } from '../authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { IdentityUserService } from './identity-user.service';
import { IdentityUserDto } from './dto/identity-user.dto';
import { GetDoctorDto } from '../../doctor/dto/getdoctor.dto';

@Controller('auth')
export class IdentityUserController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly identityUserService: IdentityUserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidatorPipe())
  public async registerPatient(@Body() user: PatientDto, @Res() res: Response) {
    const response = await this.authService.registerPatient(user);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Registration Successful', data: response });
  }

  @Post('register/doctor')
  @UsePipes(new ValidatorPipe())
  public async registerDoctor(@Body() user: DoctorDto, @Res() res: Response) {
    const response = await this.authService.registerDoctor(user);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Registration Successful', data: response });
  }

  @Post('register/admin')
  @UsePipes(new ValidatorPipe())
  public async registerUser(
    @Body() user: IdentityUserDto,
    @Res() res: Response,
  ) {
    const response = await this.authService.registerAdmin(user);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Registration Successful', data: response });
  }

  @Post('login')
  @UsePipes(new ValidatorPipe())
  public async loginUser(
    @Body() user: { email: string; password: string },
    @Res() res: Response,
  ) {
    const response = await this.authService.sigIn(user);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Login Successfully', data: response });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google-redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.googleLogin(req);
  }

  @Get('users')
  public async getUsers(@Res() res: Response) {
    const response = await this.identityUserService.getAllUser();

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Identity  Users', data: response });
  }
}
