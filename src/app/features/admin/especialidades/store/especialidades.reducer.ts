import { createReducer, on } from '@ngrx/store';
import * as actions from './especialidades.actions';
import {
  EspecialidadesState,
  initialEspecialidadesState,
} from './especialidades.state';
import {
  errorStatus,
  loadingStatus,
  successStatus,
} from '../../../../shared/helpers/async-status.helper';

export const especialidadesReducer = createReducer(
  initialEspecialidadesState,

  on(
    actions.loadEspecialidades,
    (state): EspecialidadesState => ({
      ...state,
      list: {
        ...state.list,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    actions.loadEspecialidadesSuccess,
    (state, { especialidades }): EspecialidadesState => ({
      ...state,
      list: {
        especialidades,
        status: successStatus(),
      },
    }),
  ),

  on(
    actions.loadEspecialidadesFailure,
    (state): EspecialidadesState => ({
      ...state,
      list: {
        ...state.list,
        status: errorStatus(),
      },
    }),
  ),
);
