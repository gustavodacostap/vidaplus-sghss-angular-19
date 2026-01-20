import { successStatus } from '../../../../shared/helpers/async-status.helper';
import { AsyncStatus } from '../../../../shared/interfaces/AsyncStatus.model';
import { ConsultaCardItem } from '../models/ConsultaCardItem.model';
import { DataHoraConsulta } from '../models/DataHoraConsulta.model';

export interface ConsultasState {
  list: {
    consultas: ConsultaCardItem[];
    status: AsyncStatus;
  };
  criar: {
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
  criar: {
    status: successStatus(),
  },
  reagendar: {
    consulta: null,
    status: successStatus(),
  },
};
