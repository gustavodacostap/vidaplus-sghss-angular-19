import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Especialidade } from '../../../especialidades/models/Especialidade.model';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { updateEspecialidade } from '../../../especialidades/store/especialidades.actions';
import { getFormErrorMessage } from '../../../../../shared/helpers/form-errors.helper';

@Component({
  selector: 'app-edit-especialidade-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './edit-especialidade-dialog.component.html',
  styleUrl: './edit-especialidade-dialog.component.scss',
})
export class EditEspecialidadeDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<EditEspecialidadeDialogComponent>);
  private store = inject(Store);
  private fb = inject(FormBuilder);
  readonly data = inject<Especialidade>(MAT_DIALOG_DATA);

  errorMessage = getFormErrorMessage;

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    ativa: [false],
  });

  ngOnInit(): void {
    this.form.setValue({
      nome: this.data.nome,
      ativa: this.data.ativa,
    });
  }

  close(): void {
    this.dialogRef.close();
  }
  updateEspecialidade() {
    const formValue = this.form.getRawValue();

    this.store.dispatch(
      updateEspecialidade({ id: this.data.id, dto: formValue }),
    );
    this.close();
  }
}
