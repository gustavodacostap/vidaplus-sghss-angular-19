import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LeitoListItem } from '../../models/LeitoListItem.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { LeitosActions } from '../../store/leitos.actions';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getFormErrorMessage } from '../../../../../shared/helpers/form-errors.helper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-leito-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  templateUrl: './edit-leito-dialog.component.html',
  styleUrl: './edit-leito-dialog.component.scss',
})
export class EditLeitoDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<EditLeitoDialogComponent>);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  readonly data = inject<LeitoListItem>(MAT_DIALOG_DATA);

  errorMessage = getFormErrorMessage;

  form = this.fb.nonNullable.group({
    codigoSala: ['', Validators.required],
    livre: [true],
  });

  ngOnInit() {
    this.form.patchValue({
      codigoSala: this.data.codigoSala,
      livre: this.data.livre,
    });
  }

  updateLeito() {
    this.store.dispatch(LeitosActions.updateLeito());
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
