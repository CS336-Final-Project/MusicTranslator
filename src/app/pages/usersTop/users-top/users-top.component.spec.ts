import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTopComponent } from './users-top.component';

describe('UsersTopComponent', () => {
  let component: UsersTopComponent;
  let fixture: ComponentFixture<UsersTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
