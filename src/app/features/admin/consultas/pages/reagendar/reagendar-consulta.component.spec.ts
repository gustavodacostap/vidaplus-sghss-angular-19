import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagendarConsultaComponent } from './reagendar-consulta.component';

describe('ReagendarConsultaComponent', () => {
  let component: ReagendarConsultaComponent;
  let fixture: ComponentFixture<ReagendarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReagendarConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReagendarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
