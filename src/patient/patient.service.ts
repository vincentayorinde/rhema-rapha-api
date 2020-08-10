import { UserRole } from './../shared/user-base.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { PatientDto } from './dto/patient.dto';
import { IdentityUserDto } from '../authentication/identity-user/dto/identity-user.dto';
import { IdentityUserService } from '../authentication/identity-user/identity-user.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly identityUserService: IdentityUserService,
  ) {}

  public async getPatients(query: QueryModel) {
    try {
      return await this.patientRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getPatient(id: string) {
    try {
      return await this.patientRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getPatientByEmail(email: string) {
    try {
      return await this.patientRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addPatient(newPatient: PatientDto) {
    try {
      const user = new IdentityUserDto();
      user.email = newPatient.email;
      user.fullName = newPatient.fullName;
      user.phonenumber = newPatient.phonenumber;
      user.password = newPatient.password;
      user.role = UserRole.PATIENT;

      await this.patientRepository.save(newPatient);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updatePatient(id: string, newPatient: PatientDto) {
    try {
      const dbPatient = this.getPatient(id);

      if (dbPatient) {
        return await this.patientRepository.update(id, newPatient);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deletePatient(id: string) {
    try {
      return await this.patientRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
