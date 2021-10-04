import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @Type(() => String)
  @IsNotEmpty({ message: 'Username or Email is not null!' })
  readonly user: string;

  @ApiProperty()
  @Type(() => String)
  @IsNotEmpty({ message: 'Password is not null!' })
  readonly password: string;
}

export class RegisterDto {
  @ApiProperty({ description: 'This is username!', default: 'abc' })
  @IsNotEmpty({ message: 'Username is not empty!' })
  @MaxLength(50, { message: 'Username is too long!' })
  @Type(() => String)
  readonly username: string;

  @ApiProperty({ description: 'This is email!' })
  @IsNotEmpty({ message: 'Email is not empty!' })
  @IsEmail({}, { message: 'Email is not valid' })
  @MaxLength(200, { message: 'Email is too long!' })
  @Type(() => String)
  readonly email: string;

  @ApiProperty({ description: 'This is full name!', default: 'Thanh' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Name is not empty!' })
  readonly name: string;

  @ApiProperty({ description: 'This is about!', default: 'Thanh Pro' })
  @Type(() => String)
  @MaxLength(500, { message: 'About is too long !' })
  readonly about: string;

  @ApiProperty({ description: 'This is password!', default: 'avvac' })
  @Type(() => String)
  @MinLength(4, { message: 'Password is too short!' })
  @MaxLength(100, { message: 'Password is too long !' })
  readonly password: string;
}
