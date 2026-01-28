import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconTextComponent } from '../../../../../shared/components/icon-text/icon-text.component';
import { LeitoListItem } from '../../models/LeitoListItem.model';
import { LeitosActions } from '../../store/leitos.actions';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { DialogLayoutComponent } from '../../../../../shared/components/dialog-layout/dialog-layout.component';

@Component({
  selector: 'app-delete-leito-dialog',
  imports: [IconTextComponent, MatButtonModule, DialogLayoutComponent],
  templateUrl: './delete-leito-dialog.component.html',
  styleUrl: './delete-leito-dialog.component.scss',
})
export class DeleteLeitoDialogComponent {
  private store = inject(Store);
  readonly data = inject<LeitoListItem>(MAT_DIALOG_DATA);

  deleteLeito = () => {
    this.store.dispatch(LeitosActions.deleteLeito());
  };
}
