import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../services/EventService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Event} from '../../models/Event';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    EventCardComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  public eventList: Event[];

  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
    this.eventList = eventService.getAll(0, 2, undefined);
  }
}
