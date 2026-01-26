import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesProfComponent } from './pacientes-prof.component';

describe('PacientesProfComponent', () => {
  let component: PacientesProfComponent;
  let fixture: ComponentFixture<PacientesProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
