import { successStatus } from '../../../../shared/helpers/async-status.helper';
import { AsyncStatus } from '../../../../shared/interfaces/AsyncStatus.model';
import { Especialidade } from '../models/Especialidade.model';

export interface EspecialidadesState {
  list: {
    especialidades: Especialidade[];
    status: AsyncStatus;
  };
  create: {
    status: AsyncStatus;
  };
  update: {
    status: AsyncStatus;
  };
}

export const initialEspecialidadesState: EspecialidadesState = {
  list: {
    especialidades: [],
    status: successStatus(),
  },
  create: {
    status: successStatus(),
  },
  update: {
    status: successStatus(),
  },
};
