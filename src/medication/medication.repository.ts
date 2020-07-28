import { Repository, EntityRepository } from 'typeorm';
import { MedicationEntity } from './medication.entity';

@EntityRepository(MedicationEntity)
export class MedicationRepository extends Repository<MedicationEntity> {}
