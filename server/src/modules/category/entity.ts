import BaseEntity from 'src/common/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from '../post/entity';
import { ICategory } from './interface';

@Entity('categories')
export class Category extends BaseEntity implements ICategory {
  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  slug: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    default: 'No description!',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    default: 'category.jpg',
  })
  thumbnail: string;

  @OneToMany(() => Post, (post) => post.category, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
  })
  posts: Post[];
}
