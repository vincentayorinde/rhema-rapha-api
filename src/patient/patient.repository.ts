import { EntityRepository, Repository } from 'typeorm';
import { PatientEntity } from './patient.entity';

@EntityRepository(PatientEntity)
export class PatientRepository extends Repository<PatientEntity> {}
