import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    EventCardComponent
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

}
