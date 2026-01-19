import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profissionais } from './profissionais';

describe('Profissionais', () => {
  let component: Profissionais;
  let fixture: ComponentFixture<Profissionais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profissionais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profissionais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
