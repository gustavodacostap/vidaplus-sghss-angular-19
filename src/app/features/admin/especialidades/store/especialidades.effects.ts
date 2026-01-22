import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  createEspecialidade,
  createEspecialidadeFailure,
  createEspecialidadeSuccess,
  loadEspecialidades,
  loadEspecialidadesFailure,
  loadEspecialidadesSuccess,
  updateEspecialidade,
  updateEspecialidadeFailure,
  updateEspecialidadeSuccess,
} from './especialidades.actions';
import { EspecialidadesService } from '../services/especialidades.service';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';
import { loadProfissionais } from '../../profissionais/store/profissionais.actions';

@Injectable()
export class EspecialidadesEffects {
  private actions$ = inject(Actions);
  private service = inject(EspecialidadesService);

  loadEspecialidades$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEspecialidades),
      switchMap(() =>
        this.service.getEspecialidades().pipe(
          map((especialidades) =>
            loadEspecialidadesSuccess({ especialidades }),
          ),
          catchError((err) =>
            of(
              loadEspecialidadesFailure(),
              showSnackbar({
                message: 'Erro ao carregar dados das especialidades',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });

  updateEspecialidade$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateEspecialidade),
      switchMap(({ id, dto }) =>
        this.service.updateEspecialidade(id, dto).pipe(
          switchMap(() => [
            updateEspecialidadeSuccess(),
            loadEspecialidades(),
            loadProfissionais(),
            showSnackbar({
              message: 'Especialidade atualizada com sucesso',
            }),
          ]),
          catchError((err) =>
            of(
              updateEspecialidadeFailure(),
              showSnackbar({
                message: 'Erro ao atualizar especialidade. Tente novamente.',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });

  createEspecialidade$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createEspecialidade),
      switchMap(() =>
        this.service.addEspecialidade().pipe(
          map(() => createEspecialidadeSuccess()),
          catchError((err) =>
            of(
              createEspecialidadeFailure(),
              showSnackbar({
                message: 'Erro ao criar especialidade',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });
}
