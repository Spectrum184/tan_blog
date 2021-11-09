import BaseEntity from 'src/common/base-entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Category } from '../category/entity';
import { Tag } from '../tag/entity';
import { User } from '../user/entity';
import { IPost } from './interface';

@Entity('posts')
export class Post extends BaseEntity implements IPost {
  @Column({ type: 'varchar', length: 800, nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 800, nullable: false, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({
    type: 'varchar',
    length: 800,
    default: 'thumbnail.jpg',
    nullable: true,
  })
  thumbnail: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({ name: 'post_tags' })
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.likedPosts)
  likedUsers: User[];
}
