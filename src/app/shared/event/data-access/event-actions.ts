import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Event } from '../models/event';
import { Page } from '../../shared/models/page';
import { ApiError } from '../../shared/models/api-error';
import { EventFilter } from '../models/event-filter';

export const eventActions = createActionGroup({
  source: 'Event',
  events: {
    Load: props<{ page: number, size: number, filter: EventFilter | undefined, sort: string[] | undefined }>(),
    'Load success': props<{ page: Page<Event> }>(),
    'Load created': props<{ page: number, size: number, filter: EventFilter | undefined, sort: string[] | undefined }>(),
    'Load created success': props<{ page: Page<Event> }>(),
    Add: props<{ event: Event }>(),
    'Add success': props<{ event: Event }>(),
    Update: props<{ event: Event }>(),
    'Update success': props<{ event: Event }>(),
    Remove: props<{ event: Event }>(),
    'Remove success': props<{ event: Event }>(),
    Clear: emptyProps(),
    'Load error': props<{ error: ApiError | undefined}>(),
    'Set filter': props<{ filter: EventFilter }>(),
    'Set sort': props<{ sort: string[] }>()
  }
});
