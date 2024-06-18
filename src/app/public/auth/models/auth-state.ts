import { ApiError } from '../../../shared/shared/models/api-error';
import { Auth } from './auth';

export interface AuthState {
  auth: Auth | undefined;
  firstLogin: boolean;
  loading: boolean;
  error: ApiError | undefined;
}
