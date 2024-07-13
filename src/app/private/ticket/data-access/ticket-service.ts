import { BaseService } from '../../../shared/shared/data-access/base-service';
import { Ticket } from '../models/ticket';
import { TicketFilter } from '../models/ticket-filter';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Page } from '../../../shared/shared/models/page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { TicketReq } from '../models/ticket-req';
import { TicketRes } from '../models/ticket-res';
import { TicketBase } from '../models/ticket-base';
import { EventService } from '../../../shared/event/data-access/event-service';
import { SeatService } from '../../seat/data-access/seat-service';
import { UserService } from '../../user/data-access/user-service';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService<Ticket, TicketFilter> {

  constructor(
    protected http: HttpClient,
    private eventService: EventService,
    private seatService: SeatService,
    private userService: UserService,
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
      mergeMap((response) =>
        forkJoin(response.content.map((ticketRes) => this.mapTicketResToTicket(ticketRes))).pipe(
          map((tickets) => ({
            ...response,
            content: tickets,
          }))
        )
      ),
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

  update(ticket: Ticket): Observable<Ticket> {
    return this.http.put<TicketRes>(
      environment.apiUrl + environment.ticketApiUrl + '/update',
      {...(ticket as TicketBase), eventId: ticket.event.id, seatId: ticket.seat?.id, userId: ticket.user.id}
    ).pipe(
      switchMap((response) => this.mapTicketResToTicket(response)),
      catchError((error) => throwError(error))
    );
  }

  private mapTicketResToTicket(response: any): Observable<Ticket> {
    return forkJoin({
      event: this.eventService.getOne(response.event_id),
      seat: this.seatService.getOne(response.seat_id),
      user: this.userService.getOne(response.user_id),
    }).pipe(
      map(({event, seat, user}) => {
        delete response.event_id;
        delete response.seat_id;
        delete response.user_id;
        return this.toCamelCase({...response, event, seat, user});
      }),
      map(ticket => ({...ticket, createdAt: new Date(ticket.createdAt)}))
    );
  }
}
