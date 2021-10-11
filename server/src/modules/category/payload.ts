import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CategoryPayload {
  @ApiProperty({ description: 'This is name of category!', default: 'abc' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Name of category is not null' })
  name: string;

  @ApiProperty({ description: 'This is description!', default: 'abc' })
  @Type(() => String)
  description: string;

  @ApiProperty({ description: 'This is link thumbnail!', default: 'abc.jpg' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Thumbnail is not null' })
  thumbnail: string;
}
