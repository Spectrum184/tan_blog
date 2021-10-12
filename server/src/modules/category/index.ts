import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controller';
import { Category } from './entity';
import { CategoryService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [Logger, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
