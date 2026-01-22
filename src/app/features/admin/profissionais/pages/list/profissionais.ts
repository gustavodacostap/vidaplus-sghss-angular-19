import {
  Component,
  ViewChild,
  AfterViewInit,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProfissionalListItem } from '../../models/ProfissionalListItem.model';
import {
  selectProfissionaisComUnidade,
  selectProfissionaisError,
  selectProfissionaisLoading,
} from '../../store/profissionais.selectors';
import { enterProfissionaisPage } from '../../store/profissionais.actions';
import { selectNomeUnidades } from '../../../unidades/store/unidades.selectors';
import { ViewProfissionalDialog } from '../../dialogs/view-profissional-dialog/view-profissional-dialog';
import { Especialidade } from '../../../especialidades/models/Especialidade.model';
import {
  selectEspecialidades,
  selectEspecialidadesError,
  selectEspecialidadesLoading,
} from '../../../especialidades/store/especialidades.selectors';
import { SelectOption } from '../../../../../shared/interfaces/SelectOption.model';
import { EditEspecialidadeDialogComponent } from '../../dialogs/edit-especialidade-dialog/edit-especialidade-dialog.component';
import { MatDividerModule } from '@angular/material/divider';

type ProfissionalColumn = 'nome' | 'crm' | 'especialidade' | 'unidadeNome';
type EspecialidadeColumn = 'nome' | 'ativa';

@Component({
  selector: 'app-profissionais',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './profissionais.html',
  styleUrl: './profissionais.scss',
})
export class ProfissionaisComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private store = inject(Store);
  private destroyed$ = new Subject<void>();
  private dialog = inject(MatDialog);
  private router = inject(Router);

  loading = this.store.selectSignal(selectProfissionaisLoading);
  error = this.store.selectSignal(selectProfissionaisError);

  displayedColumns: ProfissionalColumn[] = [
    'nome',
    'crm',
    'especialidade',
    'unidadeNome',
  ];

  allColumns = [...this.displayedColumns, 'actions'];

  columnLabels: Record<string, string> = {
    nome: 'Nome',
    crm: 'CRM',
    especialidade: 'Especialidade',
    unidadeNome: 'Unidade',
  };

  profissionalFormatters: Partial<
    Record<
      ProfissionalColumn,
      (value: any, row: ProfissionalListItem) => string
    >
  > = {
    crm: (value: string, row) => `CRM/${row.UFcrm} ${value}`,
    especialidade: (value: Especialidade) => value.nome,
  };

  nomeCtrl = new FormControl('');
  unidadeCtrl = new FormControl<string>('', { nonNullable: true });

  filteredUnidades!: Observable<string[]>;
  unidades = this.store.select(selectNomeUnidades);

  dataSource = new MatTableDataSource<ProfissionalListItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Especialidade

  especialidadesDataSource = new MatTableDataSource<Especialidade>();
  especialidadeColumns: EspecialidadeColumn[] = ['nome', 'ativa'];
  allColumnsEsp = [...this.especialidadeColumns, 'actions'];
  columnLabelsEsp: Record<string, string> = {
    nome: 'Nome',
    ativa: 'Status',
  };
  especialidadeFormatters: Partial<
    Record<EspecialidadeColumn, (value: any, row: Especialidade) => string>
  > = {
    ativa: (value: boolean) => (value ? 'Ativa' : 'Inativa'),
  };

  nomeEspCtrl = new FormControl('');

  errorEsp = this.store.selectSignal(selectEspecialidadesError);
  loadingEsp = this.store.selectSignal(selectEspecialidadesLoading);

  ngOnInit() {
    this.store.dispatch(enterProfissionaisPage());

    this.store
      .select(selectProfissionaisComUnidade)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((profissionais) => {
        this.dataSource.data = profissionais;
      });

    this.filteredUnidades = combineLatest([
      this.unidadeCtrl.valueChanges.pipe(startWith('')),
      this.unidades,
    ]).pipe(
      map(([value, unidades]) =>
        unidades.filter((u) => u.toLowerCase().includes(value.toLowerCase())),
      ),
    );

    this.dataSource.filterPredicate = (data, filter) => {
      const { nome, unidadeNome } = JSON.parse(filter);

      return (
        (!nome || data.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (!unidadeNome ||
          data.unidadeNome.toLowerCase().includes(unidadeNome.toLowerCase()))
      );
    };

    combineLatest([
      this.nomeCtrl.valueChanges.pipe(startWith('')),
      this.unidadeCtrl.valueChanges.pipe(startWith('')),
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([nome, unidadeNome]) => {
        this.dataSource.filter = JSON.stringify({
          nome: nome ?? '',
          unidadeNome: unidadeNome ?? '',
        });

        this.dataSource.paginator?.firstPage();
      });

    // Especialidades
    this.store
      .select(selectEspecialidades)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((especialidades) => {
        this.especialidadesDataSource.data = especialidades;
      });

    this.especialidadesDataSource.filterPredicate = (
      data: Especialidade,
      filter: string,
    ) => data.nome.toLowerCase().includes(filter.toLowerCase());

    this.nomeEspCtrl.valueChanges
      .pipe(startWith(''), takeUntil(this.destroyed$))
      .subscribe((nome) => {
        this.especialidadesDataSource.filter = nome ?? '';
        this.especialidadesDataSource.paginator?.firstPage();
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewProfissional(profissionalId: number): void {
    this.dialog.open(ViewProfissionalDialog, {
      width: '600px',
      data: { profissionalId },
    });
  }

  editProfissional(profissionalId: number) {
    this.router.navigate([`admin/profissionais/edit/${profissionalId}`]);
  }

  displayUnidade(unidade?: SelectOption): string {
    return unidade ? unidade.nome : '';
  }

  // Especialidade

  editEspecialidade(especialidade: Especialidade) {
    this.dialog.open(EditEspecialidadeDialogComponent, {
      width: '600px',
      data: especialidade,
    });
  }

  formatCellGeneric<T extends Record<string, any>, C extends string>(
    column: C,
    row: T,
    formatters: Partial<Record<C, (value: any, row: T) => string>>,
  ): string {
    const formatter = formatters[column];
    const value = row[column];

    return formatter ? formatter(value, row) : String(value ?? '');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
