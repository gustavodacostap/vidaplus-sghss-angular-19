import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagendarConsultaDialogComponent } from './reagendar-consulta-dialog.component';

describe('ReagendarConsultaDialogComponent', () => {
  let component: ReagendarConsultaDialogComponent;
  let fixture: ComponentFixture<ReagendarConsultaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReagendarConsultaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReagendarConsultaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
