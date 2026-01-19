import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

// NOTIFICATIONS
export const selectLoading = createSelector(selectAuthState, (state) => state.loading);
