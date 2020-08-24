import { DoctorEntity } from './../doctor/doctor.entity';
import { PatientEntity } from './../patient/patient.entity';
import { SharedBaseEntity } from '../shared/shared-base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

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

  @Column({ type: 'bool', default: false })
  isCanceled: boolean;

  @ManyToOne(
    () => DoctorEntity,
    doctor => doctor.appointment,
    { eager: true },
  )
  @JoinColumn({ name: 'doctorId' })
  doctor: DoctorEntity;

  @ManyToOne(
    () => PatientEntity,
    patient => patient.appointment,
    { eager: true },
  )
  @JoinColumn({ name: 'patientId' })
  patient: PatientEntity;

  @Column()
  doctorId: string;

  @Column()
  patientId: string;
}
