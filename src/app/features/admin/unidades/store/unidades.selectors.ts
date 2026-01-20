import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnidadesState } from './unidades.state';
import { Unidade } from '../models/Unidade.model';

export const selectUnidadesState =
  createFeatureSelector<UnidadesState>('unidades');

// LIST
export const selectUnidades = createSelector(
  selectUnidadesState,
  (s) => s.list.unidades,
);

export const selectUnidadesLoading = createSelector(
  selectUnidadesState,
  (s) => s.list.status.loading,
);

export const selectUnidadesError = createSelector(
  selectUnidadesState,
  (s) => s.list.status.error,
);

export const selectUnidadesEntities = createSelector(
  selectUnidades,
  (unidades) =>
    unidades.reduce<Record<number, Unidade>>((acc, unidade) => {
      acc[unidade.id] = unidade;
      return acc;
    }, {}),
);

export const selectNomeUnidades = createSelector(
  selectUnidades,
  (unidades): string[] => unidades.map((u) => u.nome),
);

export const selectUnidadesForOptions = createSelector(
  selectUnidades,
  (unidades) =>
    unidades.map((u) => ({
      id: u.id,
      nome: u.nome,
    })),
);
