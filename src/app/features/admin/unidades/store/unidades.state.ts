import { successStatus } from '../../../../shared/helpers/async-status.helper';
import { AsyncStatus } from '../../../../shared/interfaces/AsyncStatus.model';
import { Unidade } from '../models/Unidade.model';

export interface UnidadesState {
  list: {
    unidades: Unidade[];
    status: AsyncStatus;
  };
  update: {
    unidade: Unidade | null;
    status: AsyncStatus;
  };
}

export const initialUnidadesState: UnidadesState = {
  list: {
    unidades: [],
    status: successStatus(),
  },
  update: {
    unidade: null,
    status: successStatus(),
  },
};
