import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface IAcountDto {
  username: string;
  email: string;
  avatar: string;
  name: string;
  about: string;
  roles: string[];
  createdAt: string;
}

class AccountCreationDto {
  @ApiProperty({ description: 'This is password', default: 'thanhdepzai' })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;
}

class AccountUpdateDto {
  @ApiProperty({ description: 'This is password' })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Update status of account' })
  @Type(() => Boolean)
  @IsBoolean()
  isActivated: boolean;

  @ApiProperty({ description: 'Update status of logging attempt' })
  @Type(() => Number)
  @IsNumber()
  loginAttempt: number;
}

export { AccountCreationDto, AccountUpdateDto };
