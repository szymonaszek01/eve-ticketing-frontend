import { Observable } from 'rxjs';
import { Page } from '../models/Page';

export abstract class BaseService<T, U> {

  protected toCamelCase(entity: any): T {
    const newEntity: any = {};
    for (const key in entity) {
      if (entity.hasOwnProperty(key)) {
        const convertedKey = key.toLowerCase().replace(/([-_][a-z])/g, replacer => replacer
          .toUpperCase()
          .replace('-', '')
          .replace('_', '')
        );
        newEntity[convertedKey] = entity[key];
      }
    }
    return newEntity as T;
  }

  protected toSnakeCase(entity: any): any {
    const newEntity: any = {};
    for (const key in entity) {
      if (entity.hasOwnProperty(key)) {
        const convertedKey = key.toLowerCase().replace(/([-_][a-z])/g, replacer => replacer
          .toUpperCase()
          .replace('-', '')
          .replace('_', '')
        );
        newEntity[convertedKey] = entity[key];
      }
    }
    return newEntity;
  }

  abstract getAll(page: number, size: number, filter: U | undefined): Observable<Page<T>>;

  /**
   * @throws {ApiError}
   */
  abstract getOne(id: number): Observable<T>;

  /**
   * @throws {ApiError}
   */
  abstract create(event: T): Observable<T>;

  /**
   * @throws {ApiError}
   */
  abstract update(event: T): Observable<T>;

  /**
   * @throws {ApiError}
   */
  abstract delete(id: number): Observable<void>;
}

