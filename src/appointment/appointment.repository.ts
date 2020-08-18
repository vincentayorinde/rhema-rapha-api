import { EntityRepository, Repository, getRepository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

@EntityRepository(AppointmentEntity)
export class AppointmentRepository extends Repository<AppointmentEntity> {
  /**
   * Gets all due appointments
   */
  //   public async getDueAppointments() {
  //     const dateToday = new Date();
  //     const appointment = await getRepository(AppointmentEntity)
  //       .createQueryBuilder('appointment')
  //       .where('appointment.date = :currentDate', { currentDate: dateToday })
  //       .getMany();
  //     console.log('Appointment', appointment);
  //   }
}
