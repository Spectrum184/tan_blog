import { Reply } from '../reply/entity';
import { User } from '../user/entity';
import { Comment } from './entity';

interface IUser {
  id: string;
  username: string;
  avatar: string;
  name: string;
}

interface IReply {
  id: string;
  content: string;
  user: IUser;
}

export class CommentDto {
  constructor(comment: Comment) {
    this.content = comment.content;
    this.id = comment.id;
    this.user = {
      id: comment.user.id,
      username: comment.user.name,
      avatar: comment.user.avatar,
      name: comment.user.name,
    };
    this.replies = comment.replies
      ? comment.replies.map((reply) => {
          return {
            id: reply.id,
            content: reply.content,
            user: {
              id: reply.user.id,
              username: reply.user.username,
              avatar: reply.user.avatar,
              name: reply.user.name,
            },
          };
        })
      : undefined;
  }

  content: string;
  id: string;
  user: IUser;
  replies?: IReply[];
}
