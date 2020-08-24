import { UserRole } from '../../../shared/user-base.entity';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class IdentityUserDto {
  public id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  public fullName: string;

  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  public phonenumber: string;

  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  public avatar: string;
  public role: UserRole;
}
