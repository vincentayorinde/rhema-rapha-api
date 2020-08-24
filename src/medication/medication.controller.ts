import { Response } from 'express';
import { MedicationService } from './medication.service';
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
import { RoleGuard } from '../authentication/auth-guard/role.guard';
import { Roles } from '../authentication/auth-guard/role.decorator';
import { QueryModel } from '../shared/model/query.model';
import { MedicationDto } from './dto/medication.dto';

@Controller('medication')
@UseGuards(AuthGuard(), RoleGuard)
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Get('/all')
  @Roles('admin')
  public async getMedications(
    @Res() res: Response,
    @Query() query: QueryModel,
  ) {
    const response = await this.medicationService.getMedications(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Medications data', data: response });
  }

  @Get('')
  @Roles('admin', 'patient', 'doctor')
  public async getMedicationsByUserId(
    @Param('id') identityUserId,
    @Res() res: Response,
  ) {
    const response = await this.medicationService.getMedicationsByUserId(
      identityUserId,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Medication Data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'patient', 'doctor')
  public async getById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.medicationService.getMedication(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Medication Data', data: response });
  }

  @Post()
  @Roles('admin', 'doctor', 'patient')
  @UsePipes(ValidationPipe)
  public async create(@Body() patient: MedicationDto, @Res() res: Response) {
    const response = await this.medicationService.addMedication(patient);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Medication Created', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'patient', 'doctor')
  public async update(
    @Param('id') id: string,
    @Body() patient: MedicationDto,
    @Res() res: Response,
  ) {
    const response = await this.medicationService.updateMedication(id, patient);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Medication updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'doctor')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.medicationService.deleteMedication(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Medication deleted', data: response });
  }
}
