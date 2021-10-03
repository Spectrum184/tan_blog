import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from './interface';

export class UserDto implements IUser {
  @ApiProperty({ default: 'This is username!' })
  @IsNotEmpty({ message: 'Username is not empty!' })
  @Type(() => String)
  @IsString()
  readonly username: string;

  @ApiProperty({ default: 'This is email!' })
  @IsNotEmpty({ message: 'Email is not empty!' })
  @IsEmail({}, { message: 'Email is not valid' })
  @Type(() => String)
  @IsString()
  readonly email: string;

  @ApiProperty({ default: 'This is avatar!' })
  @IsString()
  @Type(() => String)
  readonly avatar: string;

  @ApiProperty({ default: 'This is full name!' })
  @Type(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Name is not empty!' })
  readonly name: string;

  @ApiProperty({ default: 'This is full name!' })
  @Type(() => String)
  @IsString()
  readonly about: string;

  @ApiProperty({ default: 'This is created time' })
  @Type(() => String)
  @IsString()
  readonly createdAt: string;
}
