import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadUnidades } from '../../unidades/store/unidades.actions';
import {
  enterConsultasPage,
  loadConsultas,
  loadConsultasFailure,
  loadConsultasSuccess,
} from './consultas.actions';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';
import { ConsultasService } from '../services/consultas.service';

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
}
