import { IReplyContent } from '../comment/dto';
import { Reply } from './entity';

export class ReplyDto {
  constructor(reply: Reply, commentId: string) {
    this.commentId = commentId;
    this.reply = {
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt.toLocaleDateString(),
      user: {
        id: reply.user.id,
        username: reply.user.username,
        name: reply.user.name,
        avatar: reply.user.avatar,
      },
    };
  }

  commentId: string;
  reply: IReplyContent;
}
