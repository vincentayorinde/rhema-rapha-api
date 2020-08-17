import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  public fullName: string;

  @IsNotEmpty({ message: 'Phone number cannot be null' })
  public phonenumber: string;

  @Length(8)
  @IsNotEmpty({ message: 'Password cannot be null' })
  public password: string;

  public avatar: string;

  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: string;

  public dateOfBirth: Date;

  public address: string;

  public bloodType: string;

  public height: string;

  public bloodPressure: string;

  public departmentId: string;

  public daysAvailable: string;

  public timesAvailable: string;
}
