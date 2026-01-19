import { Component, inject, OnInit, Signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Paciente } from '../../models/Paciente.model';
import { loadPacienteById } from '../../store/pacientes.actions';
import { MatButtonModule } from '@angular/material/button';
import { CpfPipe } from '../../../../../shared/pipes/cpf.pipe';
import { CelularPipe } from '../../../../../shared/pipes/celular.pipe';
import { MatDividerModule } from '@angular/material/divider';
import {
  selectPaciente,
  selectPacienteError,
  selectPacienteLoading,
} from '../../store/pacientes.selectors';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface ViewPacienteDialogData {
  pacienteId: number;
}

@Component({
  selector: 'app-view-paciente-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle,
    CpfPipe,
    CelularPipe,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './view-paciente-dialog.html',
  styleUrl: './view-paciente-dialog.scss',
})
export class ViewPacienteDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<ViewPacienteDialog>);
  private store = inject(Store);
  private router = inject(Router);
  readonly data = inject<ViewPacienteDialogData>(MAT_DIALOG_DATA);

  paciente: Signal<Paciente | null> = this.store.selectSignal(selectPaciente);
  loading: Signal<boolean> = this.store.selectSignal(selectPacienteLoading);
  error: Signal<boolean> = this.store.selectSignal(selectPacienteError);

  ngOnInit(): void {
    this.store.dispatch(loadPacienteById({ id: this.data.pacienteId }));
  }

  close(): void {
    this.dialogRef.close();
  }

  navigateToEdit() {
    this.router.navigate([`admin/pacientes/edit/${this.data.pacienteId}`]);
    this.close();
  }
}
