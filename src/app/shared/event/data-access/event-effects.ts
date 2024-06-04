import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { EventService } from './event-service';
import { eventActions } from './event-actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EventEffects {

  loadEventList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventActions.load),
      mergeMap(action =>
        this.eventService.getAll(action.page, action.size, action.filter).pipe(
          map(page => eventActions.loadSuccess({page})),
          catchError(error => of(eventActions.loadError({error})))
        )
      )
    ), {functional: true}
  );

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventActions.add),
      mergeMap(action =>
        this.eventService.create(action.event).pipe(
          map(event => eventActions.addSuccess({event})),
          catchError(error => of(eventActions.loadError(error)))
        )
      )
    ), {functional: true}
  );

  replaceEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventActions.replace),
      mergeMap(action =>
        this.eventService.update(action.event).pipe(
          map(event => eventActions.replaceSuccess({event})),
          catchError(error => of(eventActions.loadError(error)))
        )
      )
    ), {functional: true}
  );

  removeEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventActions.remove),
      mergeMap(action =>
        this.eventService.delete(action.event.id).pipe(
          map(() => eventActions.removeSuccess({event: action.event})),
          catchError(error => of(eventActions.loadError(error)))
        )
      )
    ), {functional: true}
  );

  clearEventList$ = createEffect(() => this.actions$.pipe(ofType(eventActions.clear)), {functional: true});

  constructor(private actions$: Actions, private eventService: EventService) {
  }
}
