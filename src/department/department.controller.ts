import { RoleGuard } from './../authentication/auth-guard/role.guard';
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
import { DepartmentService } from './department.service';
import { Roles } from '../authentication/auth-guard/role.decorator';
import { QueryModel } from '../shared/model/query.model';
import { DepartmentDto } from './dto/department.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('department')
@UseGuards(AuthGuard(), RoleGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  @Roles('admin')
  public async getDepartments(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const response = await this.departmentService.getDepartments(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Departments data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'patient', 'doctor')
  public async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.departmentService.getDepartment(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Department Data', data: response });
  }

  @Post()
  @Roles('admin')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() patient: DepartmentDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.departmentService.addDepartment(patient);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Department Created', data: response });
  }

  @Put('/:id')
  @Roles('admin')
  public async update(
    @Param('id') id: string,
    @Body() patient: DepartmentDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.departmentService.updateDepartment(id, patient);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Department updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.departmentService.deleteDepartment(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Department deleted', data: response });
  }
}
