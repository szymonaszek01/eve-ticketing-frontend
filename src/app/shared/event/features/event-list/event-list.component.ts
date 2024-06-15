import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../data-access/event-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../models/event';
import { BaseState } from '../../../shared/models/base-state';
import { Store } from '@ngrx/store';
import { eventActions } from '../../data-access/event-actions';
import { selectFilter, selectList, selectPage, selectSize, selectSort, selectTotalElements } from '../../data-access/event-reducers';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EventFilterComponent } from '../event-filter/event-filter.component';
import { EventFilter } from '../../models/event-filter';
import { EmptyContentCardComponent } from '../../../shared/components/empty-content-card/empty-content-card.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    EventCardComponent,
    CommonModule,
    FormsModule,
    MatPaginator,
    EventFilterComponent,
    EmptyContentCardComponent
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  public eventList: Event[];

  public page: number;

  public size: number;

  public totalElements: number;

  private filter: EventFilter | undefined;

  private sort: string[] | undefined;

  constructor(private eventService: EventService, private store: Store<{ event: BaseState<Event> }>) {
    this.eventList = [];
    this.page = 0;
    this.size = 0;
    this.totalElements = 0;
    this.filter = undefined;
    this.sort = undefined;
    this.store.dispatch(eventActions.load({page: 0, size: 10, filter: undefined, sort: undefined}));
  }

  ngOnInit(): void {
    this.store.select(selectList).subscribe(eventList => this.eventList = eventList);
    this.store.select(selectPage).subscribe(page => this.page = page);
    this.store.select(selectSize).subscribe(size => this.size = size);
    this.store.select(selectTotalElements).subscribe(totalElements => this.totalElements = totalElements);
    this.store.select(selectFilter).subscribe(filter => {
      this.filter = filter;
      this.store.dispatch(eventActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
    });
    this.store.select(selectSort).subscribe(sort => {
      this.sort = sort;
      this.store.dispatch(eventActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
    });
  }

  public pageHandler(pageEvent: PageEvent): void {
    this.store.dispatch(eventActions.load({page: pageEvent.pageIndex, size: pageEvent.pageSize, filter: this.filter, sort: this.sort}));
  }
}
