import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../public/auth/models/auth-state';
import { catchError, switchMap, take } from 'rxjs/operators';
import { selectAuth } from '../../../public/auth/data-access/auth-reducers';
import { authActions } from '../../../public/auth/data-access/auth-actions';
import { Auth } from '../../../public/auth/models/auth';

const setAuthTokenInHeaders = (auth: Auth | undefined, req: HttpRequest<any>): HttpRequest<any> => {
  if (auth && auth.authToken && auth.refreshToken) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.authToken}`
      }
    });
  }
  return req;
};

const regenerateAuthToken = (auth: Auth | undefined): void => {
  const store = inject(Store<{ auth: AuthState }>);
  if (auth && auth.authToken && auth.refreshToken) {
    store.dispatch(authActions.regenerateAuthToken({
      regenerateAuthTokenReq: {
        id: auth.id,
        authToken: auth.authToken,
        refreshToken: auth.refreshToken
      }
    }));
  }
};

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const store = inject(Store<{ auth: AuthState }>);
  return store.select(selectAuth).pipe(
    take(1),
    switchMap(auth => {
      return next(setAuthTokenInHeaders(auth, req)).pipe(
        catchError(error => {
          if (error.status !== 401) {
            store.dispatch(authActions.clear());
            return throwError(error);
          }
          regenerateAuthToken(auth);
          return store.select(selectAuth).pipe(
            take(1),
            switchMap(updatedAuth => next(setAuthTokenInHeaders(updatedAuth, req)))
          );
        })
      );
    })
  );
};
