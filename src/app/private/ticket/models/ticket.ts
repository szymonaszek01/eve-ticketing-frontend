import { Seat } from '../../seat/models/seat';
import { User } from '../../../shared/shared/models/user';
import { Event } from '../../../shared/event/models/event';
import { TicketBase } from './ticket-base';

export interface Ticket extends TicketBase {
  event: Event;
  seat: Seat | undefined;
  user: User;
}
