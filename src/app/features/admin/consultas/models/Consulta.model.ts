export type TipoConsulta = 'PRESENCIAL' | 'TELEMEDICINA';

export interface Consulta {
  id: number;
  tipo: TipoConsulta;
  pacienteId: number;
  profissionalId: number;
  especialidadeId: number;
  unidadeId?: number;
  dataHoraConsulta: string;
}
