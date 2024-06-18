import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { eventFeatureKey, eventReducer } from './app/shared/event/data-access/event-reducers';
import * as eventEffects from './app/shared/event/data-access/event-effects';
import * as authEffects from './app/public/auth/data-access/auth-effects';
import { provideEffects } from '@ngrx/effects';
import { authFeatureKey, authReducer } from './app/public/auth/data-access/auth-reducers';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideStore(),
    provideState(eventFeatureKey, eventReducer),
    provideState(authFeatureKey, authReducer),
    provideEffects(eventEffects),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
})
  .catch(error => console.error(error));
