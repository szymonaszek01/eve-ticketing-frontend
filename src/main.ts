import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { eventFeatureKey, eventReducer } from './app/shared/event/data-access/event-reducers';
import * as eventEffects from './app/shared/event/data-access/event-effects';
import * as authEffects from './app/public/auth/data-access/auth-effects';
import * as userEffects from './app/private/user/data-access/user-effects';
import { provideEffects } from '@ngrx/effects';
import { authFeatureKey, authReducer } from './app/public/auth/data-access/auth-reducers';
import { authInterceptor } from './app/shared/shared/interceptors/auth-interceptor';
import { userFeatureKey, userReducer } from './app/private/user/data-access/user-reducers';
import { provideOAuthClient } from 'angular-oauth2-oidc';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideStore(),
    provideState(eventFeatureKey, eventReducer),
    provideState(authFeatureKey, authReducer),
    provideState(userFeatureKey, userReducer),
    provideEffects(eventEffects),
    provideEffects(authEffects),
    provideEffects(userEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideOAuthClient()
  ]
})
  .catch(error => console.error(error));
