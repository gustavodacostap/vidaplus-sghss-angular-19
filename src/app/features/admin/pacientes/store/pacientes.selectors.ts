import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PacientesState } from './pacientes.state';
import { PacienteListItem } from '../models/PacienteListItem.model';

export const selectPacientesState =
  createFeatureSelector<PacientesState>('pacientes');

// LIST
export const selectPacientes = createSelector(
  selectPacientesState,
  (s) => s.list.pacientes,
);

export const selectPacientesLoading = createSelector(
  selectPacientesState,
  (s) => s.list.status.loading,
);

export const selectPacientesError = createSelector(
  selectPacientesState,
  (s) => s.list.status.error,
);

// SELECTED
export const selectPaciente = createSelector(
  selectPacientesState,
  (s) => s.selected.paciente,
);

export const selectPacienteLoading = createSelector(
  selectPacientesState,
  (s) => s.selected.status.loading,
);

export const selectPacienteError = createSelector(
  selectPacientesState,
  (s) => s.selected.status.error,
);

export const selectEditPacienteLoading = createSelector(
  selectPacientesState,
  (s) => s.update.status.loading,
);

export const selectEditPacienteError = createSelector(
  selectPacientesState,
  (s) => s.update.status.error,
);

export const selectPacientesEntities = createSelector(
  selectPacientes,
  (pacientes) =>
    pacientes.reduce<Record<number, PacienteListItem>>((acc, paciente) => {
      acc[paciente.id] = paciente;
      return acc;
    }, {}),
);

export const selectPacientesForOptions = createSelector(
  selectPacientes,
  (pacientes) =>
    pacientes.map((u) => ({
      id: u.id,
      nome: u.nome,
    })),
);
