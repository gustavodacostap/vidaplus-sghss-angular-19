import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { Profissional } from '../models/Profissional.model';
import { ProfissionalListItem } from '../models/ProfissionalListItem.model';
import { defer, Observable, of, throwError } from 'rxjs';
import { UpdateProfissionalDTO } from '../dto/UpdateProfissional.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfissionaisService {
  private readonly STORAGE_KEY = 'profissionais';
  private storage = inject(StorageService);

  private getStoredProfissionais(): Profissional[] {
    const data = this.storage.get<Profissional[]>(this.STORAGE_KEY);

    if (!data) {
      return [];
    }

    return data;
  }

  getProfissionaisTable(): Observable<ProfissionalListItem[]> {
    return defer(() => {
      const profissionais = this.getStoredProfissionais();

      const listItems: ProfissionalListItem[] = profissionais.map((p) => ({
        id: p.id,
        nome: p.nome,
        unidadeId: p.unidadeId,
        unidadeNome: '',
        crm: p.crm,
        UFcrm: p.UFcrm,
        especialidade: p.especialidade,
      }));

      if (!listItems) {
        return throwError(() => new Error(`Erro ao buscar dados dos profissionais`));
      }

      return of(listItems);
    });
  }

  getProfissionalById(id: number): Observable<Profissional> {
    return defer(() => {
      const profissionais = this.getStoredProfissionais();

      const paciente = profissionais.find((p) => p.id === id);

      if (!paciente) {
        return throwError(() => new Error(`Profissional com id ${id} não encontrado`));
      }

      return of(paciente);
    });
  }

  updateProfissional(id: number, dto: UpdateProfissionalDTO): Observable<void> {
    return defer(() => {
      const profissionais = this.getStoredProfissionais();

      const pacienteAtual = profissionais.find((p) => p.id === id);

      if (!pacienteAtual) {
        return throwError(() => new Error(`Profissional com id ${id} não encontrado`));
      }

      const pacienteAtualizado: Profissional = {
        ...pacienteAtual, // mantém id e userId
        ...dto, // atualiza os demais campos
      };

      this.storage.update<Profissional>(this.STORAGE_KEY, pacienteAtualizado);

      return of(void 0);
    });
  }
}
