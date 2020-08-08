import { DoctorEntity } from './../doctor/doctor.entity';
import { PatientEntity } from './../patient/patient.entity';
import { SharedBaseEntity } from '../shared/shared-base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'AppointmentTbl' })
export class AppointmentEntity extends SharedBaseEntity {
  @Column({ type: 'varchar', nullable: true, length: '200' })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  date: Date;

  @Column({ type: 'time', nullable: false })
  appointmentTime: Date;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  type: string;

  @OneToOne(
    () => DoctorEntity,
    doctor => doctor.appointment,
  )
  doctor: DoctorEntity;

  @OneToOne(
    () => PatientEntity,
    patient => patient.appointment,
  )
  patient: PatientEntity;
}
