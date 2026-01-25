import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarConsultaDialogComponent } from './cancelar-consulta-dialog.component';

describe('CancelarConsultaDialogComponent', () => {
  let component: CancelarConsultaDialogComponent;
  let fixture: ComponentFixture<CancelarConsultaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarConsultaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarConsultaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
