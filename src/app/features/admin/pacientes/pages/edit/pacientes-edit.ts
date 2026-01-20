import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente, TipoSanguineo } from '../../models/Paciente.model';
import { Store } from '@ngrx/store';
import {
  selectPaciente,
  selectPacienteError,
} from '../../store/pacientes.selectors';
import {
  loadPacienteById,
  updatePaciente,
} from '../../store/pacientes.actions';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import {
  celularValidator,
  cpfValidator,
} from '../../../../../shared/utils/validatorsFn.utils';
import { getFormErrorMessage } from '../../../../../shared/helpers/form-errors.helper';
import { UpdatePacienteDTO } from '../../dto/UpdatePaciente.dto';
import { calcularIdade } from '../../../../../shared/utils/date.utils';
import { USDateToBRPipe } from '../../../../../shared/pipes/us-date-to-br.pipe';
import { CpfPipe } from '../../../../../shared/pipes/cpf.pipe';
import { CelularPipe } from '../../../../../shared/pipes/celular.pipe';

@Component({
  selector: 'app-pacientes-edit',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    NgxMaskDirective,
    USDateToBRPipe,
    CpfPipe,
    CelularPipe,
  ],
  templateUrl: './pacientes-edit.html',
  styleUrl: './pacientes-edit.scss',
})
export class PacientesEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  paciente: Signal<Paciente | null> = this.store.selectSignal(selectPaciente);

  pacienteId!: number;

  dadosPessoaisForm = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    cpf: ['', [Validators.required, cpfValidator()]],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required, celularValidator()]],
  });

  // STEP 2 – Dados clínicos
  dadosClinicosForm = this.fb.nonNullable.group({
    tipoSanguineo: this.fb.nonNullable.control<TipoSanguineo>(
      'A+',
      Validators.required,
    ),
    peso: [0, Validators.required],
    altura: [0, Validators.required],
    alergias: [''],
    status: [true, Validators.required],
  });

  tiposSanguineos: readonly TipoSanguineo[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];

  stepperOrientation: Observable<StepperOrientation>;

  errorMessage = getFormErrorMessage;

  pacienteError: Signal<boolean | string | null> =
    this.store.selectSignal(selectPacienteError);

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(
        takeUntilDestroyed(),
        map(({ matches }) => (matches ? 'vertical' : 'horizontal')),
      );

    effect(() => {
      const error = this.pacienteError();
      if (error) {
        this.router.navigate(['admin/pacientes']);
      }
    });

    effect(() => {
      const paciente = this.paciente();
      if (!paciente) return;

      this.dadosPessoaisForm.patchValue({
        nome: paciente.nome,
        dataNascimento: paciente.dataNascimento,
        cpf: paciente.cpf,
        email: paciente.email,
        celular: paciente.celular,
      });

      this.dadosClinicosForm.patchValue({
        tipoSanguineo: paciente.tipoSanguineo,
        peso: paciente.peso,
        altura: paciente.altura,
        alergias: paciente.alergias ?? '',
      });
    });
  }

  ngOnInit() {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));

    this.store.dispatch(loadPacienteById({ id: this.pacienteId }));
  }

  backToPacientes() {
    this.router.navigate(['admin/pacientes']);
  }

  confirm() {
    if (this.dadosPessoaisForm.invalid || this.dadosClinicosForm.invalid) {
      return;
    }

    const dadosPessoais = this.dadosPessoaisForm.getRawValue();
    const dadosClinicos = this.dadosClinicosForm.getRawValue();

    const dto: UpdatePacienteDTO = {
      ...dadosPessoais,
      ...dadosClinicos,
      idade: calcularIdade(this.dadosPessoaisForm.value.dataNascimento),
    };

    this.store.dispatch(updatePaciente({ id: this.pacienteId, dto: dto }));
    this.backToPacientes();
  }
}
