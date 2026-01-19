import { inject, Injectable } from '@angular/core';
import { defer, Observable, of, throwError } from 'rxjs';
import { PacienteListItem } from '../models/PacienteListItem.model';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { Paciente } from '../models/Paciente.model';
import { UpdatePacienteDTO } from '../dto/UpdatePaciente.dto';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private readonly STORAGE_KEY = 'pacientes';
  private storage = inject(StorageService);

  private getStoredPacientes(): Paciente[] {
    const data = this.storage.get<Paciente[]>(this.STORAGE_KEY);

    if (!data) {
      return [];
    }

    return data;
  }

  getPacientesTable(): Observable<PacienteListItem[]> {
    return defer(() => {
      const pacientes = this.getStoredPacientes();

      const listItems: PacienteListItem[] = pacientes.map(p => ({
        id: p.id,
        nome: p.nome,
        cpf: p.cpf,
        dataNascimento: p.dataNascimento,
      }));

      if (!listItems) {
        return throwError(() => new Error(`Erro ao buscar dados dos pacientes`));
      }

      return of(listItems);
    });
  }

  getPacienteById(id: number): Observable<Paciente> {
    return defer(() => {
      // const pacientes = this.getStoredPacientes();

      // const paciente = pacientes.find((p) => p.id === id);

      // if (!paciente) {
      return throwError(() => new Error(`Paciente com id ${id} não encontrado`));
      // }

      // return of(paciente);
    });
  }

  updatePaciente(id: number, dto: UpdatePacienteDTO): Observable<void> {
    return defer(() => {
      const pacientes = this.getStoredPacientes();

      const pacienteAtual = pacientes.find(p => p.id === id);

      if (!pacienteAtual) {
        return throwError(() => new Error(`Paciente com id ${id} não encontrado`));
      }

      const pacienteAtualizado: Paciente = {
        ...pacienteAtual, // mantém id e userId
        ...dto, // atualiza os demais campos
      };

      this.storage.update<Paciente>(this.STORAGE_KEY, pacienteAtualizado);

      return of(void 0);
    });
  }
}
