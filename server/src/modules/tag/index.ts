import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entity';
import { TagService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
