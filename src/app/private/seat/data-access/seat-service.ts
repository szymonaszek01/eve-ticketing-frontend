import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/shared/data-access/base-service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Page } from '../../../shared/shared/models/page';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Seat } from '../models/seat';
import { SeatFilter } from '../models/seat-filter';

@Injectable({
  providedIn: 'root'
})
export class SeatService extends BaseService<Seat, SeatFilter> {

  private seatList: Seat[] = [{
    id: 1,
    sector: 'Sector A',
    row: 1,
    number: 1,
    occupied: true,
    eventId: 1
  }, {
    id: 1,
    sector: 'Sector A',
    row: 1,
    number: 1,
    occupied: true,
    eventId: 1
  }];

  create(seat: Seat): Observable<Seat> {
    return of<Seat>(this.seatList[0]).pipe(delay(3000));
  }

  delete(id: number): Observable<void> {
    return of<void>().pipe(delay(3000));
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
    return of<Seat>(this.seatList[id < 2 ? id : 0]).pipe(delay(3000));
  }

  update(seat: Seat): Observable<Seat> {
    return of<Seat>(this.seatList[0]).pipe(delay(3000));
  }
}
