import { IPost } from './interface';

export class PostDto implements IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  status: boolean;
}
