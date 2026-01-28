import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLeitoDialogComponent } from './delete-leito-dialog.component';

describe('DeleteLeitoDialogComponent', () => {
  let component: DeleteLeitoDialogComponent;
  let fixture: ComponentFixture<DeleteLeitoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLeitoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLeitoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
