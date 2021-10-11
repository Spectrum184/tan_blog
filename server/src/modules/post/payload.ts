import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PostPayload {
  @ApiProperty({
    description: 'This is post title',
    default: 'ok baby',
  })
  @Type(() => String)
  @IsNotEmpty({ message: 'Title is not null' })
  title: string;

  @ApiProperty({ description: 'This is post title', default: 'ok baby' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Content is not null' })
  content: string;

  @ApiProperty({ description: 'This is post status', default: true })
  @Type(() => Boolean)
  status: boolean;

  @ApiProperty({ description: 'This is post title', default: 'ok baby' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Content is not null' })
  categoryName: string;

  @ApiProperty({ description: 'This is post title', default: 'ok baby' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Content is not null' })
  tag: string;
}
