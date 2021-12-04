import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ description: 'Item per page', default: 9 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(9)
  limit?: number | 9;

  @ApiProperty({ description: 'Page want to get item', default: 1 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Sort data or not', default: 'time' })
  @IsOptional()
  @Type(() => String)
  sort?: 'time' | 'view';

  @ApiProperty({
    description: 'Param want to search',
    default: '',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  content?: string;

  @ApiProperty({
    description: 'Param want to search',
    default: 'DESC',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  order?: 'ASC' | 'DESC';
}
