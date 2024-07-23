import { TicketBase } from './ticket-base';

export interface TicketRes extends TicketBase {
  eventId: number;
  seatId: number;
}
