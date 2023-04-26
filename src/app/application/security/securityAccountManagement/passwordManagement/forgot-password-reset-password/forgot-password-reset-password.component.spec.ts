import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordResetPasswordComponent } from './forgot-password-reset-password.component';

describe('ForgotPasswordResetPasswordComponent', () => {
  let component: ForgotPasswordResetPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
