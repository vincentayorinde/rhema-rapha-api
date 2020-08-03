import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';
import { SharedBaseEntity } from '../shared/shared-base.entity';
import { DoctorEntity } from '../doctor/doctor.entity';

@Entity({ name: 'DepartmentTbl' })
export class DepartmentEntity extends SharedBaseEntity {
  @Column({ type: 'varchar', nullable: false, length: '100' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(
    () => DoctorEntity,
    doctor => doctor.department,
    { cascade: true, eager: true },
  )
  doctor: DoctorEntity[];
}
