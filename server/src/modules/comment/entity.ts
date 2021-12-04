import BaseEntity from 'src/common/base-entity';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Post } from '../post/entity';
import { Reply } from '../reply/entity';
import { User } from '../user/entity';
import { IComment } from './interface';

@Entity()
export class Comment extends BaseEntity implements IComment {
  @Column({ type: 'varchar', length: '1000' })
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToMany(() => Reply, (reply) => reply.comment, { onDelete: 'CASCADE' })
  replies: Reply[];
}
