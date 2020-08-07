import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { DoctorDto } from './dto/doctor.dto';
import { GetDoctorDto } from './dto/getdoctor.dto';
import { Roles } from '../authentication/auth-guard/role.decorator';
import { UserRole } from '../shared/user-base.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorRepository)
    private readonly doctorRepository: DoctorRepository,
  ) {}

  public async getDoctors() {
    try {
      return await this.doctorRepository.find({ relations: ['department'] });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getByDepartmentId(id: string) {
    try {
      return await this.doctorRepository.find({
        where: id,
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

  public async getDoctorByEmail(email: string) {
    try {
      return await this.doctorRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addDoctor(newDoctor: DoctorDto) {
    try {
      newDoctor.role = UserRole.DOCTOR;
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
