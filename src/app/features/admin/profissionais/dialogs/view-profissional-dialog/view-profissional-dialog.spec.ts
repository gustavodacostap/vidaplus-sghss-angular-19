import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfissionalDialog } from './view-profissional-dialog';

describe('ViewProfissionalDialog', () => {
  let component: ViewProfissionalDialog;
  let fixture: ComponentFixture<ViewProfissionalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProfissionalDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProfissionalDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
