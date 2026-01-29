import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoFieldComponent } from './dialog-info-field.component';

describe('DialogInfoFieldComponent', () => {
  let component: DialogInfoFieldComponent;
  let fixture: ComponentFixture<DialogInfoFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInfoFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInfoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
