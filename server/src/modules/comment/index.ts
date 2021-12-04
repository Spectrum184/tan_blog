import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entity';
import { User } from '../user/entity';
import { CommentController } from './controller';
import { Comment } from './entity';
import { CommentService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Post])],
  controllers: [CommentController],
  providers: [Logger, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
