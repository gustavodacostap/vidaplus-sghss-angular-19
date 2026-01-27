import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { darAlta, darAltaSuccess } from './leitos.actions';
import { switchMap } from 'rxjs';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';

@Injectable()
export class LeitosEffects {
  private actions$ = inject(Actions);

  darAlta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(darAlta),
      switchMap(() => [
        darAltaSuccess(),
        showSnackbar({
          message: 'Paciente recebeu alta com sucesso',
        }),
      ]),
    );
  });
}
