import { createReducer, on } from '@ngrx/store';
import { initialProfissionaisState } from './profissionais.state';
import {
  loadProfissionalById,
  loadProfissionalByIdFailure,
  loadProfissionalByIdSuccess,
  loadProfissionais,
  loadProfissionaisFailure,
  loadProfissionaisSuccess,
  updateProfissional,
  updateProfissionalFailure,
  updateProfissionalSuccess,
} from './profissionais.actions';
import { ProfissionaisState } from './profissionais.state';
import {
  errorStatus,
  loadingStatus,
  successStatus,
} from '../../../../shared/helpers/async-status.helper';

export const profissionaisReducer = createReducer(
  initialProfissionaisState,

  on(
    loadProfissionais,
    (state): ProfissionaisState => ({
      ...state,
      list: {
        ...state.list,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    loadProfissionaisSuccess,
    (state, { profissionais }): ProfissionaisState => ({
      ...state,
      list: {
        profissionais,
        status: successStatus(),
      },
    }),
  ),

  on(
    loadProfissionaisFailure,
    (state): ProfissionaisState => ({
      ...state,
      list: {
        ...state.list,
        status: errorStatus(),
      },
    }),
  ),
  on(
    loadProfissionalById,
    (state): ProfissionaisState => ({
      ...state,
      selected: {
        ...state.selected,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    loadProfissionalByIdSuccess,
    (state, { profissional }): ProfissionaisState => ({
      ...state,
      selected: {
        profissional,
        status: successStatus(),
      },
    }),
  ),

  on(
    loadProfissionalByIdFailure,
    (state): ProfissionaisState => ({
      ...state,
      selected: {
        ...state.selected,
        status: errorStatus(),
      },
    }),
  ),
  on(
    updateProfissional,
    (state): ProfissionaisState => ({
      ...state,
      update: {
        status: loadingStatus(),
      },
    }),
  ),

  on(
    updateProfissionalSuccess,
    (state): ProfissionaisState => ({
      ...state,
      update: {
        status: successStatus(),
      },
    }),
  ),

  on(
    updateProfissionalFailure,
    (state): ProfissionaisState => ({
      ...state,
      update: {
        status: errorStatus(),
      },
    }),
  ),
);
