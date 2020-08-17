import { PasswordEncrypterService } from './../authentication/auth-configuration/password-encrypter.service';
import { PatientDto } from './dto/patient.dto';
import {
  Controller,
  UseGuards,
  Get,
  Res,
  Query,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../authentication/auth-guard/role.decorator';
import { QueryModel } from '../shared/model/query.model';
import { RoleGuard } from '../authentication/auth-guard/role.guard';
import { PatientService } from './patient.service';
import { Response } from 'express';
import { User } from '../authentication/auth-guard/current-user.decorator';

@Controller('patient')
@UseGuards(AuthGuard(), RoleGuard)
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private passwordEncrypterService: PasswordEncrypterService,
  ) {}

  @Get('all')
  @Roles('admin')
  public async getPatients(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const response = await this.patientService.getPatients(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Patients data', data: response });
  }

  @Get()
  @Roles('patient', 'admin')
  public async getByPatientId(
    @User() user: any,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.patientService.getPatient(user.id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Patient Data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'patient', 'doctor')
  public async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.patientService.getPatient(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Patient Data', data: response });
  }

  // @Post()
  // @Roles('admin', 'admin', 'patient', 'doctor')
  // @UsePipes(ValidationPipe)
  // public async create(
  //   @Body() patient: PatientDto,
  //   @Res() res: Response,
  // ): Promise<any> {
  //   if (patient.password) {
  //     patient.password = (
  //       await this.passwordEncrypterService.encrypt(patient.password)
  //     ).toString();
  //   }

  //   const response = await this.patientService.addPatient(patient);

  //   return res
  //     .status(HttpStatus.CREATED)
  //     .json({ message: 'Patient Created', data: response });
  // }

  @Put('/:id')
  @Roles('admin', 'patient', 'doctor')
  public async update(
    @Param('id') id: string,
    @Body() patient: PatientDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.patientService.updatePatient(id, patient);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Patient updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.patientService.deletePatient(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Patient deleted', data: response });
  }
}
