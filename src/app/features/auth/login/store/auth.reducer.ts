import { createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import * as authActions from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state): AuthState => ({ ...state, loading: true })),
  on(
    authActions.loginSuccess,
    (state): AuthState => ({
      ...state,
      loading: false,
    }),
  ),
  on(
    authActions.loginFailure,
    (state): AuthState => ({
      ...state,
      loading: false,
    }),
  ),
  on(authActions.logout, (): AuthState => initialState),
);
