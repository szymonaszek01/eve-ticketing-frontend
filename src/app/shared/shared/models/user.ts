import { BaseEntity } from './base-entity';

export interface User extends BaseEntity {
  email: string;
  createdAt: Date;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  role: string;
}
