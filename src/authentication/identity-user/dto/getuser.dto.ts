import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { UserRole } from 'src/shared/user-base.entity';

export class GetUserDto {
  id: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Firstname cannot be null' })
  fullName: string;

  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  phonenumber: string;

  @IsNotEmpty({ message: 'username cannot be null' })
  username: string;

  public avatar: string;
  public role: UserRole = UserRole.ADMIN;
}
