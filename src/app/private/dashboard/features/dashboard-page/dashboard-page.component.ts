import { Component } from '@angular/core';
import { EventListComponent } from '../../../../shared/event/features/event-list/event-list.component';
import { UserCardComponent } from '../../../user/features/user-card/user-card.component';
import { PrivatePageComponent } from '../../../private-page.component';

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

}
