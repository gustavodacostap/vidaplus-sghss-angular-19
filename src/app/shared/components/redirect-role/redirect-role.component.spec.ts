import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectRoleComponent } from './redirect-role.component';

describe('RedirectRoleComponent', () => {
  let component: RedirectRoleComponent;
  let fixture: ComponentFixture<RedirectRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
