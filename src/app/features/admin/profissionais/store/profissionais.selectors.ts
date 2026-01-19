import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfissionaisState } from './profissionais.state';
import { selectUnidades, selectUnidadesEntities } from '../../unidades/store/unidades.selectors';
import { ProfissionalComUnidade } from '../models/ProfisisonalComUnidade.model';

export const selectProfissionaisState = createFeatureSelector<ProfissionaisState>('profissionais');

// LIST
export const selectProfissionais = createSelector(
  selectProfissionaisState,
  (s) => s.list.profissionais,
);

export const selectProfissionaisLoading = createSelector(
  selectProfissionaisState,
  (s) => s.list.status.loading,
);

export const selectProfissionaisError = createSelector(
  selectProfissionaisState,
  (s) => s.list.status.error,
);

// SELECTED
export const selectProfissional = createSelector(
  selectProfissionaisState,
  (s) => s.selected.profissional,
);

export const selectProfissionalLoading = createSelector(
  selectProfissionaisState,
  (s) => s.selected.status.loading,
);

export const selectProfissionalError = createSelector(
  selectProfissionaisState,
  (s) => s.selected.status.error,
);

// EDIT
export const selectEditProfissionalLoading = createSelector(
  selectProfissionaisState,
  (s) => s.update.status.loading,
);

export const selectEditProfissionalError = createSelector(
  selectProfissionaisState,
  (s) => s.update.status.error,
);

export const selectProfissionaisComUnidade = createSelector(
  selectProfissionais,
  selectUnidadesEntities,
  (profissionais, unidades) =>
    profissionais.map((p) => ({
      ...p,
      unidadeNome: unidades[p.unidadeId]?.nome ?? '—',
    })),
);

export const selectProfissionalComUnidade = createSelector(
  selectProfissional,
  selectUnidadesEntities,
  (profissional, unidades): ProfissionalComUnidade | null => {
    if (!profissional) return null;

    return {
      ...profissional,
      unidadeNome: unidades[profissional.unidadeId]?.nome ?? '—',
    };
  },
);
export const selectUnidadesForOptions = createSelector(selectUnidades, (unidades) =>
  unidades.map((u) => ({
    id: u.id,
    nome: u.nome,
  })),
);
