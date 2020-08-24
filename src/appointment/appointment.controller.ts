import { IdentityUserDto } from './../authentication/identity-user/dto/identity-user.dto';
import { Response, query } from 'express';
import {
  Controller,
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
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto, AppointmentPatientDto } from './dto/appointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../authentication/auth-guard/role.guard';
import { Roles } from '../authentication/auth-guard/role.decorator';
import { QueryModel } from '../shared/model/query.model';
import { User } from '../authentication/auth-guard/current-user.decorator';

@Controller('appointment')
@UseGuards(AuthGuard(), RoleGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/all')
  @Roles('admin')
  public async getAppointments(
    @Res() res: Response,
    @Query() query: QueryModel,
  ) {
    const response = await this.appointmentService.getAppointments(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Appointments data', data: response });
  }

  @Get()
  @Roles('admin', 'doctor', 'patient')
  public async getAppointmentsByUserId(
    @User() userId: any,
    @Res() res: Response,
  ) {
    const response = await this.appointmentService.getByUserId(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User Appointments data', data: response });
  }

  public async getAppointmentByDoctorId() {}

  @Get('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async getById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.appointmentService.getAppointment(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Appointment Data', data: response });
  }

  @Post()
  @Roles('admin', 'doctor', 'patient')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() appointment: AppointmentDto,
    @Res() res: Response,
  ) {
    const response = await this.appointmentService.addAppointment(appointment);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment Created', data: response });
  }

  @Post()
  @Roles('patient')
  @UsePipes(ValidationPipe)
  public async createPatientAppointment(
    @Body() appointment: AppointmentPatientDto,
    @Res() res: Response,
    @User() user: IdentityUserDto,
  ) {
    appointment.patientId = user.id;
    const response = await this.appointmentService.addAppointment(appointment);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment Created', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async update(
    @Param('id') id: string,
    @Body() appointment: AppointmentDto,
    @Res() res: Response,
  ) {
    const response = await this.appointmentService.updateAppointment(
      id,
      appointment,
    );
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment updated', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async cancel(@Param('id') id: string, @Res() res: Response) {
    const response = await this.appointmentService.cancelAppointment(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.appointmentService.deleteAppointment(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment deleted', data: response });
  }
}
