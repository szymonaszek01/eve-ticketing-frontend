
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

  abstract getAll(page: number, size: number, filter: U | undefined): T[];

  /**
   * @throws {ApiError}
   */
  abstract getOne(id: number): T | undefined;

  /**
   * @throws {ApiError}
   */
  abstract create(event: T): T | undefined;

  /**
   * @throws {ApiError}
   */
  abstract update(event: T): T | undefined;

  /**
   * @throws {ApiError}
   */
  abstract delete(id: number): void;
}

