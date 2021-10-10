import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Matches } from 'class-validator';
import { RoleEnum } from './enum';

export class RolePayload {
  @ApiProperty({ description: 'This is role name', default: 'ADMIM' })
  @Type(() => String)
  @Matches(
    `^${Object.values(RoleEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
  )
  readonly name: string;
}
