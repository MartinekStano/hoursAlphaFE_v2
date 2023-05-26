import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterRegistrationModalComponent } from './after-registration-modal.component';

describe('AfterRegistrationModalComponent', () => {
  let component: AfterRegistrationModalComponent;
  let fixture: ComponentFixture<AfterRegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterRegistrationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
