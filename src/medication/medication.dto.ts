import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class MedicationDto {
  id: string;

  @IsNotEmpty({ message: 'Medicine name cannot be null' })
  medicineName: string;

  @IsNotEmpty({ message: 'Dose cannot be null' })
  @IsNumber()
  dose: number;

  @IsNotEmpty({ message: 'Note cannot be null' })
  note: string;

  @IsNotEmpty({ message: 'Dose 0ne cannot be null' })
  dose0ne: Date;

  @IsDateString()
  doseTwo: Date;

  @IsDateString()
  doseThree: Date;

  @IsDateString()
  doseFour: Date;

  startDate: Date;

  endDate: Date;

  patientId: string;
}
