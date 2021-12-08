import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Item per page', default: 9 })
  @Type(() => Number)
  @IsNumber()
  @Min(9)
  limit?: number | 9;

  @ApiProperty({ description: 'Page want to get item', default: 1 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiPropertyOptional({ description: 'Sort data or not', default: 'time' })
  @Type(() => String)
  sort?: 'time' | 'view';

  @ApiPropertyOptional({
    description: 'Param want to search',
    default: '',
    required: false,
  })
  @Type(() => String)
  content?: string;

  @ApiPropertyOptional({
    description: 'Param want to search',
    default: 'DESC',
    required: false,
  })
  @Type(() => String)
  order?: 'ASC' | 'DESC';
}
