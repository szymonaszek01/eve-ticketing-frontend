export interface TicketFilter {
  code: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  minCost: string;
  maxCost: string;
  minDate: string;
  maxDate: string;
  userId: number;
  eventId: number;
  seatId: number;
  paid: boolean;
}
