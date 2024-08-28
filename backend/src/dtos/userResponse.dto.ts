import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class UserResponseDto {
  @IsString()
  id: number;

  @IsString()
  file: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
