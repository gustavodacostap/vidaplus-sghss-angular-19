import { Component, inject } from '@angular/core';
import { DialogLayoutComponent } from '../../../../../shared/components/dialog-layout/dialog-layout.component';
import { Store } from '@ngrx/store';
import { LeitosActions } from '../../store/leitos.actions';
import { CustomLabelComponent } from '../../../../../shared/components/custom-label/custom-label.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { getFormErrorMessage } from '../../../../../shared/helpers/form-errors.helper';

@Component({
  selector: 'app-create-leito-dialog',
  imports: [
    DialogLayoutComponent,
    CustomLabelComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  templateUrl: './create-leito-dialog.component.html',
  styleUrl: './create-leito-dialog.component.scss',
})
export class CreateLeitoDialogComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  errorMessage = getFormErrorMessage;

  form = this.fb.nonNullable.group({
    codigoSala: ['', Validators.required],
    livre: [true],
  });

  createLeito = () => {
    this.store.dispatch(LeitosActions.createLeito());
  };
}
