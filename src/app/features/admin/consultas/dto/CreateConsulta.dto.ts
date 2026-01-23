import { Consulta } from '../models/Consulta.model';

export type CreateConsultaDTO = Omit<Consulta, 'id'>;
