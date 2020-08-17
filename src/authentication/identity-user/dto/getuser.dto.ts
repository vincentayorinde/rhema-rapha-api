import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { UserRole } from 'src/shared/user-base.entity';

export class GetUserDto {
  public readonly id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  public readonly fullName: string;

  @IsNotEmpty({ message: 'Phone number cannot be null' })
  public readonly phonenumber: string;

  public readonly avatar: string;
  public readonly role: UserRole = UserRole.ADMIN;
}
