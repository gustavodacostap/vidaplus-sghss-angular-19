import { TipoConsulta } from './Consulta.model';

export interface ConsultaCardItem {
  consultaId: number;
  tipo: TipoConsulta;
  unidadeId?: number;
  unidadeNome?: string;
  profissional: string;
  paciente: string;
  especialidade: string;
  dataHoraConsulta: string;
}
