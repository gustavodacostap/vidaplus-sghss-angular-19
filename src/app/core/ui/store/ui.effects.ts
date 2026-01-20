import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { showSnackbar } from './ui.actions';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar';

@Injectable()
export class UIEffects {
  private actions$ = inject(Actions);
  private snackBar = inject(MatSnackBar);

  showSnackbar$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(showSnackbar),
        tap(({ message, logMessage }) => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: message,
          });

          if (logMessage) {
            console.error(logMessage);
          }
        }),
      );
    },
    { dispatch: false },
  );
}
