import { successStatus } from '../../../../shared/helpers/async-status.helper';
import { AsyncStatus } from '../../../../shared/interfaces/AsyncStatus.model';
import { ConsultaCardItem } from '../models/ConsultaCardItem.model';
import { DataHoraConsulta } from '../models/DataHoraConsulta.model';

export interface ConsultasState {
  list: {
    consultas: ConsultaCardItem[];
    status: AsyncStatus;
  };
  create: {
    status: AsyncStatus;
  };
  reagendar: {
    consulta: DataHoraConsulta | null;
    status: AsyncStatus;
  };
}

export const initialConsultasState: ConsultasState = {
  list: {
    consultas: [],
    status: successStatus(),
  },
  create: {
    status: successStatus(),
  },
  reagendar: {
    consulta: null,
    status: successStatus(),
  },
};
