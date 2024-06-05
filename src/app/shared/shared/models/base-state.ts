import { ApiError } from './api-error';

export interface BaseState<T> {
  list: T[];
  lastAdded: T | undefined;
  lastUpdated: T | undefined;
  lastRemoved: T | undefined;
  page: number;
  size: number;
  totalPages: number;
  last: boolean;
  loading: boolean;
  error: ApiError | undefined;
}
