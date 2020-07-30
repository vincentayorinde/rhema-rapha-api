import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  fullName: string;

  @IsNotEmpty({ message: 'Phone number cannot be null' })
  phonenumber: string;

  @IsNotEmpty({ message: 'Username cannot be null' })
  username: string;

  @Length(8)
  @IsNotEmpty({ message: 'Password cannot be null' })
  public password: string;

  public avatar: string;

  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: string;

  dateOfBirth: Date;

  address: string;

  bloodType: string;

  height: string;

  bloodPressure: string;

  public departmentId: string;

  daysAvailable: string;

  timesAvailable: string;
}
