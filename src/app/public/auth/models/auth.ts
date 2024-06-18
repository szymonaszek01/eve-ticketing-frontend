import { User } from '../../../shared/shared/models/user';

export interface Auth extends User {
  authToken: string;
  refreshToken: string;
}
