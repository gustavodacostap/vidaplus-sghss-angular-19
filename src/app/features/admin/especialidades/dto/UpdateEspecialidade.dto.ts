import { Especialidade } from '../models/Especialidade.model';

export type UpdateEspecialidadeDTO = Omit<Especialidade, 'id'>;
