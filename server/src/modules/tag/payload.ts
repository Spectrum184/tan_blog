import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TagPayload {
  @ApiProperty({ description: 'Tag name', default: '#nodejs' })
  @Type(() => String)
  readonly name: string;
}
