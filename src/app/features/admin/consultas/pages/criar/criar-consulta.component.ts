import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import {
  createConsulta,
  enterCreateConsultaPage,
} from '../../store/consultas.actions';
import { TipoConsulta } from '../../models/Consulta.model';
import { SelectOption } from '../../../../../shared/interfaces/SelectOption.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { CreateConsultaDTO } from '../../dto/CreateConsulta.dto';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { selectPacientesForOptions } from '../../../pacientes/store/pacientes.selectors';
import { selectUnidadesForOptions } from '../../../unidades/store/unidades.selectors';
import { selectProfissionaisForOptions } from '../../../profissionais/store/profissionais.selectors';
import { selectEspecialidadesForOptions } from '../../../especialidades/store/especialidades.selectors';
import { getFormErrorMessage } from '../../../../../shared/helpers/form-errors.helper';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-criar-consulta',
  imports: [
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: './criar-consulta.component.html',
  styleUrl: './criar-consulta.component.scss',
})
export class CriarConsultaComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  private destroyRef = inject(DestroyRef);

  form = this.fb.nonNullable.group({
    tipo: this.fb.nonNullable.control<TipoConsulta | null>(null, {
      validators: Validators.required,
    }),
    paciente: this.fb.nonNullable.control<SelectOption | null>(
      null,
      Validators.required,
    ),
    profissional: this.fb.nonNullable.control<SelectOption | null>(
      null,
      Validators.required,
    ),
    especialidade: this.fb.nonNullable.control<SelectOption | null>(
      null,
      Validators.required,
    ),
    unidade: this.fb.control<SelectOption | null>(null, Validators.required),
    data: this.fb.nonNullable.control<Date | null>(null, Validators.required),
    horario: this.fb.nonNullable.control<string | null>(
      null,
      Validators.required,
    ),
  });

  errorMessage = getFormErrorMessage;
  isMobile$!: Observable<boolean>;

  confirmacao$ = this.form.valueChanges.pipe(
    map(() => {
      if (this.form.invalid) return null;
      return this.buildCreateConsultaDTO();
    }),
  );

  pacientes$ = this.store.select(selectPacientesForOptions);
  profissionais$ = this.store.select(selectProfissionaisForOptions);
  especialidades$ = this.store.select(selectEspecialidadesForOptions);
  unidades$ = this.store.select(selectUnidadesForOptions);

  filteredPacientes$!: Observable<SelectOption[]>;
  filteredProfissionais$!: Observable<SelectOption[]>;
  filteredEspecialidades$!: Observable<SelectOption[]>;
  filteredUnidades$!: Observable<SelectOption[]>;

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.isMobile$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map((result) => result.matches));
  }

  ngOnInit() {
    this.store.dispatch(enterCreateConsultaPage());

    this.form.controls.tipo.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tipo) => {
        const unidadeCtrl = this.form.controls.unidade;

        if (tipo === 'PRESENCIAL') {
          unidadeCtrl.setValidators(Validators.required);
        } else {
          unidadeCtrl.clearValidators();
          unidadeCtrl.setValue(null);
        }

        unidadeCtrl.updateValueAndValidity();
      });

    this.setupAutocompletes();
  }

  backToConsultas() {
    this.router.navigate(['admin/consultas']);
  }

  buildCreateConsultaDTO(): CreateConsultaDTO {
    const {
      tipo,
      paciente,
      profissional,
      especialidade,
      unidade,
      data,
      horario,
    } = this.form.getRawValue();

    const dataHoraConsulta = this.combineDateAndTime(data!, horario!);

    return {
      tipo: tipo!,
      pacienteId: paciente!.id,
      profissionalId: profissional!.id,
      especialidadeId: especialidade!.id,
      unidadeId: tipo === 'PRESENCIAL' ? unidade!.id : undefined,
      dataHoraConsulta,
    };
  }

  displayOption(option: SelectOption): string {
    return option?.nome ?? '';
  }

  confirmarConsulta() {
    if (this.form.invalid) return;

    const dto = this.buildCreateConsultaDTO();
    this.store.dispatch(createConsulta({ dto }));
  }

  private combineDateAndTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result.toISOString();
  }

  private setupAutocompletes() {
    this.filteredPacientes$ = this.createFilter(
      this.form.controls.paciente,
      this.pacientes$,
    );

    this.filteredProfissionais$ = this.createFilter(
      this.form.controls.profissional,
      this.profissionais$,
    );

    this.filteredEspecialidades$ = this.createFilter(
      this.form.controls.especialidade,
      this.especialidades$,
    );

    this.filteredUnidades$ = this.createFilter(
      this.form.controls.unidade,
      this.unidades$,
    );
  }

  private createFilter(
    control: FormControl<SelectOption | null>,
    source$: Observable<SelectOption[]>,
  ): Observable<SelectOption[]> {
    return combineLatest([
      control.valueChanges.pipe(startWith('')),
      source$,
    ]).pipe(
      map(([value, options]) => {
        const nome = typeof value === 'string' ? value : (value?.nome ?? '');
        return options.filter((o) =>
          o.nome.toLowerCase().includes(nome.toLowerCase()),
        );
      }),
    );
  }
}
