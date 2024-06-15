import { Event } from '../models/event';
import { EventFilter } from '../models/event-filter';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/data-access/base-service';
import { Observable, of, throwError } from 'rxjs';
import { Page } from '../../shared/models/page';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<Event, EventFilter> {

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

  getAll(page: number, size: number, filter: EventFilter | undefined, sort: string[] | undefined): Observable<Page<Event>> {
    let sortArray = new HttpParams();
    sort?.forEach(value => (sortArray = sortArray.append('sort', value)));
    return this.http.get<Page<Event>>(environment.apiUrl + environment.eventApiUrl + '/all', {
      params: {
        page,
        size,
        ...filter,
        ...sortArray
      }
    }).pipe(
      map(response => ({
        ...response,
        content: response.content.map(event => this.toCamelCase(event)).map(event => ({
          ...event,
          startAt: new Date(event.startAt),
          endAt: new Date(event.endAt)
        }))
      })),
      catchError(error => throwError(error))
    );
  }

  getOne(id: number): Observable<Event> {
    return of<Event>(this.eventList[id < 2 ? id : 0]).pipe(delay(3000));
  }

  update(event: Event): Observable<Event> {
    return of<Event>(this.eventList[0]).pipe(delay(3000));
  }
}
