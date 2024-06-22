import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../public/auth/models/auth-state';
import { selectAuth } from '../public/auth/data-access/auth-reducers';
import { tap } from 'rxjs/operators';

export const privatePageGuard = () => {
  const router = inject(Router);
  const state = inject(Store<{ auth: AuthState }>);
  return state.pipe(
    select(selectAuth),
    tap(auth => {
      if (!auth || !auth.authToken || !auth.refreshToken || !auth.role) {
        router.navigateByUrl('/login').catch(error => console.log(error));
      }
    })
  );
};
