import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { updateConsulta } from '../../store/consultas.actions';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getFormErrorMessage } from '../../../../../shared/helpers/form-errors.helper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reagendar-consulta-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './reagendar-consulta-dialog.component.html',
  styleUrl: './reagendar-consulta-dialog.component.scss',
})
export class ReagendarConsultaDialogComponent {
  private dialogRef = inject(MatDialogRef<ReagendarConsultaDialogComponent>);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  isMobile$!: Observable<boolean>;

  form = this.fb.nonNullable.group({
    data: ['', Validators.required],
    horario: ['', Validators.required],
  });

  errorMessage = getFormErrorMessage;

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.isMobile$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map((result) => result.matches));
  }

  reagendarConsulta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.close();
    this.store.dispatch(updateConsulta());
  }

  close(): void {
    this.dialogRef.close();
  }
}
