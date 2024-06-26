import { createFeature, createReducer, on } from '@ngrx/store';
import { BaseState } from '../../shared/models/base-state';
import { eventActions } from './event-actions';
import { Event } from '../models/event';
import { EventFilter } from '../models/event-filter';

const initialState: BaseState<Event, EventFilter> = {
  list: [],
  lastAdded: undefined,
  lastUpdated: undefined,
  lastRemoved: undefined,
  page: 0,
  size: 0,
  totalPages: 0,
  totalElements: 0,
  last: true,
  loading: false,
  error: undefined,
  filter: undefined,
  sort: undefined
};

const eventFeature = createFeature({
  name: 'Event',
  reducer: createReducer(initialState,
    on(eventActions.load, state => ({...state, loading: true})),
    on(eventActions.loadSuccess, (state, {page}) => ({
      ...state,
      list: page.content,
      page: page.number,
      size: page.size,
      totalPages: page.totalPages,
      totalElements: page.totalElements,
      last: page.last,
      loading: false
    })),
    on(eventActions.add, state => ({...state, loading: true})),
    on(eventActions.addSuccess, (state, {event}) => ({...state, lastAdded: event, loading: false})),
    on(eventActions.update, state => ({...state, loading: true})),
    on(eventActions.updateSuccess, (state, {event}) => ({...state, lastUpdated: event, loading: false})),
    on(eventActions.remove, state => ({...state, loading: true})),
    on(eventActions.removeSuccess, (state, {event}) => ({...state, lastRemoved: event, loading: false})),
    on(eventActions.clear, state => ({
      ...state, list: [],
      lastAdded: undefined,
      lastUpdated: undefined,
      lastRemoved: undefined,
      page: 0,
      size: 0,
      totalPages: 0,
      totalElements: 0,
      last: true
    })),
    on(eventActions.loadError, (state, {error}) => ({...state, error, loading: false})),
    on(eventActions.setFilter, (state, {filter}) => ({...state, filter})),
    on(eventActions.setSort, (state, {sort}) => ({...state, sort})),
  )
});

export const {
  name: eventFeatureKey,
  reducer: eventReducer,
  selectList,
  selectLastAdded,
  selectLastUpdated,
  selectLastRemoved,
  selectPage,
  selectSize,
  selectTotalPages,
  selectTotalElements,
  selectLast,
  selectLoading,
  selectError,
  selectFilter,
  selectSort
} = eventFeature;
