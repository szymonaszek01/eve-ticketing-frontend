import { Component } from '@angular/core';
import { EventListComponent } from '../../../../shared/event/features/event-list/event-list.component';
import { UserCardComponent } from '../../../user/features/user-card/user-card.component';
import { PrivatePageComponent } from '../../../private-page.component';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';
import { ticketActions } from '../../../ticket/data-access/ticket-actions';
import { ticketReservedFilter } from '../../../../shared/shared/util/util';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    EventListComponent,
    UserCardComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent extends PrivatePageComponent {

  ngOnInit(): void {
    this.authStore.select(selectAuth).subscribe(auth => {
      if (auth) {
        this.ticketStore.dispatch(ticketActions.loadReserved({page: 0, size: 5, filter: ticketReservedFilter(auth.id), sort: undefined}));
      }
    });
  }
}
