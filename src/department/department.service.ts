import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentRepository } from './department.repository';
import { ResultException } from '../configuration/exceptions/result';
import { DepartmentDto } from './dto/department.dto';
import { QueryModel } from 'src/shared/model/query.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentRepository)
    private readonly departmentRepository: DepartmentRepository,
  ) {}
  public async getDepartments(query: QueryModel): Promise<any> {
    try {
      return await this.departmentRepository.find({
        relations: ['doctor'],
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async getDepartment(id: string): Promise<any> {
    try {
      return await this.departmentRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async addDepartment(newDepartment: DepartmentDto): Promise<any> {
    try {
      return await this.departmentRepository.save(newDepartment);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async updateDepartment(
    id: string,
    newDepartment: DepartmentDto,
  ): Promise<any> {
    try {
      const dbDepartment = this.getDepartment(id);
      if (dbDepartment) {
        return await this.departmentRepository.update(id, newDepartment);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async deleteDepartment(id: string): Promise<any> {
    try {
      return await this.departmentRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
