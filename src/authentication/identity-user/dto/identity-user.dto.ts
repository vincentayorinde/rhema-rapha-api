import { UserRole } from '../../../shared/user-base.entity';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class IdentityUserDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty({ message: 'Firstname cannot be null' })
  public readonly fullName: string;

  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  public readonly phonenumber: string;

  @IsNotEmpty({ message: 'username cannot be null' })
  public readonly username: string;

  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public readonly password: string;

  public readonly avatar: string;
  public readonly role: UserRole = UserRole.ADMIN;
}
