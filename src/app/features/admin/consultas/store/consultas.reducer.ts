import { createReducer, on } from '@ngrx/store';
import { ConsultasState, initialConsultasState } from './consultas.state';
import {
  loadConsultas,
  loadConsultasFailure,
  loadConsultasSuccess,
} from './consultas.actions';
import {
  errorStatus,
  loadingStatus,
  successStatus,
} from '../../../../shared/helpers/async-status.helper';

export const consultasReducer = createReducer(
  initialConsultasState,

  on(
    loadConsultas,
    (state): ConsultasState => ({
      ...state,
      list: {
        ...state.list,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    loadConsultasSuccess,
    (state, { consultas }): ConsultasState => ({
      ...state,
      list: {
        consultas,
        status: successStatus(),
      },
    }),
  ),

  on(
    loadConsultasFailure,
    (state): ConsultasState => ({
      ...state,
      list: {
        ...state.list,
        status: errorStatus(),
      },
    }),
  ),
);
