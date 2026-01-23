import {
  Component,
  ViewChild,
  AfterViewInit,
  inject,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { loadPacientes } from '../../store/pacientes.actions';
import {
  selectPacientes,
  selectPacientesError,
  selectPacientesLoading,
} from '../../store/pacientes.selectors';
import { combineLatest, startWith } from 'rxjs';
import { PacienteListItem } from '../../models/PacienteListItem.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewPacienteDialog } from '../../dialogs/view-paciente-dialog/view-paciente-dialog';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { USDateToBR } from '../../../../../shared/utils/date.utils';
import { NgxMaskDirective } from 'ngx-mask';
import { formatCpf } from '../../../../../shared/utils/field-formatters.util';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type PacienteColumn = keyof Pick<
  PacienteListItem,
  'nome' | 'cpf' | 'dataNascimento'
>;

@Component({
  selector: 'app-pacientes',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
  ],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss',
})
export class PacientesComponent implements AfterViewInit, OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  loading = this.store.selectSignal(selectPacientesLoading);
  error = this.store.selectSignal(selectPacientesError);

  displayedColumns: PacienteColumn[] = ['nome', 'cpf', 'dataNascimento'];

  allColumns = [...this.displayedColumns, 'actions'];

  columnLabels: Record<string, string> = {
    nome: 'Nome',
    cpf: 'CPF',
    dataNascimento: 'Data de Nascimento',
    status: 'Status',
  };

  columnFormatters: Partial<
    Record<
      keyof PacienteListItem,
      (value: any, row: PacienteListItem) => string
    >
  > = {
    dataNascimento: (value: string) => USDateToBR(value),
    cpf: (value: string) => formatCpf(value),
  };

  nomeCtrl = new FormControl('');
  cpfCtrl = new FormControl('', [Validators.maxLength(14)]);

  dataSource = new MatTableDataSource<PacienteListItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.store.dispatch(loadPacientes());

    this.store
      .select(selectPacientes)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pacientes) => {
        this.dataSource.data = pacientes;
      });

    this.dataSource.filterPredicate = (data, filter) => {
      const { nome, cpf } = JSON.parse(filter);

      return (
        (!nome || data.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (!cpf || data.cpf.includes(cpf))
      );
    };

    combineLatest([
      this.nomeCtrl.valueChanges.pipe(startWith('')),
      this.cpfCtrl.valueChanges.pipe(startWith('')),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([nome, cpf]) => {
        this.dataSource.filter = JSON.stringify({
          nome: nome ?? '',
          cpf: cpf ?? '',
        });

        this.dataSource.paginator?.firstPage();
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewPaciente(pacienteId: number): void {
    this.dialog.open(ViewPacienteDialog, {
      width: '600px',
      data: { pacienteId },
    });
  }

  editPaciente(pacienteId: number) {
    this.router.navigate([`admin/pacientes/edit/${pacienteId}`]);
  }

  formatCell(column: keyof PacienteListItem, row: PacienteListItem): string {
    const formatter = this.columnFormatters[column];
    const value = row[column];

    return formatter ? formatter(value, row) : String(value ?? '');
  }
}
