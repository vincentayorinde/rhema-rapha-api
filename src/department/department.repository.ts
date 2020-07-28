import { EntityRepository, Repository } from 'typeorm';
import { DepartmentEntity } from './department.entity';

@EntityRepository(DepartmentEntity)
export class DepartmentRepository extends Repository<DepartmentEntity> {}
