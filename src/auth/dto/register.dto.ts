import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'fullName Cant be Empty' })
  fullName: string;

  @IsNotEmpty({ message: 'Email Cant be Empty' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsNotEmpty({ message: 'Password Cant be Empty' })
  password: string;
}
