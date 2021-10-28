export interface IResultPagination<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}