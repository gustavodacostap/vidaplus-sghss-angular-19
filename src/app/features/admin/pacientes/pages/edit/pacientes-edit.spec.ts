import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesEdit } from './pacientes-edit';

describe('PacientesEdit', () => {
  let component: PacientesEdit;
  let fixture: ComponentFixture<PacientesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
