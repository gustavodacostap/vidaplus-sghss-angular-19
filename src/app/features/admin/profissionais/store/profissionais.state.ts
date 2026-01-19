import { successStatus } from '../../../../shared/helpers/async-status.helper';
import { AsyncStatus } from '../../../../shared/interfaces/AsyncStatus.model';
import { Profissional } from '../models/Profissional.model';
import { ProfissionalListItem } from '../models/ProfissionalListItem.model';

export interface ProfissionaisState {
  list: {
    profissionais: ProfissionalListItem[];
    status: AsyncStatus;
  };
  selected: {
    profissional: Profissional | null;
    status: AsyncStatus;
  };
  update: {
    status: AsyncStatus;
  };
}

export const initialProfissionaisState: ProfissionaisState = {
  list: {
    profissionais: [],
    status: successStatus(),
  },
  selected: {
    profissional: null,
    status: successStatus(),
  },
  update: {
    status: successStatus(),
  },
};
