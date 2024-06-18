import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Injectable } from '@angular/core';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T, U> extends Service<T> {

  abstract getAll(page: number, size: number, filter: U | undefined, sort: string[] | undefined): Observable<Page<T>>;

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

