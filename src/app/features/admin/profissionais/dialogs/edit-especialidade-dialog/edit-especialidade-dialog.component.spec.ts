import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEspecialidadeDialogComponent } from './edit-especialidade-dialog.component';

describe('EditEspecialidadeDialogComponent', () => {
  let component: EditEspecialidadeDialogComponent;
  let fixture: ComponentFixture<EditEspecialidadeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEspecialidadeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEspecialidadeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
