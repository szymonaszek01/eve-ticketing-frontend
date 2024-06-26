import { ApiError } from './api-error';

export interface BaseState<T, U> {
  list: T[];
  lastAdded: T | undefined;
  lastUpdated: T | undefined;
  lastRemoved: T | undefined;
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  loading: boolean;
  error: ApiError | undefined;
  filter: U | undefined;
  sort: string[] | undefined;
}
