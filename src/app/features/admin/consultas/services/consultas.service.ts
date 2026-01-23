import { inject, Injectable } from '@angular/core';
import { defer, forkJoin, map, Observable, of } from 'rxjs';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { Consulta } from '../models/Consulta.model';
import { ConsultaCardItem } from '../models/ConsultaCardItem.model';
import { PacientesService } from '../../pacientes/services/pacientes.service';
import { ProfissionaisService } from '../../profissionais/services/profissionais.service';
import { UnidadesService } from '../../unidades/services/unidades.service';
import { EspecialidadesService } from '../../especialidades/services/especialidades.service';
import { CreateConsultaDTO } from '../dto/CreateConsulta.dto';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  private readonly STORAGE_KEY = 'consultas';
  private storage = inject(StorageService);

  private pacientesService = inject(PacientesService);
  private profissionaisService = inject(ProfissionaisService);
  private unidadesService = inject(UnidadesService);
  private especialidadesService = inject(EspecialidadesService);

  private getStoredConsultas(): Consulta[] {
    return this.storage.get<Consulta[]>(this.STORAGE_KEY) ?? [];
  }

  getConsultas(): Observable<ConsultaCardItem[]> {
    return defer(() => {
      const consultas = this.getStoredConsultas();

      if (!consultas.length) {
        return of([]);
      }

      return forkJoin(consultas.map((c) => this.buildConsultaCard(c)));
    });
  }

  addConsulta(dto: CreateConsultaDTO): Observable<void> {
    return defer(() => {
      this.storage.add<CreateConsultaDTO>(this.STORAGE_KEY, {
        ...dto,
      });

      return of(void 0);
    });
  }

  private getConsultaRequests(consulta: Consulta) {
    const baseRequests = {
      paciente: this.pacientesService.getPacienteById(consulta.pacienteId),
      profissional: this.profissionaisService.getProfissionalById(
        consulta.profissionalId,
      ),
      especialidade: this.especialidadesService.getEspecialidadeById(
        consulta.especialidadeId,
      ),
    };

    if (consulta.tipo === 'PRESENCIAL') {
      return {
        ...baseRequests,
        unidade: this.unidadesService.getUnidadeById(consulta.unidadeId!),
      };
    }

    return baseRequests;
  }

  private buildConsultaCard(consulta: Consulta): Observable<ConsultaCardItem> {
    return forkJoin(this.getConsultaRequests(consulta)).pipe(
      map((response) => this.mapToConsultaCardItem(consulta, response)),
    );
  }

  private mapToConsultaCardItem(
    consulta: Consulta,
    response: any,
  ): ConsultaCardItem {
    const { paciente, profissional, especialidade } = response;

    if (consulta.tipo === 'PRESENCIAL') {
      const { unidade } = response;

      return {
        consultaId: consulta.id,
        tipo: consulta.tipo,
        unidadeId: unidade.id,
        unidadeNome: unidade.nome,
        paciente: paciente.nome,
        profissional: profissional.nome,
        especialidade: especialidade.nome,
        dataHoraConsulta: consulta.dataHoraConsulta,
      };
    }

    return {
      consultaId: consulta.id,
      tipo: consulta.tipo,
      paciente: paciente.nome,
      profissional: profissional.nome,
      especialidade: especialidade.nome,
      dataHoraConsulta: consulta.dataHoraConsulta,
    };
  }
}
