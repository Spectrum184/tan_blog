import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginPayload {
  @ApiProperty({ description: 'This is username or email!', default: 'abc' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Username or Email is not null!' })
  param: string;

  @ApiProperty({ description: 'This is password!', default: 'abc' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Password is not null!' })
  password: string;
}

export class RegisterPayload {
  @ApiProperty({ description: 'This is username!', default: 'abc' })
  @IsNotEmpty({ message: 'Username is not empty!' })
  @MaxLength(50, { message: 'Username is too long!' })
  @Type(() => String)
  username: string;

  @ApiProperty({ description: 'This is email!' })
  @IsNotEmpty({ message: 'Email is not empty!' })
  @IsEmail({}, { message: 'Email is not valid' })
  @MaxLength(200, { message: 'Email is too long!' })
  @Type(() => String)
  email: string;

  @ApiProperty({ description: 'This is full name!', default: 'Thanh' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Name is not empty!' })
  name: string;

  @ApiProperty({ description: 'This is about!', default: 'Thanh Pro' })
  @Type(() => String)
  @MaxLength(500, { message: 'About is too long !' })
  about: string;

  @ApiProperty({ description: 'This is password!', default: 'avvac' })
  @Type(() => String)
  @MinLength(4, { message: 'Password is too short!' })
  @MaxLength(100, { message: 'Password is too long !' })
  password: string;
}
