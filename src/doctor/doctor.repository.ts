import { EntityRepository, Repository } from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@EntityRepository(DoctorEntity)
export class DoctorRepository extends Repository<DoctorEntity> {}
