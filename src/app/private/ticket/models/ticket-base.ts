import { BaseEntity } from '../../../shared/shared/models/base-entity';

export interface TicketBase extends BaseEntity {
  code: string;
  createdAt: Date;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  cost: number;
  isAdult: boolean;
  isStudent: boolean;
  paid: boolean;
  userId: number;
  pdf: string | undefined;
}
