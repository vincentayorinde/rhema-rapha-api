import { EntityRepository, Repository, getConnection } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

@EntityRepository(AppointmentEntity)
export class AppointmentRepository extends Repository<AppointmentEntity> {
  /**
   * Gets all due appointments
   */
  public async getDueAppointments() {
    const appointment = getConnection()
      .createQueryBuilder()
      .where();
  }
}
