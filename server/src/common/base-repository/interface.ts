export interface IRepository<T> {
  findAll(item: T): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  findOne(id: string): Promise<T>;
}
