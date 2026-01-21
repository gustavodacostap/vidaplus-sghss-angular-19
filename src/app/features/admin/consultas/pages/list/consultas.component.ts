import { Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { UnidadeOption } from '../../../unidades/models/UnidadeOption.model';
import { selectUnidadesForOptions } from '../../../unidades/store/unidades.selectors';
import { combineLatest, map, Observable, startWith, take } from 'rxjs';
import { enterConsultasPage } from '../../store/consultas.actions';
import { CommonModule } from '@angular/common';
import {
  selectConsultas,
  selectConsultasError,
  selectConsultasLoading,
} from '../../store/consultas.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataHoraPipe } from '../../../../../shared/pipes/data-hora.pipe';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-consultas',
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DataHoraPipe,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss',
})
export class ConsultasComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  isMobile!: Observable<boolean>;

  profissionalCtrl = new FormControl('');
  pacienteCtrl = new FormControl('');
  unidadeCtrl = new FormControl<string | UnidadeOption>('');
  dataCtrl = new FormControl('');

  profissionalFilter = toSignal(
    this.profissionalCtrl.valueChanges.pipe(startWith('')),
    { initialValue: '' },
  );

  pacienteFilter = toSignal(
    this.pacienteCtrl.valueChanges.pipe(startWith('')),
    { initialValue: '' },
  );

  unidadeFilter = toSignal(
    this.unidadeCtrl.valueChanges.pipe(startWith(null)),
    { initialValue: null },
  );

  dataFilter = toSignal(this.dataCtrl.valueChanges.pipe(startWith(null)), {
    initialValue: null,
  });

  consultasFiltradas = computed(() => {
    const consultas = this.consultas();

    const profissional = this.profissionalFilter()?.toLowerCase() ?? '';
    const paciente = this.pacienteFilter()?.toLowerCase() ?? '';
    const unidade = this.unidadeFilter();
    const data = this.dataFilter();

    const unidadeId =
      unidade && typeof unidade === 'object' ? unidade.id : null;

    return consultas.filter((c) => {
      const matchProfissional =
        !profissional ||
        c.nomeProfissional.toLowerCase().includes(profissional);

      const matchPaciente =
        !paciente || c.nomePaciente.toLowerCase().includes(paciente);

      const matchUnidade = !unidade || c.unidadeId === unidadeId;

      const matchData =
        !data ||
        new Date(c.dataHoraConsulta).toDateString() ===
          new Date(data).toDateString();

      return matchProfissional && matchPaciente && matchUnidade && matchData;
    });
  });

  unidades = this.store.select(selectUnidadesForOptions);
  filteredUnidades!: Observable<UnidadeOption[]>;

  consultas = this.store.selectSignal(selectConsultas);

  loading = this.store.selectSignal(selectConsultasLoading);
  error = this.store.selectSignal(selectConsultasError);

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.isMobile = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map((result) => result.matches));
  }

  ngOnInit() {
    this.store.dispatch(enterConsultasPage());

    this.unidades.pipe(take(1)).subscribe((unidades) => {
      if (unidades.length > 0) {
        this.unidadeCtrl.setValue(unidades[0]);
      }
    });

    this.filteredUnidades = combineLatest([
      this.unidadeCtrl.valueChanges.pipe(startWith('')),
      this.unidades,
    ]).pipe(
      map(([value, unidades]) => {
        // if (!value) return unidades;

        const nome = typeof value === 'string' ? value : (value?.nome ?? '');
        return unidades.filter((u) =>
          u.nome.toLowerCase().includes(nome.toLowerCase()),
        );
      }),
    );
  }

  displayUnidade(unidade: UnidadeOption): string {
    return unidade && unidade.nome ? unidade.nome : '';
  }

  goToCreatePage() {
    this.router.navigate(['admin/consultas/nova']);
  }
}
