import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../data-access/event-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../models/event';
import { BaseState } from '../../../shared/models/base-state';
import { Store } from '@ngrx/store';
import { eventActions } from '../../data-access/event-actions';
import { selectList, selectPage, selectSize, selectTotalElements } from '../../data-access/event-reducers';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EventFilterComponent } from '../event-filter/event-filter.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    EventCardComponent,
    CommonModule,
    FormsModule,
    MatPaginator,
    EventFilterComponent
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  public eventList: Event[];

  public page: number;

  public size: number;

  public totalElements: number;

  constructor(private eventService: EventService, private store: Store<{ event: BaseState<Event> }>) {
    this.eventList = [];
    this.page = 0;
    this.size = 0;
    this.totalElements = 0;
    this.store.dispatch(eventActions.load({page: 0, size: 10, filter: undefined}));
  }

  ngOnInit(): void {
    this.store.select(selectList).subscribe(eventList => this.eventList = eventList);
    this.store.select(selectPage).subscribe(page => this.page = page);
    this.store.select(selectSize).subscribe(size => this.size = size);
    this.store.select(selectTotalElements).subscribe(totalElements => this.totalElements = totalElements);
  }

  public pageHandler(pageEvent: PageEvent): void {
    this.store.dispatch(eventActions.load({page: pageEvent.pageIndex, size: pageEvent.pageSize, filter: undefined}));
  }
}
