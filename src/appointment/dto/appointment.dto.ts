import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  readonly id: string;
  readonly description: string;

  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  readonly date: Date;

  @IsNotEmpty({ message: 'Time is not provided' })
  @IsString()
  readonly appointmentTime: string;

  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  readonly type: string;

  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  readonly appointmentDay: string;

  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  readonly doctorId: string;

  @IsNotEmpty({ message: 'Patient Id is not provided' })
  readonly patientId: string;
}
