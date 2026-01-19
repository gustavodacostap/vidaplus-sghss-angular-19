import { inject, Injectable } from '@angular/core';
import { Unidade } from '../models/Unidade.model';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { defer, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  private readonly STORAGE_KEY = 'unidades';
  private storage = inject(StorageService);

  private getStoredUnidades(): Unidade[] {
    const data = this.storage.get<Unidade[]>(this.STORAGE_KEY);

    if (!data) {
      return [];
    }

    return data;
  }

  getUnidades(): Observable<Unidade[]> {
    return defer(() => {
      const unidades = this.getStoredUnidades();

      if (!unidades) {
        return throwError(() => new Error(`Erro ao buscar dados das unidades`));
      }

      return of(unidades);
    });
  }
}
