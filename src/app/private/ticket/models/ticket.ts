import { Seat } from '../../seat/models/seat';
import { Event } from '../../../shared/event/models/event';
import { TicketBase } from './ticket-base';

export interface Ticket extends TicketBase {
  event: Event;
  seat: Seat | undefined;
}
