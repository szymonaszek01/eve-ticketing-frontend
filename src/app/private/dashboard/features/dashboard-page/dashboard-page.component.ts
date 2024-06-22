import { Component } from '@angular/core';
import { EventListComponent } from '../../../../shared/event/features/event-list/event-list.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    EventListComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
