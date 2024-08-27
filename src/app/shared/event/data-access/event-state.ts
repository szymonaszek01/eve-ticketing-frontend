import { BaseState } from '../../shared/models/base-state';
import { Event } from '../models/event';
import { EventFilter } from '../models/event-filter';

export interface EventState extends BaseState<Event, EventFilter> {
  createdList: Event[];
  createdPage: number;
  createdSize: number;
  createdTotalPages: number;
  createdTotalElements: number;
  createdLast: boolean;
}
