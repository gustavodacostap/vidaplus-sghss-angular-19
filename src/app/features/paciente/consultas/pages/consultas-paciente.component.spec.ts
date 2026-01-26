import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasPacienteComponent } from './consultas-paciente.component';

describe('ConsultasPacienteComponent', () => {
  let component: ConsultasPacienteComponent;
  let fixture: ComponentFixture<ConsultasPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
