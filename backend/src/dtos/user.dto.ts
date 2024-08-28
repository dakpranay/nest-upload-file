import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
