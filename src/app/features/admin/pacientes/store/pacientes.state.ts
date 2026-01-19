import { AsyncStatus } from '../../../../shared/interfaces/AsyncStatus.model';
import { Paciente } from '../models/Paciente.model';
import { PacienteListItem } from '../models/PacienteListItem.model';

export interface PacientesState {
  list: {
    pacientes: PacienteListItem[];
    status: AsyncStatus;
  };
  selected: {
    paciente: Paciente | null;
    status: AsyncStatus;
  };
  update: {
    status: AsyncStatus;
  };
}

export const initialPacientesState: PacientesState = {
  list: {
    pacientes: [],
    status: {
      loading: false,
      error: false,
    },
  },
  selected: {
    paciente: null,
    status: {
      loading: false,
      error: false,
    },
  },
  update: {
    status: {
      loading: false,
      error: false,
    },
  },
};
