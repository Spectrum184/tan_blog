import { Post } from '../post/entity';
import { ICategory } from './interface';

export class CategoryDto implements ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  posts?: Post[];
}
