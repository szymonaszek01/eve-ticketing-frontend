import { createFeature, createReducer, on } from '@ngrx/store';
import { eventActions } from './event-actions';
import { EventState } from './event-state';

const initialState: EventState = {
  list: [],
  createdList: [],
  lastAdded: undefined,
  lastUpdated: undefined,
  lastRemoved: undefined,
  page: 0,
  createdPage: 0,
  size: 0,
  createdSize: 0,
  totalPages: 0,
  createdTotalPages: 0,
  totalElements: 0,
  createdTotalElements: 0,
  last: true,
  createdLast: true,
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
    on(eventActions.loadCreated, state => ({...state, loading: true})),
    on(eventActions.loadCreatedSuccess, (state, {page}) => ({
      ...state,
      createdList: page.content,
      createdPage: page.number,
      createdSize: page.size,
      createdTotalPages: page.totalPages,
      createdTotalElements: page.totalElements,
      createdLast: page.last,
      loading: false
    })),
    on(eventActions.add, state => ({...state, loading: true})),
    on(eventActions.addSuccess, (state, {event}) => ({...state, lastAdded: event, loading: false})),
    on(eventActions.update, state => ({...state, loading: true})),
    on(eventActions.updateSuccess, (state, {event}) => ({...state, lastUpdated: event, loading: false})),
    on(eventActions.remove, state => ({...state, loading: true})),
    on(eventActions.removeSuccess, (state, {event}) => ({...state, lastRemoved: event, loading: false})),
    on(eventActions.clear, state => ({
      ...state,
      list: [],
      createdList: [],
      lastAdded: undefined,
      lastUpdated: undefined,
      lastRemoved: undefined,
      page: 0,
      createdPage: 0,
      size: 0,
      createdSize: 0,
      totalPages: 0,
      createdTotalPages: 0,
      totalElements: 0,
      createdTotalElements: 0,
      last: true,
      createdLast: true
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
  selectCreatedList,
  selectLastAdded,
  selectLastUpdated,
  selectLastRemoved,
  selectPage,
  selectCreatedPage,
  selectSize,
  selectCreatedSize,
  selectTotalPages,
  selectCreatedTotalPages,
  selectTotalElements,
  selectCreatedTotalElements,
  selectLast,
  selectCreatedLast,
  selectLoading,
  selectError,
  selectFilter,
  selectSort
} = eventFeature;
