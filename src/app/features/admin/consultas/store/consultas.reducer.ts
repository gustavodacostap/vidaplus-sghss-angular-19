import { createReducer, on } from '@ngrx/store';
import { ConsultasState, initialConsultasState } from './consultas.state';
import * as actions from './consultas.actions';
import {
  errorStatus,
  loadingStatus,
  successStatus,
} from '../../../../shared/helpers/async-status.helper';

export const consultasReducer = createReducer(
  initialConsultasState,

  on(
    actions.loadConsultas,
    (state): ConsultasState => ({
      ...state,
      list: {
        ...state.list,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    actions.loadConsultasSuccess,
    (state, { consultas }): ConsultasState => ({
      ...state,
      list: {
        consultas,
        status: successStatus(),
      },
    }),
  ),

  on(
    actions.loadConsultasFailure,
    (state): ConsultasState => ({
      ...state,
      list: {
        ...state.list,
        status: errorStatus(),
      },
    }),
  ),

  on(
    actions.createConsulta,
    (state): ConsultasState => ({
      ...state,
      create: {
        status: loadingStatus(),
      },
    }),
  ),

  on(
    actions.createConsultaSuccess,
    (state): ConsultasState => ({
      ...state,
      create: {
        status: successStatus(),
      },
    }),
  ),

  on(
    actions.createConsultaFailure,
    (state): ConsultasState => ({
      ...state,
      create: {
        status: errorStatus(),
      },
    }),
  ),
);
