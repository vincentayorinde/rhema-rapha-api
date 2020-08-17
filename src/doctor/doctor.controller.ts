import { PasswordEncrypterService } from './../authentication/auth-configuration/password-encrypter.service';
import {
  Controller,
  Get,
  Res,
  Query,
  HttpStatus,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../authentication/auth-guard/role.decorator';
import { QueryModel } from '../shared/model/query.model';
import { Response } from 'express';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../authentication/auth-guard/role.guard';

@Controller('doctor')
@UseGuards(AuthGuard(), RoleGuard)
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private passwordEncrypterService: PasswordEncrypterService,
  ) {}

  @Get()
  @Roles('admin')
  public async getDoctors(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const response = await this.doctorService.getDoctors(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Doctors data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'doctor')
  public async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.getDoctor(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Doctor Data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'doctor')
  public async getDoctorsByDepartmentId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.getByDepartmentId(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Doctor Data', data: response });
  }

  // @Post()
  // @Roles('admin', 'doctor')
  // @UsePipes(ValidationPipe)
  // public async create(
  //   @Body() doctor: DoctorDto,
  //   @Res() res: Response,
  // ): Promise<any> {
  //   if (doctor.password) {
  //     doctor.password = (
  //       await this.passwordEncrypterService.encrypt(doctor.password)
  //     ).toString();
  //   }
  //   const response = await this.doctorService.addDoctor(doctor);

  //   return res
  //     .status(HttpStatus.CREATED)
  //     .json({ message: 'Doctor Created', data: response });
  // }

  @Put('/:id')
  @Roles('admin', 'doctor')
  public async update(
    @Param('id') id: string,
    @Body() Doctor: DoctorDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.updateDoctor(id, Doctor);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Doctor updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.deleteDoctor(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Doctor deleted', data: response });
  }
}
