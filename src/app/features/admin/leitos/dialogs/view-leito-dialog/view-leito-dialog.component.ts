import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { LeitoListItem } from '../../models/LeitoListItem.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { LeitosActions } from '../../store/leitos.actions';
import { EditLeitoDialogComponent } from '../edit-leito-dialog/edit-leito-dialog.component';
import { DialogLayoutComponent } from '../../../../../shared/components/dialog-layout/dialog-layout.component';
import { DialogInfoSectionComponent } from '../../../../../shared/components/dialog-info-section/dialog-info-section.component';
import { DialogInfoFieldComponent } from '../../../../../shared/components/dialog-info-field/dialog-info-field.component';

@Component({
  selector: 'app-view-leito-dialog',
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    DialogLayoutComponent,
    DialogInfoSectionComponent,
    DialogInfoFieldComponent,
  ],
  templateUrl: './view-leito-dialog.component.html',
  styleUrl: './view-leito-dialog.component.scss',
})
export class ViewLeitoDialogComponent {
  private dialogRef = inject(MatDialogRef<ViewLeitoDialogComponent>);
  private dialog = inject(MatDialog);
  private store = inject(Store);
  readonly data = inject<LeitoListItem>(MAT_DIALOG_DATA);

  openEditDialog = () => {
    this.dialog.open(EditLeitoDialogComponent, {
      width: '500px',
      data: this.data,
    });
  };

  darAlta() {
    this.store.dispatch(LeitosActions.darAltaPaciente());
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
