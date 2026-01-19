import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalEdit } from './profissional-edit';

describe('ProfissionalEdit', () => {
  let component: ProfissionalEdit;
  let fixture: ComponentFixture<ProfissionalEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfissionalEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfissionalEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
