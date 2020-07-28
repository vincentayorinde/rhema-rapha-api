import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  id: string;
  description: string;

  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  date: Date;

  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Time is not provided' })
  appointmentTime: Date;

  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  type: string;

  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  appointmentDay: Date;

  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  doctorId: string;

  @IsNotEmpty({ message: 'Patient Id is not provided' })
  patientId: string;
}
