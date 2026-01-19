import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMenu } from './notification-menu';

describe('NotificationMenu', () => {
  let component: NotificationMenu;
  let fixture: ComponentFixture<NotificationMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
