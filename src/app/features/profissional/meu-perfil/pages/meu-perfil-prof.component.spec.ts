import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPerfilProfComponent } from './meu-perfil-prof.component';

describe('MeuPerfilProfComponent', () => {
  let component: MeuPerfilProfComponent;
  let fixture: ComponentFixture<MeuPerfilProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuPerfilProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuPerfilProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
