import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationRepository } from './medication.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { MedicationDto } from './dto/medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationRepository)
    private readonly medicationRepository: MedicationRepository,
  ) {}

  public async getMedications(query: QueryModel) {
    try {
      return await this.medicationRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getMedicationsByUserId(userId: string) {
    try {
      return await this.medicationRepository.find({ where: userId });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getMedication(id: string) {
    try {
      return await this.medicationRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addMedication(newMedication: MedicationDto) {
    try {
      return await this.medicationRepository.save(newMedication);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateMedication(id: string, newMedication: MedicationDto) {
    try {
      const dbMedication = this.getMedication(id);
      if (dbMedication) {
        return await this.medicationRepository.update(id, newMedication);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteMedication(id: string) {
    try {
      return await this.medicationRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
