import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entity';
import { TagController } from './controller';
import { Tag } from './entity';
import { TagService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Post])],
  controllers: [TagController],
  providers: [TagService, Logger],
  exports: [TagService],
})
export class TagModule {}
