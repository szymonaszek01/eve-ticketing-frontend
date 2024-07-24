import { BaseService } from '../../../shared/shared/data-access/base-service';
import { Ticket } from '../models/ticket';
import { TicketFilter } from '../models/ticket-filter';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Page } from '../../../shared/shared/models/page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { TicketReq } from '../models/ticket-req';
import { TicketRes } from '../models/ticket-res';
import { EventService } from '../../../shared/event/data-access/event-service';
import { SeatService } from '../../seat/data-access/seat-service';
import { Seat } from '../../seat/models/seat';
import { Event } from '../../../shared/event/models/event';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService<Ticket, TicketFilter> {

  constructor(
    protected http: HttpClient,
    private eventService: EventService,
    private seatService: SeatService,
  ) {
    super(http);
  }

  create(ticketReq: TicketReq): Observable<Ticket> {
    return this.http.post<Ticket>(
      environment.apiUrl + environment.ticketApiUrl + '/create',
      {...this.toSnakeCase(ticketReq)}
    ).pipe(
      switchMap((response) => this.mapTicketResToTicket(response)),
      catchError((error) => throwError(error))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + environment.ticketApiUrl + '/id/' + encodeURIComponent(id),
    );
  }

  getAll(page: number, size: number, filter: TicketFilter | undefined, sort: string[] | undefined): Observable<Page<Ticket>> {
    let params = new HttpParams();
    params = params.appendAll({page, size, ...filter});
    sort?.forEach(value => (params = params.append('sort', value)));
    return this.http.get<Page<TicketRes>>(environment.apiUrl + environment.ticketApiUrl + '/all', {params}).pipe(
      mergeMap((response) => {
        if (response.content.length < 1) {
          return of({...response, content: []});
        }
        return forkJoin(response.content.map((ticketRes) => this.mapTicketResToTicket(ticketRes))).pipe(
          map((tickets) => ({
            ...response,
            content: tickets,
          }))
        );
      }),
      catchError((error) => throwError(error))
    );
  }

  getOne(id: number): Observable<Ticket> {
    return this.http.get<TicketRes>(
      environment.apiUrl + environment.ticketApiUrl + '/id/' + encodeURIComponent(id),
    ).pipe(
      switchMap((response) => this.mapTicketResToTicket(response)),
      catchError((error) => throwError(error))
    );
  }

  update(values: any): Observable<Ticket> {
    return this.http.put<TicketRes>(
      environment.apiUrl + environment.ticketApiUrl + '/update',
      this.toSnakeCase({...values})
    ).pipe(
      switchMap((response) => this.mapTicketResToTicket(response)),
      catchError((error) => throwError(error))
    );
  }

  pay(values: any): Observable<void> {
    return this.http.put<void>(
      environment.apiUrl + environment.ticketApiUrl + '/pay',
      this.toSnakeCase({...values})
    ).pipe(
      catchError((error) => throwError(error))
    );
  }

  private mapTicketResToTicket(response: any): Observable<Ticket> {
    const eventObservable = this.eventService.getOne(response.event_id);
    const seatObservable = response.seat_id ? this.seatService.getOne(response.seat_id) : of(undefined);
    return forkJoin({event: eventObservable, seat: seatObservable}).pipe(
      map(({event, seat}) => {
        delete response.event_id;
        delete response.seat_id;
        return this.mergeResponse(response, event, seat);
      }),
      map(ticket => ({...ticket, createdAt: new Date(ticket.createdAt)}))
    );
  }

  private mergeResponse(response: any, event: Event, seat: Seat | undefined): Ticket {
    return this.toCamelCase({...response, event, seat});
  }
}
