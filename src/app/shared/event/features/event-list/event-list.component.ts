import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../data-access/event-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../models/event';

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

  constructor(private eventService: EventService) {
    this.eventList = [];
  }

  ngOnInit(): void {
    this.eventService.getAll(0, 2, undefined).subscribe(response => this.eventList = response.content);
  }
}
