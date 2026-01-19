import { Profissional } from '../models/Profissional.model';

export type UpdateProfissionalDTO = Omit<Profissional, 'userId' | 'id'>;
