import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarConsultaComponent } from './criar-consulta.component';

describe('CriarConsultaComponent', () => {
  let component: CriarConsultaComponent;
  let fixture: ComponentFixture<CriarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
