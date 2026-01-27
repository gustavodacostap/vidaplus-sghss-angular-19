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

@Component({
  selector: 'app-view-leito-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './view-leito-dialog.component.html',
  styleUrl: './view-leito-dialog.component.scss',
})
export class ViewLeitoDialogComponent {
  private dialogRef = inject(MatDialogRef<ViewLeitoDialogComponent>);
  private dialog = inject(Dialog);
  private store = inject(Store);
  readonly data = inject<LeitoListItem>(MAT_DIALOG_DATA);

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
