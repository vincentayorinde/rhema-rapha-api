import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  public readonly id: string;
  public readonly description: string;

  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  public readonly date: Date;

  @IsNotEmpty({ message: 'Time is not provided' })
  @IsString()
  public readonly appointmentTime: string;

  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  public readonly type: string;

  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  public readonly appointmentDay: string;

  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  public readonly doctorId: string;

  @IsNotEmpty({ message: 'Patient Id is not provided' })
  public patientId: string;
  isCanceled = false;
}

export class AppointmentPatientDto {
  public readonly id: string;
  public readonly description: string;

  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  public readonly date: Date;

  @IsNotEmpty({ message: 'Time is not provided' })
  @IsString()
  public readonly appointmentTime: string;

  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  public readonly type: string;

  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  public readonly appointmentDay: string;

  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  public readonly doctorId: string;

  public patientId: string;

  isCanceled = false;
}
