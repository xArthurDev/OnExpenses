import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, type: String, example: 'email@email.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'password' })
  password: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'name' })
  name: string;
}

export class SignInCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, type: String, example: 'email@email.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'password' })
  password: string;
}

export interface ISignUpResponse {
  status: string;
  accessToken: string;
  expiresIn: string;
  user: Partial<User>;
}

export interface ISignOutResponse {
  status: string;
  message: string;
}
