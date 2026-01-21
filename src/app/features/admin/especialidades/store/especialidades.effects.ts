import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loadEspecialidades,
  loadEspecialidadesFailure,
  loadEspecialidadesSuccess,
} from './especialidades.actions';
import { EspecialidadesService } from '../services/especialidades.service';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';

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
}
