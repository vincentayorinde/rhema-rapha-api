import { Roles } from './../auth-guard/role.decorator';
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
  Delete,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ValidatorPipe } from '../../shared/pipes/validator.pipe';
import { AuthenticationService } from '../authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { IdentityUserService } from './identity-user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class IdentityUserController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly identityUserService: IdentityUserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidatorPipe())
  public async register(@Body() user: RegisterDto, @Res() res: Response) {
    const response = await this.authService.register(user);

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
    const response = await this.authService.signIn(user);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Login Successfully', data: response });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  public async googleAuth(@Req() _req: Request) {}

  @Get('google-redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request): Promise<any> {
    return this.authService.googleLogin(req);
  }

  @Get('users')
  public async getUsers(@Res() res: Response): Promise<any> {
    const response = await this.identityUserService.getAllUser();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Identity  Users', data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.identityUserService.deleteUser(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Doctor deleted', data: response });
  }
}
