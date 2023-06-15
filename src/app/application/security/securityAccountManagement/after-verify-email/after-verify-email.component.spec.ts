import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterVerifyEmailComponent } from './after-verify-email.component';

describe('AfterVerifyEmailComponent', () => {
  let component: AfterVerifyEmailComponent;
  let fixture: ComponentFixture<AfterVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterVerifyEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
