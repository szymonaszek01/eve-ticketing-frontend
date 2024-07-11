import { BaseState } from '../../../shared/shared/models/base-state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Ticket } from '../models/ticket';
import { TicketFilter } from '../models/ticket-filter';
import { ticketActions } from './ticket-actions';

const initialState: BaseState<Ticket, TicketFilter> = {
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

const ticketFeature = createFeature({
  name: 'Ticket',
  reducer: createReducer(initialState,
    on(ticketActions.load, state => ({...state, loading: true})),
    on(ticketActions.loadSuccess, (state, {page}) => ({
      ...state,
      list: page.content,
      page: page.number,
      size: page.size,
      totalPages: page.totalPages,
      totalElements: page.totalElements,
      last: page.last,
      loading: false
    })),
    on(ticketActions.add, state => ({...state, loading: true})),
    on(ticketActions.addSuccess, (state, {ticket}) => ({...state, lastAdded: ticket, loading: false})),
    on(ticketActions.update, state => ({...state, loading: true})),
    on(ticketActions.updateSuccess, (state, {ticket}) => ({...state, lastUpdated: ticket, loading: false})),
    on(ticketActions.remove, state => ({...state, loading: true})),
    on(ticketActions.removeSuccess, (state, {ticket}) => ({...state, lastRemoved: ticket, loading: false})),
    on(ticketActions.clear, state => ({
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
    on(ticketActions.loadError, (state, {error}) => ({...state, error, loading: false})),
    on(ticketActions.setFilter, (state, {filter}) => ({...state, filter})),
    on(ticketActions.setSort, (state, {sort}) => ({...state, sort})),
  )
});

export const {
  name: ticketFeatureKey,
  reducer: ticketReducer,
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
} = ticketFeature;