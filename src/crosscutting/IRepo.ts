import { Entity } from './Entity';

export type filterRepoParam = [key: string, value: number | string | boolean]

export interface IRepo<T extends Entity> {
  insert(item: T): Promise<T>
  update(item: T): Promise<T | null>
  delete(item: T): Promise<boolean>
  findById(id: any): Promise<T | null>
  find(filter: filterRepoParam[], skip: number, limit: number): Promise<T[]>
}
