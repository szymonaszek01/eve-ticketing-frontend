import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TicketFilter } from '../models/ticket-filter';
import { Page } from '../../../shared/shared/models/page';
import { Ticket } from '../models/ticket';
import { ApiError } from '../../../shared/shared/models/api-error';
import { TicketReq } from '../models/ticket-req';

export const ticketActions = createActionGroup({
  source: 'Ticket',
  events: {
    Load: props<{ page: number, size: number, filter: TicketFilter | undefined, sort: string[] | undefined }>(),
    'Load success': props<{ page: Page<Ticket> }>(),
    'Load reserved': props<{ page: number, size: number, filter: TicketFilter | undefined, sort: string[] | undefined }>(),
    'Load reserved success': props<{ page: Page<Ticket> }>(),
    Add: props<{ ticketReq: TicketReq }>(),
    'Add success': props<{ ticket: Ticket }>(),
    Update: props<{ ticket: Ticket }>(),
    'Update success': props<{ ticket: Ticket }>(),
    Remove: props<{ ticket: Ticket }>(),
    'Remove success': props<{ ticket: Ticket }>(),
    Clear: emptyProps(),
    'Load error': props<{ error: ApiError | undefined }>(),
    'Set filter': props<{ filter: TicketFilter }>(),
    'Set sort': props<{ sort: string[] }>()
  }
});
