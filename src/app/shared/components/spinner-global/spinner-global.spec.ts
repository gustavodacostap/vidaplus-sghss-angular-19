import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerGlobal } from './spinner-global';

describe('SpinnerGlobal', () => {
  let component: SpinnerGlobal;
  let fixture: ComponentFixture<SpinnerGlobal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerGlobal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerGlobal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
