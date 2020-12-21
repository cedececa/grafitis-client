import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLoginFailureComponent } from './google-login-failure.component';

describe('GoogleLoginFailureComponent', () => {
  let component: GoogleLoginFailureComponent;
  let fixture: ComponentFixture<GoogleLoginFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleLoginFailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleLoginFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
