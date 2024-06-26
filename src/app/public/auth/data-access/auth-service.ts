import { Auth } from '../models/auth';
import { Injectable } from '@angular/core';
import { Service } from '../../../shared/shared/data-access/service';
import { LoginReq } from '../models/login-req';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RegisterReq } from '../models/register-req';
import { RegenerateAuthTokenReq } from '../models/regenerate-auth-token-req';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service<Auth> {

  login(loginReq: LoginReq): Observable<Auth> {
    return this.http.post(
      environment.apiUrl + environment.authUserApiUrl + '/login',
      {...this.toSnakeCase(loginReq)}
    ).pipe(
      map(response => {
        const auth: Auth = this.toCamelCase(response);
        return {...auth, createdAt: new Date(auth.createdAt)};
      }),
      catchError(error => throwError(error))
    );
  }

  register(registerReq: RegisterReq): Observable<Auth> {
    return this.http.post<Auth>(
      environment.apiUrl + environment.authUserApiUrl + '/register',
      {...this.toSnakeCase(registerReq)}
    ).pipe(
      map(response => {
        const auth: Auth = this.toCamelCase(response);
        return {...auth, createdAt: new Date(auth.createdAt)};
      }),
      catchError(error => throwError(error))
    );
  }

  regenerateAuthToken(regenerateAuthTokenReq: RegenerateAuthTokenReq): Observable<Auth> {
    return this.http.put<Auth>(
      environment.apiUrl + environment.authUserApiUrl + '/refresh-token',
      {...this.toSnakeCase(regenerateAuthTokenReq)}
    ).pipe(
      map(response => {
        const auth: Auth = this.toCamelCase(response);
        return {...auth, createdAt: new Date(auth.createdAt)};
      }),
      catchError(error => throwError(error))
    );
  }
}
