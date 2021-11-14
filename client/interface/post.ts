import { ICategoryPost } from "./category";
import { IAuthor } from "./user";

export interface IPost {
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
  author: IAuthor;
}

export interface IPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  status: boolean;
  categoryId: string;
  tag: string;
}
