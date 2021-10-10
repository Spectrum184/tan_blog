import BaseEntity from 'src/common/base-entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Post } from '../post/entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
