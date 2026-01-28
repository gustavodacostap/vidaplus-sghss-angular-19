import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoSectionComponent } from './dialog-info-section.component';

describe('DialogInfoSectionComponent', () => {
  let component: DialogInfoSectionComponent;
  let fixture: ComponentFixture<DialogInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInfoSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
