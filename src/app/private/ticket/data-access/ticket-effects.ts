import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketService } from './ticket-service';
import { ticketActions } from './ticket-actions';

export const loadTicketListEffect = createEffect(
  (actions$ = inject(Actions),
   ticketService = inject(TicketService)) => {
    return actions$.pipe(
      ofType(ticketActions.load),
      mergeMap(action =>
        ticketService.getAll(action.page, action.size, action.filter, action.sort).pipe(
          map(page => ticketActions.loadSuccess({page})),
          catchError(e => of(ticketActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const loadReservedTicketListEffect = createEffect(
  (actions$ = inject(Actions),
   ticketService = inject(TicketService)) => {
    return actions$.pipe(
      ofType(ticketActions.loadReserved),
      mergeMap(action =>
        ticketService.getAll(action.page, action.size, action.filter, action.sort).pipe(
          map(page => ticketActions.loadReservedSuccess({page})),
          catchError(e => of(ticketActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const addTicketEffect = createEffect(
  (actions$ = inject(Actions),
   ticketService = inject(TicketService)) => {
    return actions$.pipe(
      ofType(ticketActions.add),
      mergeMap(action =>
        ticketService.create(action.ticketReq).pipe(
          map(ticket => ticketActions.addSuccess({ticket})),
          catchError(e => of(ticketActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const updateTicketEffect = createEffect(
  (actions$ = inject(Actions),
   ticketService = inject(TicketService)) => {
    return actions$.pipe(
      ofType(ticketActions.update),
      mergeMap(action =>
        ticketService.update(action.ticket).pipe(
          map(ticket => ticketActions.updateSuccess({ticket})),
          catchError(e => of(ticketActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const removeTicketEffect = createEffect(
  (actions$ = inject(Actions),
   ticketService = inject(TicketService)) => {
    return actions$.pipe(
      ofType(ticketActions.remove),
      mergeMap(action =>
        ticketService.delete(action.ticket.id).pipe(
          map(() => ticketActions.removeSuccess({ticket: action.ticket})),
          catchError(e => of(ticketActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const clearTicketListEffect = createEffect(
  (actions$ = inject(Actions),
   ticketService = inject(TicketService)) => {
    return actions$.pipe(
      ofType(ticketActions.clear),
      tap(() => console.log('[Ticket] state was cleared'))
    );
  }, {functional: true}
);
