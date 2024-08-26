import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserService } from './user-service';
import { userActions } from './user-actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export const loadUserListEffect = createEffect(
  (actions$ = inject(Actions),
   userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.load),
      mergeMap(action =>
        userService.getAll(action.page, action.size, action.filter, action.sort).pipe(
          map(page => userActions.loadSuccess({page})),
          catchError(e => of(userActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const updateUserEffect = createEffect(
  (actions$ = inject(Actions),
   userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.update),
      mergeMap(action =>
        userService.update(action.values).pipe(
          map(user => userActions.updateSuccess({user})),
          catchError(e => of(userActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const removeUserEffect = createEffect(
  (actions$ = inject(Actions),
   userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.remove),
      mergeMap(action =>
        userService.delete(action.user.id).pipe(
          map(() => userActions.removeSuccess({user: action.user})),
          catchError(e => of(userActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);
