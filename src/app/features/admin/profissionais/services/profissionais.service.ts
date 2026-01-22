import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { Profissional } from '../models/Profissional.model';
import { ProfissionalListItem } from '../models/ProfissionalListItem.model';
import { defer, forkJoin, map, Observable, of, throwError } from 'rxjs';
import { UpdateProfissionalDTO } from '../dto/UpdateProfissional.dto';
import { EspecialidadesService } from '../../especialidades/services/especialidades.service';
import { UnidadesService } from '../../unidades/services/unidades.service';

@Injectable({
  providedIn: 'root',
})
export class ProfissionaisService {
  private readonly STORAGE_KEY = 'profissionais';
  private storage = inject(StorageService);
  private especialidadesService = inject(EspecialidadesService);
  private unidadesService = inject(UnidadesService);

  private getStoredProfissionais(): Profissional[] {
    const data = this.storage.get<Profissional[]>(this.STORAGE_KEY);

    if (!data) {
      return [];
    }

    return data;
  }

  getProfissionaisTable(): Observable<ProfissionalListItem[]> {
    const profissionais = this.getStoredProfissionais();

    if (!profissionais.length) {
      return of([]);
    }

    return forkJoin(
      profissionais.map((p) =>
        forkJoin({
          especialidade: this.especialidadesService.getEspecialidadeById(
            p.especialidadeId,
          ),
          unidade: this.unidadesService.getUnidadeById(p.unidadeId),
        }).pipe(
          map(({ especialidade, unidade }) => ({
            id: p.id,
            nome: p.nome,
            unidadeId: p.unidadeId,
            unidadeNome: unidade.nome,
            crm: p.crm,
            UFcrm: p.UFcrm,
            especialidade,
          })),
        ),
      ),
    );
  }

  getProfissionalById(id: number): Observable<Profissional> {
    return defer(() => {
      const profissionais = this.getStoredProfissionais();

      const paciente = profissionais.find((p) => p.id === id);

      if (!paciente) {
        return throwError(
          () => new Error(`Profissional com id ${id} não encontrado`),
        );
      }

      return of(paciente);
    });
  }

  updateProfissional(id: number, dto: UpdateProfissionalDTO): Observable<void> {
    return defer(() => {
      const profissionais = this.getStoredProfissionais();

      const pacienteAtual = profissionais.find((p) => p.id === id);

      if (!pacienteAtual) {
        return throwError(
          () => new Error(`Profissional com id ${id} não encontrado`),
        );
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
