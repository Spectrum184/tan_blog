import { Post } from '../post/entity';
import { Category } from './entity';
import { ICategory } from './interface';

export class CategoryDto implements ICategory {
  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.slug = category.slug;
    this.thumbnail = category.thumbnail;
    this.createdAt = category.createdAt.toUTCString();
    this.posts = category.posts;
  }

  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly thumbnail: string;
  readonly createdAt: string;
  readonly posts?: Post[];
}
