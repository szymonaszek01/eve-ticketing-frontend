import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/shared/data-access/base-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Page } from '../../../shared/shared/models/page';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Seat } from '../models/seat';
import { SeatFilter } from '../models/seat-filter';
import { Event } from '../../../shared/event/models/event';

@Injectable({
  providedIn: 'root'
})
export class SeatService extends BaseService<Seat, SeatFilter> {

  create(seat: Seat): Observable<Seat> {
    return this.http.post<Seat>(
      environment.apiUrl + environment.seatApiUrl + '/create',
      {...this.toSnakeCase(seat)}
    ).pipe(
      map(response => this.toCamelCase(response)),
      catchError((error) => throwError(error))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + environment.seatApiUrl + '/id/' + encodeURIComponent(id),
    );
  }

  getAll(page: number, size: number, filter: SeatFilter | undefined, sort: string[] | undefined): Observable<Page<Seat>> {
    let params = new HttpParams();
    params = params.appendAll({page, size, ...filter});
    sort?.forEach(value => (params = params.append('sort', value)));
    return this.http.get<Page<Seat>>(environment.apiUrl + environment.seatApiUrl + '/all', {params}).pipe(
      map(response => ({
        ...response,
        content: response.content.map(seat => this.toCamelCase(seat))
      })),
      catchError(error => throwError(error))
    );
  }

  getOne(id: number): Observable<Seat> {
    return this.http.get<Event>(
      environment.apiUrl + environment.seatApiUrl + '/id/' + encodeURIComponent(id),
    ).pipe(
      map((response) => this.toCamelCase(response)),
      catchError((error) => throwError(error))
    );
  }

  update(seat: Seat): Observable<Seat> {
    return this.http.put<Seat>(
      environment.apiUrl + environment.seatApiUrl + '/update',
      {...seat}
    ).pipe(
      map((response) => this.toCamelCase(response)),
      catchError((error) => throwError(error))
    );
  }
}
