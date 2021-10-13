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
  readonly title: string;

  @ApiProperty({ description: 'This is post title', default: 'ok baby' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Content is not null' })
  readonly content: string;

  @ApiProperty({
    description: 'This is post thumbnail',
    default: 'thumbnail.jpg',
  })
  @Type(() => String)
  readonly thumbnail: string;

  @ApiProperty({ description: 'This is post status', default: true })
  @Type(() => Boolean)
  readonly status: boolean;

  @ApiProperty({ description: 'This is post title', default: 'ok baby' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Content is not null' })
  readonly categoryId: string;

  @ApiProperty({ description: 'This is post title', default: 'ok baby' })
  @Type(() => String)
  @IsNotEmpty({ message: 'Content is not null' })
  readonly tag: string;
}
