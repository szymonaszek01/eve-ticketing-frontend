import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card/event-card.component';
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
import { AuthState } from '../../../../public/auth/models/auth-state';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { runTicketMatDialogAction, TicketMatDialogAction } from '../../../shared/util/util';

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

  private isLoggedIn: boolean;

  constructor(private eventStore: Store<{ event: BaseState<Event, EventFilter> }>,
              private authStore: Store<{ auth: AuthState }>,
              private router: Router,
              private dialog: MatDialog
  ) {
    this.eventList = [];
    this.page = 0;
    this.size = 0;
    this.totalElements = 0;
    this.filter = undefined;
    this.sort = undefined;
    this.isLoggedIn = false;
    this.eventStore.dispatch(eventActions.load({page: 0, size: 10, filter: undefined, sort: undefined}));
  }

  ngOnInit(): void {
    this.eventStore.select(selectList).subscribe(eventList => this.eventList = eventList);
    this.eventStore.select(selectPage).subscribe(page => this.page = page);
    this.eventStore.select(selectSize).subscribe(size => this.size = size);
    this.eventStore.select(selectTotalElements).subscribe(totalElements => this.totalElements = totalElements);
    this.eventStore.select(selectFilter).subscribe(filter => {
      this.filter = filter;
      if (this.size > 0) {
        this.eventStore.dispatch(eventActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
      }
    });
    this.eventStore.select(selectSort).subscribe(sort => {
      this.sort = sort;
      if (this.size > 0) {
        this.eventStore.dispatch(eventActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
      }
    });
    this.authStore.select(selectAuth).subscribe(auth => this.isLoggedIn = auth !== undefined);
  }

  public pageHandler(pageEvent: PageEvent): void {
    if (pageEvent.pageSize < 1) {
      return;
    }
    this.eventStore.dispatch(eventActions.load({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
      filter: this.filter,
      sort: this.sort
    }));
  }

  protected onButtonBuyTicketClick(event: Event): void {
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/auth').catch(error => console.log(error));
    } else {
      runTicketMatDialogAction(this.dialog, event, TicketMatDialogAction.CREATE);
    }
  }
}
