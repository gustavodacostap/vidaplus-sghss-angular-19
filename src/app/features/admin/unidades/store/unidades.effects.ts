import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UnidadesService } from '../services/unidades.service';
import { loadUnidades, loadUnidadesFailure, loadUnidadesSuccess } from './unidades.actions';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';

@Injectable()
export class UnidadesEffects {
  private actions$ = inject(Actions);
  private service = inject(UnidadesService);

  loadUnidades$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUnidades),
      switchMap(() =>
        this.service.getUnidades().pipe(
          map((unidades) => loadUnidadesSuccess({ unidades })),
          catchError((err) =>
            of(
              loadUnidadesFailure(),
              showSnackbar({
                message: 'Erro ao carregar dados das unidades',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });
}
