import { Component, inject } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-criar-consulta',
  imports: [
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  templateUrl: './criar-consulta.component.html',
  styleUrl: './criar-consulta.component.scss',
})
export class CriarConsultaComponent {
  private router = inject(Router);

  backToConsultas() {
    this.router.navigate(['admin/consultas']);
  }
}
