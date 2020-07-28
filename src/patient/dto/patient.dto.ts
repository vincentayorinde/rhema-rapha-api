import { IsNotEmpty, IsEmail, IsDateString, IsString } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';

export class PatientDto {
  id: string;

  @IsNotEmpty({ message: 'DateofBirth must be provided' })
  dateofBirth: Date;

  address: string;

  bloodType: string;

  height: string;

  bloodPressure: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email must be provided' })
  email: string;

  @IsNotEmpty({ message: 'User name must be provided' })
  username: string;

  @IsNotEmpty({ message: 'User name must be provided' })
  fullName: string;

  @IsNotEmpty({ message: 'Phone number must be provided' })
  phonenumber: string;

  @IsNotEmpty({ message: 'Password must be provided' })
  password: string;

  role: UserRole;
  avatar: string;
}
