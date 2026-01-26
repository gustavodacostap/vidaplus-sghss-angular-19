import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPerfilPacienteComponent } from './meu-perfil-paciente.component';

describe('MeuPerfilPacienteComponent', () => {
  let component: MeuPerfilPacienteComponent;
  let fixture: ComponentFixture<MeuPerfilPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuPerfilPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuPerfilPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
