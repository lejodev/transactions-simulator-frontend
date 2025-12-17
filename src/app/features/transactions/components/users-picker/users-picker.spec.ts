import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPicker } from './users-picker';

describe('UsersPicker', () => {
  let component: UsersPicker;
  let fixture: ComponentFixture<UsersPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
