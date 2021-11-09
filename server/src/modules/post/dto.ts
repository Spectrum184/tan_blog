import { Post } from './entity';
import { IPost } from './interface';

interface ICategoryPost {
  name: string;
  slug: string;
}

export class PostDto implements IPost {
  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.slug = post.slug;
    this.content = post.content;
    this.thumbnail = post.thumbnail;
    this.status = post.status;
    this.createdBy = post.createdBy;
    this.createdAt = post.createdAt.toUTCString();
    this.tags = post.tags?.map((tag) => tag.name);
    this.category = { name: post.category?.name, slug: post.category?.slug };
    this.views = post.views;
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
  views: number;
}
