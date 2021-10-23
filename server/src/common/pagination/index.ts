import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ description: 'Item per page', default: 9 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(9)
  perPage?: number | 9;

  @ApiProperty({ description: 'Page want to get item', default: 0 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Sort data or not', default: 'ASC' })
  @Type(() => String)
  sort?: 'ASC' | 'DESC';

  @ApiProperty({ description: 'Param want to search', default: '' })
  @IsOptional()
  @Type(() => String)
  param: string;
}
