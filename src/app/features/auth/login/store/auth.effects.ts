import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as authActions from './auth.actions';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { showSnackbar } from '../../../../core/ui/store/ui.actions';

// auth.effects.ts
@Injectable()
export class AuthEffects {
  private authService = inject(AuthService);
  private router = inject(Router);
  private actions$ = inject(Actions);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(() => authActions.loginSuccess()),
          catchError((err) =>
            of(
              authActions.loginFailure(),
              showSnackbar({
                message: 'Credenciais inválidas',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });
}
