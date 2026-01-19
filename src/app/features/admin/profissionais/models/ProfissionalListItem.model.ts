import { UF } from './Profissional.model';

export interface ProfissionalListItem {
  id: number;
  nome: string;
  crm: string;
  UFcrm: UF;
  especialidade: string;
  unidadeId: number;
  unidadeNome: string;
}
