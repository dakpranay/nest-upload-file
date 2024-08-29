import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  // @IsEmail() is nor working for "1@gmail.com,dakprnay@gmail.com"
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phoneNumber: string;
}
