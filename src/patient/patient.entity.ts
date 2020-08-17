import { UserBaseEntity } from '../shared/user-base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity({ name: 'PatientTbl' })
export class PatientEntity extends UserBaseEntity {
  @Column({ type: Date, nullable: false })
  dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true, length: '100' })
  address: string;

  @Column({ type: 'varchar', nullable: true, length: '20' })
  bloodType: string;

  @Column({ type: 'varchar', nullable: true, length: '20' })
  height: string;

  @Column({ type: 'varchar', nullable: true, length: '20' })
  bloodPressure: string;

  @OneToMany(
    () => AppointmentEntity,
    appointment => appointment.patient,
  )
  appointment: AppointmentEntity[];

  // @OneToMany(
  //   () => MedicationEntity,
  //   medication => medication.patient,
  //   { cascade: true, eager: true },
  // )
  // @JoinColumn({ name: 'medicationId' })
  // medication: MedicationEntity;
}
