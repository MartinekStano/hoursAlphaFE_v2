import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSendEmailComponent } from './forgot-password-send-email.component';

describe('ForgotPasswordSendEmailComponent', () => {
  let component: ForgotPasswordSendEmailComponent;
  let fixture: ComponentFixture<ForgotPasswordSendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordSendEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
