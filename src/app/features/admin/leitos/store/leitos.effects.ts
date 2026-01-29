import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';
import { LeitosActions } from './leitos.actions';

@Injectable()
export class LeitosEffects {
  private actions$ = inject(Actions);

  darAlta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeitosActions.darAltaPaciente),
      switchMap(() => [
        LeitosActions.darAltaPacienteSuccess(),
        showSnackbar({
          message: 'Paciente recebeu alta com sucesso',
        }),
      ]),
    );
  });

  updateLeito$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeitosActions.updateLeito),
      switchMap(() => [
        LeitosActions.updateLeitoSuccess(),
        showSnackbar({
          message: 'Leito atualizado com sucesso',
        }),
      ]),
    );
  });

  deleteLeito$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeitosActions.deleteLeito),
      switchMap(() => [
        LeitosActions.deleteLeitoSuccess(),
        showSnackbar({
          message: 'Leito excluído com sucesso',
        }),
      ]),
    );
  });

  createLeito$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeitosActions.createLeito),
      switchMap(() => [
        LeitosActions.createLeitoSuccess(),
        showSnackbar({
          message: 'Leito criado com sucesso',
        }),
      ]),
    );
  });
}
