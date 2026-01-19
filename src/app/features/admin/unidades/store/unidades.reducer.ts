import { createReducer, on } from '@ngrx/store';
import {
  errorStatus,
  loadingStatus,
  successStatus,
} from '../../../../shared/helpers/async-status.helper';
import { initialUnidadesState, UnidadesState } from './unidades.state';
import * as actions from './unidades.actions';

export const unidadesReducer = createReducer(
  initialUnidadesState,

  on(
    actions.loadUnidades,
    (state): UnidadesState => ({
      ...state,
      list: {
        ...state.list,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    actions.loadUnidadesSuccess,
    (state, { unidades }): UnidadesState => ({
      ...state,
      list: {
        unidades,
        status: successStatus(),
      },
    }),
  ),

  on(
    actions.loadUnidadesFailure,
    (state): UnidadesState => ({
      ...state,
      list: {
        ...state.list,
        status: errorStatus(),
      },
    }),
  ),
);
