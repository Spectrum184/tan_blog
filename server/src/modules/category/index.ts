import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entity';
import { CategoryController } from './controller';
import { Category } from './entity';
import { CategoryService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Post])],
  controllers: [CategoryController],
  providers: [Logger, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
