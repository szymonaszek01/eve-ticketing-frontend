export interface Seat {
  id: number;
  sector: string;
  row: number;
  number: number;
  occupied: boolean;
  eventId: number;
}
