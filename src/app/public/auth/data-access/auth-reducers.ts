import { AuthState } from '../models/auth-state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth-actions';
import { Auth } from '../models/auth';

const initialState: AuthState = {
  auth: undefined,
  firstLogin: false,
  loading: false,
  error: undefined
};

const authFeature = createFeature({
  name: 'Auth',
  reducer: createReducer(initialState,
    on(authActions.login, state => ({...state, loading: true})),
    on(authActions.loginSuccess, (state, {auth}) => ({...state, loading: false, auth, firstLogin: false})),
    on(authActions.loginViaGoogle, state => ({...state, loading: true})),
    on(authActions.loginViaGoogleSuccess, (state, {auth}) => ({...state, loading: false, auth, firstLogin: false})),
    on(authActions.register, state => ({...state, loading: true})),
    on(authActions.registerSuccess, (state, {auth}) => ({...state, loading: false, auth, firstLogin: true})),
    on(authActions.regenerateAuthToken, (state) => ({...state, loading: true})),
    on(authActions.regenerateAuthTokenSuccess, (state, {auth}) => ({...state, loading: false, auth})),
    on(authActions.uploadAuthImage, (state) => ({...state, loading: true})),
    on(authActions.uploadAuthImageSuccess, (state, {firebaseRes}) => ({...state, auth: {...state.auth, image: firebaseRes.link} as Auth})),
    on(authActions.clear, (state) => ({...state, auth: undefined, firstLogin: false, loading: false, error: undefined})),
    on(authActions.loadError, (state, {error}) => ({...state, error}))
  )
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAuth,
  selectFirstLogin,
  selectLoading,
  selectError,
} = authFeature;
