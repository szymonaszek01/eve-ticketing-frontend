import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: '',
  loadChildren: () => import('src/app/public/public.routes').then(m => m.publicRoutes)
}, {
  path: 'private',
  loadChildren: () => import('src/app/private/private.routes').then(m => m.privateRoutes)
}];
