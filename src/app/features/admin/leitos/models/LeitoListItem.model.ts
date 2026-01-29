export interface LeitoListItem {
  id: number;
  codigoSala: string;
  livre: boolean;
  unidade: string;
  nomePaciente?: string;
  dataNascimentoPaciente?: string;
  cpfPaciente?: string;
}
