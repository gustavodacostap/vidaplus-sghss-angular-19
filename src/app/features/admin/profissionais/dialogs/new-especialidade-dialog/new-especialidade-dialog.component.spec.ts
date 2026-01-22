import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEspecialidadeDialogComponent } from './new-especialidade-dialog.component';

describe('NewEspecialidadeDialogComponent', () => {
  let component: NewEspecialidadeDialogComponent;
  let fixture: ComponentFixture<NewEspecialidadeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEspecialidadeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEspecialidadeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
