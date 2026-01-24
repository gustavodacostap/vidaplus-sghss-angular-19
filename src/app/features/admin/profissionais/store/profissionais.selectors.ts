import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfissionaisState } from './profissionais.state';
import { selectUnidadesEntities } from '../../unidades/store/unidades.selectors';
import { selectEspecialidadesEntities } from '../../especialidades/store/especialidades.selectors';
import { ProfissionalComNomes } from '../models/ProfissionalComNomes.model';
import { ProfissionalListItem } from '../models/ProfissionalListItem.model';

export const selectProfissionaisState =
  createFeatureSelector<ProfissionaisState>('profissionais');

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

export const selectProfissionalComNomes = createSelector(
  selectProfissional,
  selectEspecialidadesEntities,
  selectUnidadesEntities,
  (profissional, especialidades, unidades): ProfissionalComNomes | null => {
    if (!profissional) return null;

    const especialidade = especialidades[profissional.especialidadeId];
    const unidade = unidades[profissional.unidadeId];

    return {
      ...profissional,
      especialidadeNome: especialidade?.nome ?? '',
      unidadeNome: unidade?.nome ?? '',
    };
  },
);

export const selectProfissionaisEntities = createSelector(
  selectProfissionais,
  (profissionais) =>
    profissionais.reduce<Record<number, ProfissionalListItem>>(
      (acc, paciente) => {
        acc[paciente.id] = paciente;
        return acc;
      },
      {},
    ),
);

export const selectProfissionaisForOptions = createSelector(
  selectProfissionais,
  (profissionais) =>
    profissionais.map((u) => ({
      id: u.id,
      nome: u.nome,
    })),
);
