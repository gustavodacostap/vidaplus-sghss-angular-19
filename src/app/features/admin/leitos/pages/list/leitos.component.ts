import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeitoListItem } from '../../models/LeitoListItem.model';
import { combineLatest, startWith } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ViewLeitoDialogComponent } from '../../dialogs/view-leito-dialog/view-leito-dialog.component';
import { EditLeitoDialogComponent } from '../../dialogs/edit-leito-dialog/edit-leito-dialog.component';
import { DeleteLeitoDialogComponent } from '../../dialogs/delete-leito-dialog/delete-leito-dialog.component';

type LeitoColumn = 'codigoSala' | 'nomePaciente' | 'livre';

@Component({
  selector: 'app-leitos',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './leitos.component.html',
  styleUrl: './leitos.component.scss',
})
export class LeitosComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  codigoCtrl = new FormControl<string>('', { nonNullable: true });
  pacienteCtrl = new FormControl<string>('', { nonNullable: true });
  unidadeCtrl = new FormControl<string>('', {
    nonNullable: true,
  });

  unidades = [
    'Unidade Central',
    'Unidade Zona Norte',
    'Unidade Zona Sul',
    'Unidade Zona Leste',
  ];

  filteredPacientes: string[] = [
    'João da Silva',
    'Maria Oliveira',
    'Carlos Pereira',
  ];
  // pacientes = this.store.select(selectNomePacientes);

  // Tabela
  displayedColumns: LeitoColumn[] = ['codigoSala', 'livre', 'nomePaciente'];
  allColumns = [...this.displayedColumns, 'actions'];
  columnLabels: Record<string, string> = {
    codigoSala: 'Código',
    nomePaciente: 'Paciente',
    livre: 'Status',
  };
  formatters: Partial<
    Record<LeitoColumn, (value: any, row: LeitoListItem) => string>
  > = {
    livre: (value: boolean) => (value === true ? 'Livre' : 'Ocupado'),
    nomePaciente: (value: string) => (value ? value : 'Nenhum'),
  };

  dataSource = new MatTableDataSource<LeitoListItem>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.data = [
      {
        id: 101,
        codigoSala: 'A02',
        livre: false,
        unidade: 'Unidade Central',
        nomePaciente: 'João da Silva',
        dataNascimentoPaciente: '12/03/1985',
        cpfPaciente: '123.456.789-00',
      },
      {
        id: 102,
        codigoSala: 'A05',
        livre: true,
        unidade: 'Unidade Central',
      },
      {
        id: 203,
        codigoSala: 'A10',
        livre: false,
        unidade: 'Unidade Zona Norte',
        nomePaciente: 'Maria Oliveira',
        dataNascimentoPaciente: '25/7/1992',
        cpfPaciente: '987.654.321-00',
      },
      {
        id: 304,
        codigoSala: 'A20',
        livre: true,
        unidade: 'Unidade Zona Sul',
      },
      {
        id: 405,
        codigoSala: 'B01',
        livre: false,
        unidade: 'Unidade Zona Leste',
        nomePaciente: 'Carlos Pereira',
        dataNascimentoPaciente: '5/10/1978',
        cpfPaciente: '456.789.123-00',
      },
    ];

    this.dataSource.filterPredicate = (data: LeitoListItem, filter) => {
      const { codigoSala, nomePaciente, unidade } = JSON.parse(filter) as {
        codigoSala: string;
        nomePaciente: string;
        unidade: string;
      };

      const matchCodigo =
        !codigoSala || data.codigoSala.toString().includes(codigoSala);

      const matchNome =
        (!nomePaciente ||
          data.nomePaciente
            ?.toLowerCase()
            .includes(nomePaciente.toLowerCase())) ??
        false;
      const matchUnidade = !unidade || data.unidade === unidade;

      return matchCodigo && matchNome && matchUnidade;
    };

    combineLatest([
      this.codigoCtrl.valueChanges.pipe(startWith('')),
      this.pacienteCtrl.valueChanges.pipe(startWith('')),
      this.unidadeCtrl.valueChanges.pipe(startWith('')),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([codigoSala, nomePaciente, unidade]) => {
        this.dataSource.filter = JSON.stringify({
          codigoSala: codigoSala.trim() ?? '',
          nomePaciente: nomePaciente ?? '',
          unidade: unidade ?? '',
        });

        this.dataSource.paginator?.firstPage();
      });

    this.unidadeCtrl.setValue('Unidade Central');
  }

  formatCell(column: LeitoColumn, row: LeitoListItem): string {
    const formatter = this.formatters[column];
    const value = row[column];

    return formatter ? formatter(value, row) : String(value ?? '');
  }

  viewLeito(leito: LeitoListItem) {
    this.dialog.open(ViewLeitoDialogComponent, {
      width: '500px',
      data: leito,
    });
  }

  editLeito(leito: LeitoListItem) {
    this.dialog.open(EditLeitoDialogComponent, {
      width: '500px',
      data: leito,
    });
  }

  deleteLeito(leito: LeitoListItem) {
    this.dialog.open(DeleteLeitoDialogComponent, {
      width: '400px',
      data: leito,
    });
  }
}
