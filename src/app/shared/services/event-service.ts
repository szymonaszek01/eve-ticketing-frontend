import { Event } from '../models/event';
import { EventFilterDto } from '../dtos/event-filter-dto';
import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, of } from 'rxjs';
import { Page } from '../models/page';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<Event, EventFilterDto> {

  private eventList: Event[] = [{
    id: 1,
    name: 'Test event 1',
    description: 'test event 1 is really good event',
    maxTicketAmount: 1000,
    isSoldOut: false,
    unitPrice: 200,
    currency: '$',
    childrenDiscount: 30,
    studentsDiscount: 50,
    startAt: new Date(),
    endAt: new Date(),
    country: 'Poland',
    address: 'Tadeusza Rechniewskiego 13/146',
    localizationName: 'Pepsi stadium',
    isWithoutSeats: false,
    adminId: 1
  }, {
    id: 2,
    name: 'Test event 2',
    description: 'test event 1 is really good event',
    maxTicketAmount: 1500,
    isSoldOut: false,
    unitPrice: 250,
    currency: '$',
    childrenDiscount: 30,
    studentsDiscount: 50,
    startAt: new Date(),
    endAt: new Date(),
    country: 'Poland',
    address: 'Tadeusza Rechniewskiego 15/146',
    localizationName: 'Anders stadium',
    isWithoutSeats: false,
    adminId: 1
  }];

  create(event: Event): Observable<Event> {
    return of<Event>(this.eventList[0]).pipe(delay(3000));
  }

  delete(id: number): Observable<void> {
    return of<void>().pipe(delay(3000));
  }

  getAll(page: number, size: number, filter: EventFilterDto | undefined): Observable<Page<Event>> {
    return of<Page<Event>>({
      content: this.eventList,
      pageable: {
        sort: {
          empty: true,
          sorted: false,
          unsorted: true
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 5,
        unpaged: false,
        paged: true
      },
      last: false,
      totalPages: 20,
      totalElements: 100,
      size: 5,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      numberOfElements: 5,
      first: true,
      empty: false
    }).pipe(delay(3000));
  }

  getOne(id: number): Observable<Event> {
    return of<Event>(this.eventList[id < 2 ? id : 0]).pipe(delay(3000));
  }

  update(event: Event): Observable<Event> {
    return of<Event>(this.eventList[0]).pipe(delay(3000));
  }
}
