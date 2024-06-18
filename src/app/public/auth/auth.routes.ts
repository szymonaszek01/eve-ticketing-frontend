import { Route } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { RegisterPageComponent } from './features/register-page/register-page.component';

export const authRoutes: Route[] = [{
  path: 'login',
  component: LoginPageComponent
}, {
  path: 'register',
  component: RegisterPageComponent
}];
