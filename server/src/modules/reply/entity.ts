import BaseEntity from 'src/common/base-entity';

import { Column, Entity, ManyToOne } from 'typeorm';
import { Comment } from '../comment/entity';
import { User } from '../user/entity';
import { IReply } from './interface';

@Entity()
export class Reply extends BaseEntity implements IReply {
  @Column({ type: 'varchar', length: '1000' })
  content: string;

  @ManyToOne(() => User, (user) => user.replies)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;
}
