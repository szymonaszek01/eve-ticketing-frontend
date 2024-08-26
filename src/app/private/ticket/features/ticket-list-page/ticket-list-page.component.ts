import { Component } from '@angular/core';
import { PrivatePageComponent } from '../../../private-page.component';
import { EmptyContentCardComponent } from '../../../../shared/shared/components/empty-content-card/empty-content-card.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgForOf, NgIf } from '@angular/common';
import { TicketFilterComponent } from '../ticket-filter/ticket-filter.component';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../public/auth/models/auth-state';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TicketFilter } from '../../models/ticket-filter';
import { TicketState } from '../../models/ticket-state';
import { ticketActions } from '../../data-access/ticket-actions';
import { Ticket } from '../../models/ticket';
import {
  selectFilter,
  selectLastRemoved,
  selectLastUpdated,
  selectList,
  selectPage,
  selectSize,
  selectSort,
  selectTotalElements
} from '../../data-access/ticket-reducers';
import { ticketListFilter } from '../../../../shared/shared/util/util';
import { selectAuth } from '../../../../public/auth/data-access/auth-reducers';

@Component({
  selector: 'app-ticket-list-page',
  standalone: true,
  imports: [
    EmptyContentCardComponent,
    TicketFilterComponent,
    MatPaginator,
    NgForOf,
    NgIf,
    TicketFilterComponent,
    TicketCardComponent
  ],
  templateUrl: './ticket-list-page.component.html',
  styleUrl: './ticket-list-page.component.scss'
})
export class TicketListPageComponent extends PrivatePageComponent {

  public ticketList: Ticket[];

  public page: number;

  public size: number;

  public totalElements: number;

  private filter: TicketFilter | undefined;

  private sort: string[] | undefined;

  constructor(protected router: Router,
              protected authStore: Store<{ auth: AuthState }>,
              protected ticketStore: Store<{ ticket: TicketState }>,
              protected dialog: MatDialog
  ) {
    super(router, authStore, ticketStore, dialog);
    this.ticketList = [];
    this.page = 0;
    this.size = 0;
    this.totalElements = 0;
    this.sort = undefined;
    this.ticketStore.dispatch(ticketActions.load({page: 0, size: 10, filter: this.filter, sort: undefined}));
  }

  ngOnInit(): void {
    this.authStore.select(selectAuth).subscribe(auth => {
      if (auth) {
        this.ticketStore.dispatch(ticketActions.setFilter({filter: ticketListFilter(auth.id)}));
      }
    });
    this.ticketStore.select(selectList).subscribe(ticketList => this.ticketList = ticketList);
    this.ticketStore.select(selectPage).subscribe(page => this.page = page);
    this.ticketStore.select(selectSize).subscribe(size => this.size = size);
    this.ticketStore.select(selectTotalElements).subscribe(totalElements => this.totalElements = totalElements);
    this.ticketStore.select(selectFilter).subscribe(filter => {
      this.filter = filter;
      if (this.size > 0) {
        this.ticketStore.dispatch(ticketActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
      }
    });
    this.ticketStore.select(selectSort).subscribe(sort => {
      this.sort = sort;
      if (this.size > 0) {
        this.ticketStore.dispatch(ticketActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
      }
    });
    this.ticketStore.select(selectLastUpdated).subscribe(ticket => {
      if (ticket && this.size > 0) {
        this.ticketStore.dispatch(ticketActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
      }
    });
    this.ticketStore.select(selectLastRemoved).subscribe(ticket => {
      if (ticket && this.size > 0) {
        this.ticketStore.dispatch(ticketActions.load({page: this.page, size: this.size, filter: this.filter, sort: this.sort}));
      }
    });
  }

  public pageHandler(pageEvent: PageEvent): void {
    if (this.size < 1) {
      return;
    }
    this.ticketStore.dispatch(ticketActions.load({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
      filter: this.filter,
      sort: this.sort
    }));
  }
}
