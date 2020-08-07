import { UserBaseEntity } from '../shared/user-base.entity';
import { Column, OneToOne, Entity, ManyToOne, JoinColumn } from 'typeorm';
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
    department => department.doctor,
    { cascade: true, eager: true },
  )
  @JoinColumn({ name: 'department' })
  department: DepartmentEntity;

  @OneToOne(
    () => AppointmentEntity,
    appointment => appointment.doctor,
    { cascade: true, eager: true },
  )
  @JoinColumn({ name: 'appointment' })
  appointment: AppointmentEntity;

  departmentId: string;
}
