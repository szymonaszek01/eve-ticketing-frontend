import { BaseState } from '../../../shared/shared/models/base-state';
import { User } from '../../../shared/shared/models/user';
import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './user-actions';
import { UserFilter } from '../models/user-filter';

const initialState: BaseState<User, UserFilter> = {
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

const userFeature = createFeature({
  name: 'User',
  reducer: createReducer(initialState,
    on(userActions.load, state => ({...state, loading: true})),
    on(userActions.loadSuccess, (state, {page}) => ({
      ...state,
      list: page.content,
      page: page.number,
      size: page.size,
      totalPages: page.totalPages,
      totalElements: page.totalElements,
      last: page.last,
      loading: false
    })),
    on(userActions.update, state => ({...state, loading: true})),
    on(userActions.updateSuccess, (state, {user}) => ({...state, lastUpdated: user, loading: false})),
    on(userActions.remove, state => ({...state, loading: true})),
    on(userActions.removeSuccess, (state, {user}) => ({...state, lastRemoved: user, loading: false})),
    on(userActions.clear, state => ({
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
    on(userActions.loadError, (state, {error}) => ({...state, error, loading: false})),
    on(userActions.setFilter, (state, {filter}) => ({...state, filter})),
    on(userActions.setSort, (state, {sort}) => ({...state, sort})),
  )
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectList,
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
} = userFeature;
