import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class Service<T> {

  constructor(protected http: HttpClient) {
  }

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
        const convertedKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        newEntity[convertedKey] = entity[key];
      }
    }
    return newEntity;
  }
}
