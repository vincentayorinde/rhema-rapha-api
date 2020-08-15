import { IsNotEmpty, IsEmail, IsDateString, IsString } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';

export class PatientDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Date of Birth must be provided' })
  public dateOfBirth: Date;

  public address: string;

  public bloodType: string;

  public height: string;

  public bloodPressure: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email must be provided' })
  public email: string;

  @IsNotEmpty({ message: 'User name must be provided' })
  public fullName: string;

  @IsNotEmpty({ message: 'Phone number must be provided' })
  public phonenumber: string;

  @IsNotEmpty({ message: 'Password must be provided' })
  public password: string;

  public role: UserRole;
  public avatar: string;
}
