import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConsultasState } from './consultas.state';

export const selectConsultasState =
  createFeatureSelector<ConsultasState>('consultas');

// CARDS
export const selectConsultas = createSelector(
  selectConsultasState,
  (s) => s.list.consultas,
);

export const selectConsultasLoading = createSelector(
  selectConsultasState,
  (s) => s.list.status.loading,
);

export const selectConsultasError = createSelector(
  selectConsultasState,
  (s) => s.list.status.error,
);
