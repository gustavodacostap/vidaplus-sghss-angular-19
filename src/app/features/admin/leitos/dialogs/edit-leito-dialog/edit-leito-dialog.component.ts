import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LeitoListItem } from '../../models/LeitoListItem.model';
import { Dialog } from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { darAlta } from '../../store/leitos.actions';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getFormErrorMessage } from '../../../../../shared/helpers/form-errors.helper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-edit-leito-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  templateUrl: './edit-leito-dialog.component.html',
  styleUrl: './edit-leito-dialog.component.scss',
})
export class ViewLeitoDialogComponent {
  private dialogRef = inject(MatDialogRef<ViewLeitoDialogComponent>);
  private dialog = inject(Dialog);
  private store = inject(Store);
  private fb = inject(FormBuilder);
  readonly data = inject<LeitoListItem>(MAT_DIALOG_DATA);

  errorMessage = getFormErrorMessage;

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    livre: [true],
  });

  openEditDialog() {
    this.close();
    this.dialog.open(ViewLeitoDialogComponent, {
      width: '500px',
      data: this.data,
    });
  }

  darAlta() {
    this.store.dispatch(darAlta());
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
