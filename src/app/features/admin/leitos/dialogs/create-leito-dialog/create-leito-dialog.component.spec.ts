import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeitoDialogComponent } from './create-leito-dialog.component';

describe('CreateLeitoDialogComponent', () => {
  let component: CreateLeitoDialogComponent;
  let fixture: ComponentFixture<CreateLeitoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeitoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeitoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
