import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Event } from '../models/event';
import { Page } from '../../shared/models/page';
import { ApiError } from '../../shared/models/api-error';
import { EventFilter } from '../models/event-filter';

export const eventActions = createActionGroup({
  source: 'Event',
  events: {
    Load: props<{ page: number, size: number, filter: EventFilter | undefined }>(),
    'Load success': props<{ page: Page<Event> }>(),
    Add: props<{ event: Event }>(),
    'Add success': props<{ event: Event }>(),
    Replace: props<{ event: Event }>(),
    'Replace success': props<{ event: Event }>(),
    Remove: props<{ event: Event }>(),
    'Remove success': props<{ event: Event }>(),
    Clear: emptyProps(),
    'Load error': props<{ error: ApiError }>()
  }
});
