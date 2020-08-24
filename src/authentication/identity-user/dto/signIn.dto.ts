import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { UserRole } from '../../../shared/user-base.entity';

export class SignInDto {
  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: UserRole;
}
