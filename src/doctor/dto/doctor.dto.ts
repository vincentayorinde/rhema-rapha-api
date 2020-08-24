import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';

export class DoctorDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  public fullName: string;

  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  public phonenumber: string;

  @IsNotEmpty({ message: 'Department cannot be null' })
  public departmentId: string;

  @IsNotEmpty({ message: 'Days Available cannot be null' })
  public daysAvailable: string;

  @IsNotEmpty({ message: 'Days Available cannot be null' })
  public timesAvailable: string;

  public address: string;

  @IsNotEmpty({ message: 'Password cannot be null' })
  public password: string;

  public role: UserRole;

  public avatar: string;
}
