export type TipoSanguineo = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Paciente {
  id: number;
  userId: string;

  nome: string;
  dataNascimento: string;
  idade: number;

  cpf: string; // somente números
  email: string;
  celular: string;

  tipoSanguineo: TipoSanguineo;

  peso: number; // ex: 70.5 (kg)
  altura: number; // ex: 1.75 (metros)

  alergias: string | null;
}
