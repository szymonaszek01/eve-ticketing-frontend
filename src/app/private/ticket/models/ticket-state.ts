import { BaseState } from '../../../shared/shared/models/base-state';
import { Ticket } from './ticket';
import { TicketFilter } from './ticket-filter';

export interface TicketState extends BaseState<Ticket, TicketFilter> {
  reservedList: Ticket[];
}
