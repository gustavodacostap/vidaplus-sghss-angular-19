import { Profissional } from './Profissional.model';

export interface ProfissionalComNomes extends Profissional {
  unidadeNome: string;
  especialidadeNome: string;
}
