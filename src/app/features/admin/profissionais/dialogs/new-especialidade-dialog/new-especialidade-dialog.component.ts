import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import {
  createEspecialidade,
  updateEspecialidade,
} from '../../../especialidades/store/especialidades.actions';

@Component({
  selector: 'app-new-especialidade-dialog',
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
  templateUrl: './new-especialidade-dialog.component.html',
  styleUrl: './new-especialidade-dialog.component.scss',
})
export class NewEspecialidadeDialogComponent {
  private dialogRef = inject(MatDialogRef<NewEspecialidadeDialogComponent>);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    ativa: [true],
  });

  close(): void {
    this.dialogRef.close();
  }

  createEspecialidade() {
    const formValue = this.form.getRawValue();

    this.store.dispatch(createEspecialidade({ dto: formValue }));
    this.close();
  }
}
