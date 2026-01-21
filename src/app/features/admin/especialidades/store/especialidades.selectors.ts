import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EspecialidadesState } from './especialidades.state';

export const selectEspecialidadesState =
  createFeatureSelector<EspecialidadesState>('especialidades');

// CARDS
export const selectEspecialidades = createSelector(
  selectEspecialidadesState,
  (s) => s.list.especialidades,
);

export const selectEspecialidadesLoading = createSelector(
  selectEspecialidadesState,
  (s) => s.list.status.loading,
);

export const selectEspecialidadesError = createSelector(
  selectEspecialidadesState,
  (s) => s.list.status.error,
);
