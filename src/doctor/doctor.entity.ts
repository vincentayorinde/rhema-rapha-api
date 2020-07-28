import { UserBaseEntity } from '../shared/user-base.entity';
import { Column, OneToOne, Entity, ManyToOne } from 'typeorm';
import { DepartmentEntity } from '../department/department.entity';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity({ name: 'DoctorTbl' })
export class DoctorEntity extends UserBaseEntity {
  @Column({ type: 'varchar', nullable: true, length: '100' })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  daysAvailable: string;

  @Column({ type: 'varchar', nullable: false })
  timesAvailable: string;

  @ManyToOne(
    () => DepartmentEntity,
    user => user.doctor,
  )
  department: DepartmentEntity;

  @OneToOne(
    () => AppointmentEntity,
    user => user.doctor,
    { cascade: true, eager: true },
  )
  appointment: AppointmentEntity;
}
