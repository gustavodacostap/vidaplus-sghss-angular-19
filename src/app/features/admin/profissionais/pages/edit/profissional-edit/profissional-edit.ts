import { Component, effect, inject, Signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfissionalComUnidade } from '../../../models/ProfisisonalComUnidade.model';
import {
  selectProfissionalComUnidade,
  selectUnidadesForOptions,
} from '../../../store/profissionais.selectors';
import { celularValidator } from '../../../../../../shared/utils/validatorsFn.utils';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { getFormErrorMessage } from '../../../../../../shared/helpers/form-errors.helper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  enterProfissionaisEditPage,
  updateProfissional,
} from '../../../store/profissionais.actions';
import { UpdateProfissionalDTO } from '../../../dto/UpdateProfissional.dto';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';
import { CelularPipe } from '../../../../../../shared/pipes/celular.pipe';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { getUFs } from '../../../../../../shared/utils/select-options.utils';
import { MatSelectModule } from '@angular/material/select';
import { UF } from '../../../models/Profissional.model';

export interface UnidadeOption {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-profissional-edit',
  imports: [
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    CelularPipe,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  templateUrl: './profissional-edit.html',
  styleUrl: './profissional-edit.scss',
})
export class ProfissionalEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  profissional: Signal<ProfissionalComUnidade | null> = this.store.selectSignal(
    selectProfissionalComUnidade,
  );

  profissionalId!: number;

  dadosPessoaisForm = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    UFcrm: this.fb.control<UF>('SP', Validators.required),
    crm: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required, celularValidator()]],
  });

  // STEP 2 – Dados clínicos
  dadosProfissionaisForm = this.fb.nonNullable.group({
    especialidade: ['', Validators.required],
    unidade: this.fb.control<string | UnidadeOption>('', Validators.required),
  });

  UFs = getUFs();
  unidades = this.store.select(selectUnidadesForOptions);
  filteredUnidades!: Observable<UnidadeOption[]>;

  stepperOrientation: Observable<StepperOrientation>;

  errorMessage = getFormErrorMessage;

  get crm() {
    const value = this.dadosPessoaisForm.value;
    if (!value) return '';

    return `CRM/${value.UFcrm} ${value.crm}`;
  }

  get unidadeNome(): string {
    const unidade = this.dadosProfissionaisForm.controls.unidade.value;

    return typeof unidade === 'string' || !unidade ? '—' : unidade.nome;
  }

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver.observe([Breakpoints.XSmall]).pipe(
      takeUntilDestroyed(),
      map(({ matches }) => (matches ? 'vertical' : 'horizontal')),
    );

    effect(() => {
      const profissional = this.profissional();
      if (!profissional) return;

      this.dadosPessoaisForm.patchValue({
        nome: profissional.nome,
        crm: profissional.crm,
        UFcrm: profissional.UFcrm,
        email: profissional.email,
        celular: profissional.celular,
      });

      this.dadosProfissionaisForm.patchValue({
        especialidade: profissional.especialidade,
        unidade: { id: profissional.unidadeId, nome: profissional.unidadeNome },
      });
    });
  }

  ngOnInit() {
    this.profissionalId = Number(this.route.snapshot.paramMap.get('id'));

    this.store.dispatch(enterProfissionaisEditPage({ id: this.profissionalId }));

    this.filteredUnidades = combineLatest([
      this.dadosProfissionaisForm.controls.unidade.valueChanges.pipe(startWith('')),
      this.unidades,
    ]).pipe(
      map(([value, unidades]) => {
        // if (!value) return unidades;

        const nome = typeof value === 'string' ? value : (value?.nome ?? '');
        return unidades.filter((u) => u.nome.toLowerCase().includes(nome.toLowerCase()));
      }),
    );
  }

  displayUnidade(unidade: UnidadeOption): string {
    return unidade && unidade.nome ? unidade.nome : '';
  }

  backToProfissionais() {
    this.router.navigate(['admin/profissionais']);
  }

  confirm() {
    if (this.dadosPessoaisForm.invalid || this.dadosProfissionaisForm.invalid) {
      return;
    }

    const dadosPessoais = this.dadosPessoaisForm.getRawValue();
    const dadosProfissionais = this.dadosProfissionaisForm.getRawValue();

    const unidade = dadosProfissionais.unidade;

    const UFcrm = this.dadosPessoaisForm.controls.UFcrm.value;

    if (typeof unidade !== 'object' || unidade === null || UFcrm === null) {
      return;
    }

    const dto: UpdateProfissionalDTO = {
      ...dadosPessoais,
      UFcrm,
      especialidade: dadosProfissionais.especialidade,
      unidadeId: unidade.id,
    };
    this.store.dispatch(updateProfissional({ id: this.profissionalId, dto: dto }));
    this.backToProfissionais();
  }
}
