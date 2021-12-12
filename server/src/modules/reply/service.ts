import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { Comment } from '../comment/entity';
import { User } from '../user/entity';
import { ReplyDto } from './dto';
import { Reply } from './entity';
import { ReplyPayload } from './payload';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createReply({ commentId, content }: ReplyPayload, userId: string) {
    try {
      const user = await this.userRepository.findOne(userId);
      const comment = await this.commentRepository.findOne(commentId);

      if (!user || !comment)
        throw new NotFoundError('Không tìm thấy bình luận hoặc người trả lời!');

      const newReply = new Reply();

      newReply.content = content;
      newReply.user = user;
      newReply.comment = comment;

      await this.replyRepository.save(newReply);

      return new ReplyDto(newReply, comment.id);
    } catch (error) {
      throw error;
    }
  }
}
