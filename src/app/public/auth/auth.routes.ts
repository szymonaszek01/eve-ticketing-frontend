import { Route } from '@angular/router';
import { AuthPageComponent } from './features/auth-page/auth-page.component';
import { AuthGooglePageComponent } from './features/auth-google-page/auth-google-page.component';

export const authRoutes: Route[] = [{
  path: '',
  component: AuthPageComponent
}, {
  path: 'code/google',
  component: AuthGooglePageComponent
}];
