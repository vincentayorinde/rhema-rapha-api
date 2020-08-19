import { EntityRepository, Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

@EntityRepository(AppointmentEntity)
export class AppointmentRepository extends Repository<AppointmentEntity> {}
