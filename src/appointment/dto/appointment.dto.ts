import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  readonly id: string;
  readonly description: string;

  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  readonly date: Date;

  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Time is not provided' })
  readonly appointmentTime: Date;

  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  readonly type: string;

  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  readonly appointmentDay: Date;

  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  readonly doctorId: string;

  @IsNotEmpty({ message: 'Patient Id is not provided' })
  readonly patientId: string;
}
