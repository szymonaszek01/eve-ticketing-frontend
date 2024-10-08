import { BaseEntity } from '../../shared/models/base-entity';

export interface Event extends BaseEntity {
  name: string;
  description: string;
  maxTicketAmount: number;
  isSoldOut: boolean;
  unitPrice: number;
  currency: string;
  childrenDiscount: number;
  studentsDiscount: number;
  startAt: Date;
  endAt: Date;
  country: string;
  address: string;
  localizationName: string;
  isWithoutSeats: boolean;
  image: string;
  adminId: number;
}
