import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Matches } from 'class-validator';
import { Role } from './entity';
import { RoleEnum } from './enum';

export class RoleDto {
  constructor(role: Role) {
    this.name = role.name;
    this.createdBy = role.createdBy;
    this.id = role.id;
  }

  @ApiProperty({ description: 'This is role name', default: 'ADMIM' })
  @Type(() => String)
  @Matches(
    `^${Object.values(RoleEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
  )
  readonly name: string;

  readonly createdBy: string;

  readonly id: string;
}
