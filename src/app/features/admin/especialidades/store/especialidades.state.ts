import { successStatus } from '../../../../shared/helpers/async-status.helper';
import { AsyncStatus } from '../../../../shared/interfaces/AsyncStatus.model';
import { Especialidade } from '../models/Especialidade.model';

export interface EspecialidadesState {
  list: {
    especialidades: Especialidade[];
    status: AsyncStatus;
  };
  criar: {
    status: AsyncStatus;
  };
  edit: {
    especialidade: Especialidade | null;
    status: AsyncStatus;
  };
}

export const initialEspecialidadesState: EspecialidadesState = {
  list: {
    especialidades: [],
    status: successStatus(),
  },
  criar: {
    status: successStatus(),
  },
  edit: {
    especialidade: null,
    status: successStatus(),
  },
};
