import { ApiError } from './api-error';
import { EventFilter } from '../../event/models/event-filter';

export interface BaseState<T> {
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
  filter: EventFilter | undefined;
  sort: string[] | undefined;
}
