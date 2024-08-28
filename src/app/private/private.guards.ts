import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../public/auth/models/auth-state';
import { selectAuth } from '../public/auth/data-access/auth-reducers';
import { tap } from 'rxjs/operators';
import { Auth } from '../public/auth/models/auth';
import { getFromLocalStorage, removeFromLocalStorage } from '../shared/shared/util/util';
import { authActions } from '../public/auth/data-access/auth-actions';

export const privatePageGuard = () => {
  const router = inject(Router);
  const state = inject(Store<{ auth: AuthState }>);
  return state.pipe(
    select(selectAuth),
    tap(auth => {
      if (!auth || !hasAuthValidTokens(auth)) {
        const authFromLocalStorage = getFromLocalStorage<Auth>('auth', ['createdAt']);
        if (authFromLocalStorage && hasAuthValidTokens(authFromLocalStorage)) {
          state.dispatch(authActions.loginSuccess({auth: authFromLocalStorage}));
        } else {
          state.dispatch(authActions.clear());
          removeFromLocalStorage('auth');
          router.navigateByUrl('/auth').catch(error => console.log(error));
        }
      }
    })
  );
};

export const adminPageGuard = () => {
  const router = inject(Router);
  const state = inject(Store<{ auth: AuthState }>);
  return state.pipe(
    select(selectAuth),
    tap(auth => {
      if (!auth || auth.role.toUpperCase() !== 'ADMIN') {
        state.dispatch(authActions.clear());
        removeFromLocalStorage('auth');
        router.navigateByUrl('/auth').catch(error => console.log(error));
      }
    })
  );
};

const hasAuthValidTokens = (auth: Auth): boolean => {
  return !!(auth.authToken && auth.authToken.length > 0 && auth.refreshToken && auth.refreshToken.length > 0);
};
