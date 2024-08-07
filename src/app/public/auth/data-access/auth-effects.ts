import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth-service';
import { authActions } from './auth-actions';
import { FirebaseService } from '../../../shared/firebase/data-access/firebase-service';

export const loginEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      mergeMap(action =>
        authService.login(action.loginReq).pipe(
          map(auth => authActions.loginSuccess({auth})),
          catchError(e => of(authActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const loginViaGoogleEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.loginViaGoogle),
      mergeMap(action => {
        return authService.loginViaGoogle(action.loginViaGoogleReq).pipe(
          map(auth => authActions.loginSuccess({auth})),
          catchError(e => of(authActions.loadError({error: e.error})))
        );
      })
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
          catchError(e => of(authActions.loadError({error: e.error})))
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
          catchError(e => of(authActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const uploadAuthImageEffect = createEffect(
  (actions$ = inject(Actions),
   firebaseService = inject(FirebaseService)) => {
    return actions$.pipe(
      ofType(authActions.uploadAuthImage),
      mergeMap(action =>
        firebaseService.upload(action.file, action.entity, action.id, action.field, action.update).pipe(
          map(firebaseRes => authActions.uploadAuthImageSuccess({firebaseRes})),
          catchError(e => of(authActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);
