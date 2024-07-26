import { Route } from '@angular/router';
import { TicketListPageComponent } from './features/ticket-list-page/ticket-list-page.component';

export const ticketRoutes: Route[] = [{
  path: '',
  component: TicketListPageComponent
}];
