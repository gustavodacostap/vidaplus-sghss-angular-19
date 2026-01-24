import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EspecialidadesState } from './especialidades.state';
import { Especialidade } from '../models/Especialidade.model';

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

export const selectEditEspecialidadeLoading = createSelector(
  selectEspecialidadesState,
  (s) => s.update.status.loading,
);

export const selectEditEspecialidadeError = createSelector(
  selectEspecialidadesState,
  (s) => s.update.status.error,
);

export const selectCreateEspecialidadeLoading = createSelector(
  selectEspecialidadesState,
  (s) => s.create.status.loading,
);

export const selectCreateEspecialidadeError = createSelector(
  selectEspecialidadesState,
  (s) => s.create.status.error,
);

export const selectEspecialidadesEntities = createSelector(
  selectEspecialidades,
  (especialidades) =>
    especialidades.reduce<Record<number, Especialidade>>(
      (acc, especialidade) => {
        acc[especialidade.id] = especialidade;
        return acc;
      },
      {},
    ),
);

export const selectEspecialidadesForOptions = createSelector(
  selectEspecialidades,
  (especialidades) =>
    especialidades.map((u) => ({
      id: u.id,
      nome: u.nome,
    })),
);
