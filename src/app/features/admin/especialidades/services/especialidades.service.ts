import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { Especialidade } from '../models/Especialidade.model';
import { defer, Observable, of, throwError } from 'rxjs';
import { UpdateEspecialidadeDTO } from '../dto/UpdateEspecialidade.dto';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadesService {
  private readonly STORAGE_KEY = 'especialidades';
  private storage = inject(StorageService);

  private getStoredEspecialidades(): Especialidade[] {
    const data = this.storage.get<Especialidade[]>(this.STORAGE_KEY);

    if (!data) {
      return [];
    }

    return data;
  }

  getEspecialidadeById(id: number): Observable<Especialidade> {
    return defer(() => {
      const especialidades = this.getStoredEspecialidades();

      const especialidade = especialidades.find((p) => p.id === id);

      if (!especialidade) {
        return throwError(
          () => new Error(`Especialidade com id ${id} não encontrado`),
        );
      }

      return of(especialidade);
    });
  }

  getEspecialidades(): Observable<Especialidade[]> {
    return defer(() => {
      const especialidades = this.getStoredEspecialidades();

      return of(especialidades);
    });
  }

  updateEspecialidade(
    id: number,
    dto: UpdateEspecialidadeDTO,
  ): Observable<void> {
    return defer(() => {
      const especialidades = this.getStoredEspecialidades();

      const especialidadeAtual = especialidades.find((p) => p.id === id);

      if (!especialidadeAtual) {
        return throwError(
          () => new Error(`Especialidade com id ${id} não encontrado`),
        );
      }

      const updatedEspecialidade: Especialidade = {
        ...especialidadeAtual,
        ...dto,
      };

      this.storage.update<Especialidade>(
        this.STORAGE_KEY,
        updatedEspecialidade,
      );

      return of(void 0);
    });
  }
}
