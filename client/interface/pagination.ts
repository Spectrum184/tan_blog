import { IPost } from "./post";

export interface IPagination {
  prefix: string;
  limit?: number;
  page: number;
  sort?: "time" | "view";
  content?: string;
  order?: "ASC" | "DESC";
}

export interface IListPostPagination {
  data: IPost[];
  total: number;
  page: number;
  lastPage: number;
}
