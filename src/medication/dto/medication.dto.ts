import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class MedicationDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Medicine name cannot be null' })
  public readonly medicineName: string;

  @IsNotEmpty({ message: 'Dose cannot be null' })
  @IsNumber()
  public readonly dose: number;

  @IsNotEmpty({ message: 'Note cannot be null' })
  public readonly note: string;

  @IsNotEmpty({ message: 'Dose 0ne cannot be null' })
  public readonly dose0ne: Date;

  @IsDateString()
  public readonly doseTwo: Date;

  @IsDateString()
  public readonly doseThree: Date;

  @IsDateString()
  public readonly doseFour: Date;

  public readonly startDate: Date;

  public readonly endDate: Date;

  public readonly patientId: string;
}
