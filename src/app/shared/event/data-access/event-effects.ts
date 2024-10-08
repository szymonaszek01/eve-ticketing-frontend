import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { EventService } from './event-service';
import { eventActions } from './event-actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export const loadEventListEffect = createEffect(
  (actions$ = inject(Actions),
   eventService = inject(EventService)) => {
    return actions$.pipe(
      ofType(eventActions.load),
      mergeMap(action =>
        eventService.getAll(action.page, action.size, action.filter, action.sort).pipe(
          map(page => eventActions.loadSuccess({page})),
          catchError(e => of(eventActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const loadCreatedListEffect = createEffect(
  (actions$ = inject(Actions),
   eventService = inject(EventService)) => {
    return actions$.pipe(
      ofType(eventActions.loadCreated),
      mergeMap(action =>
        eventService.getAll(action.page, action.size, action.filter, action.sort).pipe(
          map(page => eventActions.loadCreatedSuccess({page})),
          catchError(e => of(eventActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const addEventEffect = createEffect(
  (actions$ = inject(Actions),
   eventService = inject(EventService)) => {
    return actions$.pipe(
      ofType(eventActions.add),
      mergeMap(action =>
        eventService.create(action.event).pipe(
          map(event => eventActions.addSuccess({event})),
          catchError(e => of(eventActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const updateEventEffect = createEffect(
  (actions$ = inject(Actions),
   eventService = inject(EventService)) => {
    return actions$.pipe(
      ofType(eventActions.update),
      mergeMap(action =>
        eventService.update(action.event).pipe(
          map(event => eventActions.updateSuccess({event})),
          catchError(e => of(eventActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const removeEventEffect = createEffect(
  (actions$ = inject(Actions),
   eventService = inject(EventService)) => {
    return actions$.pipe(
      ofType(eventActions.remove),
      mergeMap(action =>
        eventService.delete(action.event.id).pipe(
          map(() => eventActions.removeSuccess({event: action.event})),
          catchError(e => of(eventActions.loadError({error: e.error})))
        )
      )
    );
  }, {functional: true}
);

export const clearEventListEffect = createEffect(
  (actions$ = inject(Actions),
   eventService = inject(EventService)) => {
    return actions$.pipe(
      ofType(eventActions.clear),
      tap(() => console.log('[Event] state was cleared'))
    );
  }, {functional: true}
);
