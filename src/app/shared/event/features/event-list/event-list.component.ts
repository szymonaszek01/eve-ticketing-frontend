import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../data-access/event-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../models/event';
import { BaseState } from '../../../shared/models/base-state';
import { Store } from '@ngrx/store';
import { eventActions } from '../../data-access/event-actions';
import { selectList } from '../../data-access/event-reducers';

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

  constructor(private eventService: EventService, private store: Store<{ event: BaseState<Event> }>) {
    this.eventList = [];
    this.store.dispatch(eventActions.load({page: 0, size: 10, filter: undefined}));
  }

  ngOnInit(): void {
    this.store.select(selectList).subscribe(eventList => this.eventList = eventList);
  }
}
