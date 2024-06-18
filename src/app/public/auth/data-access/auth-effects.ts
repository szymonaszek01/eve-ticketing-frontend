import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth-service';
import { authActions } from './auth-actions';

export const loginEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      mergeMap(action =>
        authService.login(action.loginReq).pipe(
          map(auth => authActions.loginSuccess({auth})),
          catchError(error => of(authActions.loadError({error})))
        )
      )
    );
  }, {functional: true}
);

export const registerEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      mergeMap(action =>
        authService.register(action.registerReq).pipe(
          map(auth => authActions.registerSuccess({auth})),
          catchError(error => of(authActions.loadError({error})))
        )
      )
    );
  }, {functional: true}
);

export const regenerateAuthTokenEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.regenerateAuthToken),
      mergeMap(action =>
        authService.regenerateAuthToken(action.regenerateAuthTokenReq).pipe(
          map(auth => authActions.regenerateAuthTokenSuccess({auth})),
          catchError(error => of(authActions.loadError({error})))
        )
      )
    );
  }, {functional: true}
);
