import { Category } from '../category/entity';
import { Tag } from '../tag/entity';
import { Post } from './entity';
import { IPost } from './interface';

interface ICategoryPost {
  name: string;
  slug: string;
}

export class PostDto implements IPost {
  constructor(post: Post, category?: Category, tags?: Tag[]) {
    this.id = post.id;
    this.title = post.title;
    this.slug = post.slug;
    this.content = post.content;
    this.thumbnail = post.thumbnail;
    this.status = post.status;
    this.createdBy = post.createdBy;
    this.createdAt = post.createdAt.toUTCString();
    this.tags = tags
      ? tags.map((tag) => tag.name)
      : post.tags.map((tag) => tag.name);
    this.category = category
      ? { name: category.name, slug: category.slug }
      : { name: post.category.name, slug: post.category.slug };
  }

  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  status: boolean;
  createdBy: string;
  createdAt: string;
  tags: string[];
  category: ICategoryPost;
}
