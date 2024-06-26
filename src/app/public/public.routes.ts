import { Route } from '@angular/router';
import { PublicPageComponent } from './public-page.component';

export const publicRoutes: Route[] = [{
  path: '',
  component: PublicPageComponent,
  loadChildren: () => import('src/app/public/home/home.routes').then(m => m.homeRoutes)
}, {
  path: 'auth',
  component: PublicPageComponent,
  loadChildren: () => import('src/app/public/auth/auth.routes').then(m => m.authRoutes)
}];
