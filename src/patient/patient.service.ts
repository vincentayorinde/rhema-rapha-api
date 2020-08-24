import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { PatientDto } from './dto/patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async getPatients(query: QueryModel) {
    try {
      return await this.patientRepository.find({
        relations: ['appointment'],
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

  public async getPatientByEmail(email: string): Promise<PatientDto> {
    try {
      return await this.patientRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addPatient(newPatient: PatientDto) {
    try {
      return await this.patientRepository.save(newPatient);
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
