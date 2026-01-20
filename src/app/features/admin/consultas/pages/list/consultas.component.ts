import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { UnidadeOption } from '../../../unidades/models/UnidadeOption.model';
import { selectUnidadesForOptions } from '../../../unidades/store/unidades.selectors';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { enterConsultasPage } from '../../store/consultas.actions';
import { CommonModule } from '@angular/common';
import { selectConsultas } from '../../store/consultas.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataHoraPipe } from '../../../../../shared/pipes/data-hora.pipe';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss',
})
export class ConsultasComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  profissionalCtrl = new FormControl('');
  pacienteCtrl = new FormControl('');
  unidadeCtrl = new FormControl<string | UnidadeOption>('');

  unidades = this.store.select(selectUnidadesForOptions);
  filteredUnidades!: Observable<UnidadeOption[]>;

  consultas = this.store.selectSignal(selectConsultas);

  ngOnInit() {
    this.store.dispatch(enterConsultasPage());

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
