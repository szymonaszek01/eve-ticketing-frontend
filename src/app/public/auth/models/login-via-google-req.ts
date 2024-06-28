export interface LoginViaGoogleReq {
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
  phoneNumber: string | undefined;
}
