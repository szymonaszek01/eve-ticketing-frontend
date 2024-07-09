import { BaseEntity } from '../../../shared/shared/models/base-entity';

export interface Ticket extends BaseEntity {
  code: string;
  createdAt: Date;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  cost: number;
  isAdult: boolean;
  isStudent: boolean;
  eventId: number;
  seatId: number;
  userId: number;
  paid: boolean;
}
