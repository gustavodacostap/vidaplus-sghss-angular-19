import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeitoDialogComponent } from './edit-leito-dialog.component';

describe('EditLeitoDialogComponent', () => {
  let component: EditLeitoDialogComponent;
  let fixture: ComponentFixture<EditLeitoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLeitoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLeitoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
