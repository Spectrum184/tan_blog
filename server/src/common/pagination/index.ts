import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ description: 'Item per page', default: 9 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  perPage: number;

  @ApiProperty({ description: 'Page want to get item', default: 0 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  page: number;
}
