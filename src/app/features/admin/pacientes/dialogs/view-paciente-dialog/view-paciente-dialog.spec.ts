import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPacienteDialog } from './view-paciente-dialog';

describe('ViewPacienteDialog', () => {
  let component: ViewPacienteDialog;
  let fixture: ComponentFixture<ViewPacienteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPacienteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPacienteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
