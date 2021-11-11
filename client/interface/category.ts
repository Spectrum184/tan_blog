export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  posts?: number;
}

export interface ICategoryPost {
  name: string;
  slug: string;
}
