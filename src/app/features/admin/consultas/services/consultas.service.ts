import { inject, Injectable } from '@angular/core';
import { defer, forkJoin, map, Observable, of } from 'rxjs';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { Consulta } from '../models/Consulta.model';
import { ConsultaCardItem } from '../models/ConsultaCardItem.model';
import { PacientesService } from '../../pacientes/services/pacientes.service';
import { ProfissionaisService } from '../../profissionais/services/profissionais.service';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  private readonly STORAGE_KEY = 'consultas';
  private storage = inject(StorageService);

  private pacientesService = inject(PacientesService);
  private profissionaisService = inject(ProfissionaisService);

  private getStoredConsultas(): Consulta[] {
    return this.storage.get<Consulta[]>(this.STORAGE_KEY) ?? [];
  }

  getConsultas(): Observable<ConsultaCardItem[]> {
    return defer(() => {
      const consultas = this.getStoredConsultas();

      if (!consultas.length) {
        return of([]);
      }

      return forkJoin(
        consultas.map((consulta) =>
          forkJoin({
            paciente: this.pacientesService.getPacienteById(
              consulta.idPaciente,
            ),
            profissional: this.profissionaisService.getProfissionalById(
              consulta.idProfissional,
            ),
          }).pipe(
            map(({ paciente, profissional }) => ({
              consultaId: consulta.id,
              nomePaciente: paciente.nome,
              nomeProfissional: profissional.nome,
              especialidade: consulta.especialidade,
              dataHoraConsulta: consulta.dataHoraConsulta,
            })),
          ),
        ),
      );
    });
  }
}
