import { Column, Entity, Timestamp, OneToMany, ManyToOne } from 'typeorm';
import { SharedBaseEntity } from '../shared/shared-base.entity';
import { PatientEntity } from '../patient/patient.entity';

@Entity({ name: 'MedicationTbl' })
export class MedicationEntity extends SharedBaseEntity {
  @Column({ type: 'varchar', nullable: false })
  medicineName: string;

  @Column({ type: Date, nullable: false })
  dose0ne: Date;

  @Column({ type: Date, nullable: true })
  doseTwo: Date;

  @Column({ type: Date, nullable: true })
  doseThree: Date;

  @Column({ type: Date, nullable: true })
  doseFour: Date;

  @Column({ type: 'varchar', nullable: true })
  note: string;

  @Column({ type: Date, nullable: true })
  startDate: Date;

  @Column({ type: Date, nullable: true })
  endDate: Date;

  // @ManyToOne(
  //   () => PatientEntity,
  //   patient => patient.medication,
  // )
  // patient: PatientEntity;
}
