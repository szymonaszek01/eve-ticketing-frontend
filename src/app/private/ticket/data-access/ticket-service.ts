import { BaseService } from '../../../shared/shared/data-access/base-service';
import { Ticket } from '../models/ticket';
import { TicketFilter } from '../models/ticket-filter';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Page } from '../../../shared/shared/models/page';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { TicketReq } from '../models/ticket-req';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService<Ticket, TicketFilter> {

  private ticketList: Ticket[] = [{
    id: 1,
    code: 'Code 1',
    createdAt: new Date(),
    firstname: 'John',
    lastname: 'Kane',
    phoneNumber: '+48791000123',
    cost: 200,
    isAdult: true,
    isStudent: false,
    eventId: 1,
    seatId: 1,
    userId: 1,
    paid: true
  }, {
    id: 2,
    code: 'Code 2',
    createdAt: new Date(),
    firstname: 'Ann',
    lastname: 'Thomason',
    phoneNumber: '+48891000123',
    cost: 200,
    isAdult: true,
    isStudent: false,
    eventId: 1,
    seatId: 2,
    userId: 1,
    paid: true
  }];

  create(ticketReq: TicketReq): Observable<Ticket> {
    return this.http.post<Ticket>(
      environment.apiUrl + environment.ticketApiUrl + '/create',
      {...this.toSnakeCase(ticketReq)}
    ).pipe(
      map(response => {
        const ticket: Ticket = this.toCamelCase(response);
        return {...ticket, createdAt: new Date(ticket.createdAt)};
      }),
      catchError(error => throwError(error))
    );
  }

  delete(id: number): Observable<void> {
    return of<void>().pipe(delay(3000));
  }

  getAll(page: number, size: number, filter: TicketFilter | undefined, sort: string[] | undefined): Observable<Page<Ticket>> {
    let params = new HttpParams();
    params = params.appendAll({page, size, ...filter});
    sort?.forEach(value => (params = params.append('sort', value)));
    return this.http.get<Page<Ticket>>(environment.apiUrl + environment.ticketApiUrl + '/all', {params}).pipe(
      map(response => ({
        ...response,
        content: response.content.map(ticket => this.toCamelCase(ticket)).map(ticket => ({
          ...ticket,
          createdAt: new Date(ticket.createdAt)
        }))
      })),
      catchError(error => throwError(error))
    );
  }

  getOne(id: number): Observable<Ticket> {
    return of<Ticket>(this.ticketList[id < 2 ? id : 0]).pipe(delay(3000));
  }

  update(ticket: Ticket): Observable<Ticket> {
    return of<Ticket>(this.ticketList[0]).pipe(delay(3000));
  }
}
