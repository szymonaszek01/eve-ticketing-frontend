import { Route } from '@angular/router';
import { PrivatePageComponent } from './private-page.component';
import { adminPageGuard, privatePageGuard } from './private.guards';

export const privateRoutes: Route[] = [{
  path: 'dashboard',
  component: PrivatePageComponent,
  canActivate: [privatePageGuard],
  loadChildren: () => import('src/app/private/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
}, {
  path: 'ticket-list',
  component: PrivatePageComponent,
  canActivate: [privatePageGuard],
  loadChildren: () => import('src/app/private/ticket/ticket.routes').then(m => m.ticketRoutes)
}, {
  path: 'admin',
  component: PrivatePageComponent,
  canActivate: [privatePageGuard, adminPageGuard],
  loadChildren: () => import('src/app/private/admin/admin.routes').then(m => m.adminRoutes)
}];
