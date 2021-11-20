import { IPost } from "./post";

export interface IPagination {
  prefix: string;
  limit?: number;
  page: number;
  sort?: "time" | "view";
  content?: string;
  order?: "ASC" | "DESC";
  slug?: string | string[];
}

export interface IListPostPagination {
  data: IPost[];
  total: number;
  page: number;
  totalPage: number;
}
