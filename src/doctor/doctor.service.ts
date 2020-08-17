import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { DoctorDto } from './dto/doctor.dto';
import { GetDoctorDto } from './dto/getdoctor.dto';
import { IdentityUserService } from '../authentication/identity-user/identity-user.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorRepository)
    private readonly doctorRepository: DoctorRepository,
    private readonly identityUserService: IdentityUserService,
  ) {}

  public async getDoctors(query: QueryModel): Promise<any> {
    try {
      return await this.doctorRepository.find({
        relations: ['appointment'],
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getByDepartmentId(id: string): Promise<any> {
    try {
      return await this.doctorRepository.find({
        where: 'departmentId is' + id,
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDoctor(id: string): Promise<GetDoctorDto> {
    try {
      return await this.doctorRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDoctorByEmail(email: string): Promise<DoctorDto> {
    try {
      return await this.doctorRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addDoctor(newDoctor: DoctorDto) {
    try {
      return await this.doctorRepository.save(newDoctor);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateDoctor(id: string, newDoctor: DoctorDto) {
    try {
      const dbDoctor = this.getDoctor(id);
      if (dbDoctor) {
        return await this.doctorRepository.update(id, newDoctor);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteDoctor(id: string) {
    try {
      return await this.doctorRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
