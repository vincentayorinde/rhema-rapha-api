import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { UserRole } from 'src/shared/user-base.entity';

export class RegisterDto {
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

  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  public avatar: string;
  public role: string;
}
