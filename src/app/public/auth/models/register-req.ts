import { LoginReq } from './login-req';

export interface RegisterReq extends LoginReq {
  firstname: string;
  lastname: string;
  phoneNumber: string;
}
