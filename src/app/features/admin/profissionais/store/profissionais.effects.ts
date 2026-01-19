import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfissionaisService } from '../services/profissionais.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  enterProfissionaisEditPage,
  enterProfissionaisPage,
  loadProfissionais,
  loadProfissionaisFailure,
  loadProfissionaisSuccess,
  loadProfissionalById,
  loadProfissionalByIdFailure,
  loadProfissionalByIdSuccess,
  updateProfissional,
  updateProfissionalFailure,
  updateProfissionalSuccess,
} from './profissionais.actions';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';
import { loadUnidades } from '../../unidades/store/unidades.actions';

@Injectable()
export class ProfissionaisEffects {
  private actions$ = inject(Actions);
  private service = inject(ProfissionaisService);

  enterPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(enterProfissionaisPage),
      switchMap(() => [loadProfissionais(), loadUnidades()]),
    );
  });

  loadProfissionais$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProfissionais),
      switchMap(() =>
        this.service.getProfissionaisTable().pipe(
          map((profissionais) => loadProfissionaisSuccess({ profissionais })),
          catchError((err) =>
            of(
              loadProfissionaisFailure(),
              showSnackbar({
                message: 'Erro ao carregar dados dos profissionais',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });

  loadProfissionalById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProfissionalById),
      switchMap(({ id }) =>
        this.service.getProfissionalById(id).pipe(
          map((profissional) => loadProfissionalByIdSuccess({ profissional })),
          catchError((err) =>
            of(
              loadProfissionalByIdFailure(),
              showSnackbar({
                message: 'Profissional não encontrado',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });

  updateProfissional$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProfissional),
      switchMap(({ id, dto }) =>
        this.service.updateProfissional(id, dto).pipe(
          switchMap(() => [
            updateProfissionalSuccess(),
            showSnackbar({
              message: 'Profissional atualizado com sucesso',
            }),
          ]),
          catchError((err) =>
            of(
              updateProfissionalFailure(),
              showSnackbar({
                message: 'Erro ao atualizar profissional. Tente novamente.',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });

  enterEditPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(enterProfissionaisEditPage),
      switchMap(({ id }) => [loadProfissionalById({ id }), loadUnidades()]),
    );
  });
}
