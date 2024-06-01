import { Event } from '../../models/Event';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {

  @Input()
  public event: Event;

  constructor() {
    this.event = {} as Event;
  }
}
