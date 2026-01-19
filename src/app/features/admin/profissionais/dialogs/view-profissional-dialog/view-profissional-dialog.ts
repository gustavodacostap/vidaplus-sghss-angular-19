import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectProfissionalComUnidade,
  selectProfissionalError,
  selectProfissionalLoading,
} from '../../store/profissionais.selectors';
import { loadProfissionalById } from '../../store/profissionais.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ProfissionalComUnidade } from '../../models/ProfisisonalComUnidade.model';
import { CelularPipe } from '../../../../../shared/pipes/celular.pipe';

export interface ViewProfissionalDialogData {
  profissionalId: number;
}

@Component({
  selector: 'app-view-profissional-dialog',
  imports: [
    MatIconModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle,
    MatDividerModule,
    MatProgressSpinnerModule,
    CelularPipe,
  ],
  templateUrl: './view-profissional-dialog.html',
  styleUrl: './view-profissional-dialog.scss',
})
export class ViewProfissionalDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<ViewProfissionalDialog>);
  private store = inject(Store);
  private router = inject(Router);
  readonly data = inject<ViewProfissionalDialogData>(MAT_DIALOG_DATA);

  profissional: Signal<ProfissionalComUnidade | null> = this.store.selectSignal(
    selectProfissionalComUnidade,
  );
  loading: Signal<boolean> = this.store.selectSignal(selectProfissionalLoading);
  error: Signal<boolean> = this.store.selectSignal(selectProfissionalError);

  crm = computed(() => {
    const p = this.profissional();
    if (!p) return '';

    return `CRM/${p.UFcrm} ${p.crm}`;
  });

  ngOnInit(): void {
    this.store.dispatch(loadProfissionalById({ id: this.data.profissionalId }));
  }

  close(): void {
    this.dialogRef.close();
  }

  navigateToEdit() {
    this.router.navigate([`admin/profissionais/edit/${this.data.profissionalId}`]);
    this.close();
  }
}
