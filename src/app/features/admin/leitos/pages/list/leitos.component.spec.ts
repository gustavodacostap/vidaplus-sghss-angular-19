import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitosComponent } from './leitos.component';

describe('LeitosComponent', () => {
  let component: LeitosComponent;
  let fixture: ComponentFixture<LeitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeitosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
