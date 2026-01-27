import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeitoDialogComponent } from './view-leito-dialog.component';

describe('ViewLeitoDialogComponent', () => {
  let component: ViewLeitoDialogComponent;
  let fixture: ComponentFixture<ViewLeitoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLeitoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeitoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
