import { Event } from '../models/event';
import { EventFilter } from '../models/event-filter';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/data-access/base-service';
import { Observable, throwError } from 'rxjs';
import { Page } from '../../shared/models/page';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<Event, EventFilter> {

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(
      environment.apiUrl + environment.eventApiUrl + '/create',
      {...this.toSnakeCase(event)}
    ).pipe(
      map(response => this.toCamelCase(response)),
      catchError((error) => throwError(error))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + environment.eventApiUrl + '/id/' + encodeURIComponent(id),
    );
  }

  getAll(page: number, size: number, filter: EventFilter | undefined, sort: string[] | undefined): Observable<Page<Event>> {
    let params = new HttpParams();
    params = params.appendAll({page, size, ...filter});
    sort?.forEach(value => (params = params.append('sort', value)));
    return this.http.get<Page<Event>>(environment.apiUrl + environment.eventApiUrl + '/all', {params}).pipe(
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
    return this.http.get<Event>(
      environment.apiUrl + environment.eventApiUrl + '/id/' + encodeURIComponent(id),
    ).pipe(
      map((response) => {
        console.log(response);
        return this.toCamelCase(response);
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  update(event: Event): Observable<Event> {
    return this.http.put<Event>(
      environment.apiUrl + environment.eventApiUrl + '/update',
      {...event}
    ).pipe(
      map((response) => this.toCamelCase(response)),
      catchError((error) => throwError(error))
    );
  }
}
