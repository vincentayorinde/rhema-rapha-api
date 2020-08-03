import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentRepository } from './department.repository';
import { ResultException } from '../configuration/exceptions/result';
import { DepartmentDto } from './department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentRepository)
    private readonly departmentRepository: DepartmentRepository,
  ) {}
  public async getDepartments() {
    try {
      return await this.departmentRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async getDepartment(id: string) {
    try {
      return await this.departmentRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async addDepartment(newDepartment: DepartmentDto) {
    try {
      return await this.departmentRepository.save(newDepartment);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async updateDepartment(id: string, newDepartment: DepartmentDto) {
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
  public async deleteDepartment(id: string) {
    try {
      return await this.departmentRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
