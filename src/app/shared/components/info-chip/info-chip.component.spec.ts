import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoChipComponent } from './info-chip.component';

describe('InfoChipComponent', () => {
  let component: InfoChipComponent;
  let fixture: ComponentFixture<InfoChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
