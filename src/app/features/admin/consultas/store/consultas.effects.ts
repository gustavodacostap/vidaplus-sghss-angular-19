import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadUnidades } from '../../unidades/store/unidades.actions';
import {
  createConsulta,
  createConsultaSuccess,
  deleteConsulta,
  deleteConsultaSuccess,
  enterConsultasPage,
  enterCreateConsultaPage,
  loadConsultas,
  loadConsultasFailure,
  loadConsultasSuccess,
  updateConsulta,
  updateConsultaSuccess,
} from './consultas.actions';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';
import { ConsultasService } from '../services/consultas.service';
import { loadProfissionais } from '../../profissionais/store/profissionais.actions';
import { loadEspecialidades } from '../../especialidades/store/especialidades.actions';
import { loadPacientes } from '../../pacientes/store/pacientes.actions';

@Injectable()
export class ConsultasEffects {
  private actions$ = inject(Actions);
  private service = inject(ConsultasService);

  enterPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(enterConsultasPage),
      switchMap(() => [loadConsultas(), loadUnidades()]),
    );
  });

  enterCreatePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(enterCreateConsultaPage),
      switchMap(() => [
        loadUnidades(),
        loadProfissionais(),
        loadEspecialidades(),
        loadPacientes(),
      ]),
    );
  });

  loadConsultas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadConsultas),
      switchMap(() =>
        this.service.getConsultas().pipe(
          map((consultas) => loadConsultasSuccess({ consultas })),
          catchError((err) =>
            of(
              loadConsultasFailure(),
              showSnackbar({
                message: 'Erro ao carregar dados das consultas',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });

  // createConsulta$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(createConsulta),
  //     switchMap(({ dto }) =>
  //       this.service.addConsulta(dto).pipe(
  //         switchMap(() => [
  //           createConsultaSuccess(),
  //           showSnackbar({
  //             message: 'Consulta agendada com sucesso',
  //           }),
  //         ]),
  //         catchError((err) =>
  //           of(
  //             createConsultaFailure(),
  //             showSnackbar({
  //               message: 'Erro ao agendar consulta',
  //               logMessage: err.toString(),
  //             }),
  //           ),
  //         ),
  //       ),
  //     ),
  //   );
  // });

  createConsulta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createConsulta),
      switchMap(() => [
        createConsultaSuccess(),
        showSnackbar({
          message: 'Consulta agendada com sucesso',
        }),
      ]),
    );
  });

  deleteConsulta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteConsulta),
      switchMap(() => [
        deleteConsultaSuccess(),
        showSnackbar({
          message: 'Consulta cancelada com sucesso',
        }),
      ]),
    );
  });

  updateConsulta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateConsulta),
      switchMap(() => [
        updateConsultaSuccess(),
        showSnackbar({
          message: 'Consulta reagendada com sucesso',
        }),
      ]),
    );
  });
}
