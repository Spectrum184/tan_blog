import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReplyPayload {
  @ApiProperty({ description: 'Comment', default: 'Ok baby' })
  @IsNotEmpty({ message: 'Content is not null' })
  @Type(() => String)
  readonly content: string;

  @ApiProperty({ description: 'id of comment', default: 'OK' })
  @IsUUID('4')
  @IsNotEmpty({ message: 'Post id is not null' })
  readonly commentId: string;
}
