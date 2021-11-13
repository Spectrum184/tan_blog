export interface IResultPagination<T> {
  data: T[];
  total: number;
  page: number;
  totalPage: number;
}
