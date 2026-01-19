import { createReducer, on } from '@ngrx/store';
import { initialPacientesState } from './pacientes.state';
import {
  loadPacienteById,
  loadPacienteByIdFailure,
  loadPacienteByIdSuccess,
  loadPacientes,
  loadPacientesFailure,
  loadPacientesSuccess,
  updatePaciente,
  updatePacienteFailure,
  updatePacienteSuccess,
} from './pacientes.actions';
import { PacientesState } from './pacientes.state';
import {
  errorStatus,
  loadingStatus,
  successStatus,
} from '../../../../shared/helpers/async-status.helper';

export const pacientesReducer = createReducer(
  initialPacientesState,

  on(
    loadPacientes,
    (state): PacientesState => ({
      ...state,
      list: {
        ...state.list,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    loadPacientesSuccess,
    (state, { pacientes }): PacientesState => ({
      ...state,
      list: {
        pacientes,
        status: successStatus(),
      },
    }),
  ),

  on(
    loadPacientesFailure,
    (state): PacientesState => ({
      ...state,
      list: {
        ...state.list,
        status: errorStatus(),
      },
    }),
  ),
  on(
    loadPacienteById,
    (state): PacientesState => ({
      ...state,
      selected: {
        ...state.selected,
        status: loadingStatus(),
      },
    }),
  ),

  on(
    loadPacienteByIdSuccess,
    (state, { paciente }): PacientesState => ({
      ...state,
      selected: {
        paciente,
        status: successStatus(),
      },
    }),
  ),

  on(
    loadPacienteByIdFailure,
    (state): PacientesState => ({
      ...state,
      selected: {
        ...state.selected,
        status: errorStatus(),
      },
    }),
  ),
  on(
    updatePaciente,
    (state): PacientesState => ({
      ...state,
      update: {
        status: loadingStatus(),
      },
    }),
  ),

  on(
    updatePacienteSuccess,
    (state): PacientesState => ({
      ...state,
      update: {
        status: successStatus(),
      },
    }),
  ),

  on(
    updatePacienteFailure,
    (state): PacientesState => ({
      ...state,
      update: {
        status: errorStatus(),
      },
    }),
  ),
);
