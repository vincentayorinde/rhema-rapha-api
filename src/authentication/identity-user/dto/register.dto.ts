import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  public readonly fullName: string;

  @IsNotEmpty({ message: 'Phone number cannot be null' })
  public readonly phonenumber: string;

  @IsNotEmpty({ message: 'Username cannot be null' })
  public readonly username: string;

  @Length(8)
  @IsNotEmpty({ message: 'Password cannot be null' })
  public readonly password: string;

  public readonly avatar: string;

  @IsNotEmpty({ message: 'Role cannot be null' })
  public readonly role: string;

  public readonly dateOfBirth: Date;

  public readonly address: string;

  public readonly bloodType: string;

  public readonly height: string;

  public readonly bloodPressure: string;

  public readonly departmentId: string;

  public readonly daysAvailable: string;

  public readonly timesAvailable: string;
}
