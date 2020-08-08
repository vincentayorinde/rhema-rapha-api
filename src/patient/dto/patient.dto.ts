import { IsNotEmpty, IsEmail, IsDateString, IsString } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';

export class PatientDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'DateofBirth must be provided' })
  public readonly dateofBirth: Date;

  public readonly address: string;

  public readonly bloodType: string;

  public readonly height: string;

  public readonly bloodPressure: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email must be provided' })
  public readonly email: string;

  @IsNotEmpty({ message: 'User name must be provided' })
  public readonly username: string;

  @IsNotEmpty({ message: 'User name must be provided' })
  public readonly fullName: string;

  @IsNotEmpty({ message: 'Phone number must be provided' })
  public readonly phonenumber: string;

  @IsNotEmpty({ message: 'Password must be provided' })
  public readonly password: string;

  public readonly role: UserRole;
  public readonly avatar: string;
}
