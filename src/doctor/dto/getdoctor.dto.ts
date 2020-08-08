import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';

export class GetDoctorDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  public readonly fullName: string;

  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  public readonly phonenumber: string;

  @IsNotEmpty({ message: 'Department cannot be null' })
  public readonly departmentId: string;

  @IsNotEmpty({ message: 'Days Available cannot be null' })
  public readonly daysAvailable: string;

  @IsNotEmpty({ message: 'Days Available cannot be null' })
  public readonly timesAvailable: string;

  public readonly address: string;

  public readonly role: UserRole;

  public readonly avatar: string;
}
