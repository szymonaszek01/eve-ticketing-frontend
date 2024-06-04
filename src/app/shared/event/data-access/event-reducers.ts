import { createFeature, createReducer, on } from '@ngrx/store';
import { State } from '../../shared/models/state';
import { eventActions } from './event-actions';
import { Event } from '../models/event';

const initialState: State<Event> = {
  list: [],
  lastAdded: undefined,
  lastUpdated: undefined,
  lastRemoved: undefined,
  page: 0,
  size: 10,
  totalPages: 0,
  last: true,
  loading: false,
  error: undefined
};

export const eventFeature = createFeature({
  name: 'Event',
  reducer: createReducer(initialState,
    on(eventActions.load, state => ({...state, loading: true})),
    on(eventActions.loadSuccess, (state, {page}) => ({
      ...state,
      list: [...state.list, ...page.content],
      page: page.number,
      totalPages: page.totalPages,
      last: page.last,
      loading: false
    })),
    on(eventActions.add, state => ({...state, loading: true})),
    on(eventActions.addSuccess, (state, {event}) => ({...state, lastAdded: event, loading: false})),
    on(eventActions.replace, state => ({...state, loading: true})),
    on(eventActions.replaceSuccess, (state, {event}) => ({...state, lastUpdated: event, loading: false})),
    on(eventActions.remove, state => ({...state, loading: true})),
    on(eventActions.removeSuccess, (state, {event}) => ({...state, lastRemoved: event, loading: false})),
    on(eventActions.clear, state => ({
      ...state, list: [],
      lastAdded: undefined,
      lastUpdated: undefined,
      lastRemoved: undefined,
      page: 0,
      totalPages: 0,
      last: true
    })),
    on(eventActions.loadError, (state, {error}) => ({...state, error, loading: false}))
  )
});
