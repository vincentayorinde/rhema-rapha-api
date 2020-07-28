import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';
import { Timestamp } from 'typeorm';

export class DoctorDto {
  public id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @IsNotEmpty({ message: 'Firstname cannot be null' })
  public fullName: string;

  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  public phonenumber: string;

  @IsNotEmpty({ message: 'Department cannot be null' })
  public departmentId: string;

  @IsNotEmpty({ message: 'Days Available cannot be null' })
  daysAvailable: string;

  @IsNotEmpty({ message: 'Days Available cannot be null' })
  timesAvailable: string;

  address: string;

  @IsNotEmpty({ message: 'Password cannot be null' })
  password: string;

  role: UserRole;

  avatar: string;
}
