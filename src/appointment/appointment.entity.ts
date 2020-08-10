import { DoctorEntity } from './../doctor/doctor.entity';
import { PatientEntity } from './../patient/patient.entity';
import { SharedBaseEntity } from '../shared/shared-base.entity';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'AppointmentTbl' })
export class AppointmentEntity extends SharedBaseEntity {
  @Column({ type: 'varchar', nullable: true, length: '200' })
  description: string;

  @Column({ type: Date, nullable: false })
  date: Date;

  @Column({ type: 'varchar', nullable: false })
  appointmentTime: string;

  @Column({ type: 'varchar', nullable: false })
  appointmentDay: string;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  type: string;

  @ManyToOne(
    () => DoctorEntity,
    doctor => doctor.appointment,
  )
  doctor: DoctorEntity;

  @ManyToOne(
    () => PatientEntity,
    patient => patient.appointment,
  )
  patient: PatientEntity;
}
