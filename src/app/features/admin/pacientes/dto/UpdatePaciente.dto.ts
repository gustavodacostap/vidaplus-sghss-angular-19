import { Paciente } from '../models/Paciente.model';

export type UpdatePacienteDTO = Omit<Paciente, 'userId' | 'id'>;
