import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGuard } from '../auth/guards/role';
import { Category } from '../category/entity';
import { Tag } from '../tag/entity';
import { TagService } from '../tag/service';
import { User } from '../user/entity';
import { PostController } from './controller';
import { Post } from './entity';
import { PostService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, Category, User])],
  controllers: [PostController],
  providers: [
    Logger,
    PostService,
    TagService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [PostService],
})
export class PostModule {}
