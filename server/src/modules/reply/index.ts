import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/entity';
import { User } from '../user/entity';
import { ReplyController } from './controller';
import { Reply } from './entity';
import { ReplyService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Reply])],
  providers: [ReplyService, Logger],
  controllers: [ReplyController],
  exports: [ReplyService],
})
export class ReplyModule {}
