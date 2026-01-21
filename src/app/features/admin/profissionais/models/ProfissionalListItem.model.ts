import { Especialidade } from '../../especialidades/models/Especialidade.model';
import { UF } from './Profissional.model';

export interface ProfissionalListItem {
  id: number;
  nome: string;
  crm: string;
  UFcrm: UF;
  especialidade: Especialidade;
  unidadeId: number;
  unidadeNome: string;
}
