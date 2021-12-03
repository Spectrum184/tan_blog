import BaseEntity from 'src/common/base-entity';

import { Column, Entity } from 'typeorm';
import { IComment } from './interface';

@Entity()
export class Comment extends BaseEntity implements IComment {
  @Column({ type: 'varchar', length: '1000' })
  content: string;
}
