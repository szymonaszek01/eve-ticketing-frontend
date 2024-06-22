import { Route } from '@angular/router';
import { PrivatePageComponent } from './private-page.component';
import { privatePageGuard } from './private.guards';

export const privateRoutes: Route[] = [{
  path: 'dashboard',
  component: PrivatePageComponent,
  canActivate: [privatePageGuard],
  loadChildren: () => import('src/app/private/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
}];
