import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteConsulta } from '../../store/consultas.actions';
import { InfoChipComponent } from '../../../../../shared/components/info-chip/info-chip.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cancelar-consulta-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    InfoChipComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cancelar-consulta-dialog.component.html',
  styleUrl: './cancelar-consulta-dialog.component.scss',
})
export class CancelarConsultaDialogComponent {
  private dialogRef = inject(MatDialogRef<CancelarConsultaDialogComponent>);
  private store = inject(Store);

  mockData = {
    tipo: 'PRESENCIAL',
    profissional: {
      id: 1,
      nome: 'João Silva',
    },
    especialidade: {
      id: 1,
      nome: 'Cardiologia',
    },
    paciente: {
      id: 10,
      nome: 'Maria Oliveira',
    },
    unidade: {
      id: 3,
      nome: 'Unidade Central',
    },
    data: '25/01/2026',
    horario: '08:00',
  };

  cancelarConsulta() {
    this.close();
    this.store.dispatch(deleteConsulta());
  }

  close(): void {
    this.dialogRef.close();
  }
}
